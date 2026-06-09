#!/usr/bin/env python3
"""
ChillerStats RSVP Scraper
Add this function to cwh_data_sync.py
Requires: pip install requests beautifulsoup4 (already installed)

USAGE:
  Set environment variables:
    export CHILLERSTATS_EMAIL="your@email.com"
    export CHILLERSTATS_PASSWORD="yourpassword"

  Or put them directly in the cron job on Proxmox.
"""

import os
import re
import json
from datetime import datetime

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("pip install requests beautifulsoup4")

# ═══════════════════════════════════════════
# CONFIG - Credentials from environment variables
# ═══════════════════════════════════════════
CHILLERSTATS_EMAIL = os.environ.get("CHILLERSTATS_EMAIL", "")
CHILLERSTATS_PASSWORD = os.environ.get("CHILLERSTATS_PASSWORD", "")

OUTPUT_DIR = "public/data"

TEAMS = [
    {"id": "B1ECD637-9E6B-6275-659DF391B958D92F", "name": "Columbus Warriors CSC"},
    {"id": "B1F33283-0A80-D7BD-258CF29CE5E30FAA", "name": "Columbus Warriors DWB"},
]


def scrape_chillerstats_rsvp():
    """Login to ChillerStats and scrape game attendance/RSVP data."""
    print("\n=== CHILLERSTATS RSVP ===")

    if not CHILLERSTATS_EMAIL or not CHILLERSTATS_PASSWORD:
        print("  Skipping: No ChillerStats credentials set")
        print("  Set CHILLERSTATS_EMAIL and CHILLERSTATS_PASSWORD env vars")
        return

    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })

    # Step 1: Login
    print(f"  Logging in as {CHILLERSTATS_EMAIL}...")
    login_url = "https://chillerstats.com/login.cfm"
    post_url = "https://chillerstats.com/cflogin.cfm"

    # First GET the login page to grab any hidden fields/cookies
    try:
        resp = session.get(login_url, timeout=15)
        soup = BeautifulSoup(resp.text, "html.parser")

        # Find all hidden form fields
        login_data = {}
        form = soup.find("form")
        if form:
            for inp in form.find_all("input"):
                name = inp.get("name", "")
                value = inp.get("value", "")
                if name:
                    login_data[name] = value

        # Override with our credentials - try common field names
        # ChillerStats likely uses email/password or username/password
        login_data.update({
            "username": CHILLERSTATS_EMAIL,
            "userpassword": CHILLERSTATS_PASSWORD,
            "PayNow": "N",
        })
        # Also try alternate field names
        if "Email" in [inp.get("name") for inp in (form.find_all("input") if form else [])]:
            login_data["Email"] = CHILLERSTATS_EMAIL
        if "Password" in [inp.get("name") for inp in (form.find_all("input") if form else [])]:
            login_data["Password"] = CHILLERSTATS_PASSWORD

        # Find form action URL
        action = login_url
        if form and form.get("action"):
            action = form["action"]
            if not action.startswith("http"):
                action = f"https://chillerstats.com/{action.lstrip('/')}"

        resp = session.post(post_url, data=login_data, allow_redirects=True, timeout=15)

        # Check if login succeeded
        if "login.cfm" in resp.url.lower() and ("error" in resp.text.lower() or "invalid" in resp.text.lower()):
            print("  Login FAILED - check your credentials")
            # Debug: save the response for inspection
            with open(os.path.join(OUTPUT_DIR, "chillerstats-login-debug.html"), "w") as f:
                f.write(resp.text[:5000])
            return
        print(f"  Login appears successful (now at: {resp.url})")
    except Exception as e:
        print(f"  Login error: {e}")
        return

    # Step 2: Fetch schedule pages to find attendance links
    rsvp_games = []
    for team in TEAMS:
        sched_url = f"https://chillerstats.com/team/schedule.cfm?TeamID={team['id']}"
        print(f"  Fetching schedule for {team['name']}...")
        try:
            resp = session.get(sched_url, timeout=15)
            soup = BeautifulSoup(resp.text, "html.parser")
        except Exception as e:
            print(f"    Error: {e}")
            continue

        # Find attendance links - pattern: attendee_display.cfm?...
        att_links = soup.find_all("a", href=re.compile(r"attendee"))
        if not att_links:
            # Also try looking for RSVP or attendance buttons/links
            att_links = soup.find_all("a", href=re.compile(r"attend|rsvp|game_attend"))

        print(f"    Found {len(att_links)} attendance links")

        for link in att_links:
            href = link.get("href", "")
            full_url = href if href.startswith("http") else f"https://chillerstats.com/team/{href}"

            # Try to find game context from surrounding elements
            row = link.find_parent("tr") or link.find_parent("div")
            date_text = ""
            opp_text = ""
            if row:
                text = row.get_text(" ", strip=True)
                # Try to extract date
                date_match = re.search(r"(\d{1,2}/\d{1,2}/\d{2,4})", text)
                if date_match:
                    date_text = date_match.group(1)

            rsvp_games.append({
                "teamName": team["name"],
                "teamId": team["id"],
                "url": full_url,
                "date": date_text,
                "linkText": link.get_text(strip=True),
            })

    # Step 3: Fetch each attendance page
    print(f"\n  Scraping attendance for {len(rsvp_games)} games...")
    attendance_data = []

    for game in rsvp_games:
        try:
            resp = session.get(game["url"], timeout=15)
            soup = BeautifulSoup(resp.text, "html.parser")
        except Exception as e:
            print(f"    Error: {e}")
            continue

        players = {"yes": [], "no": [], "maybe": [], "pending": []}

        # Strategy 1: Look for tables with player names + status
        tables = soup.find_all("table")
        for table in tables:
            for row in table.find_all("tr"):
                cells = row.find_all("td")
                if len(cells) < 1:
                    continue
                name = cells[0].get_text(strip=True)
                if not name or len(name) < 2:
                    continue
                if name.lower() in ["name", "player", "first", "last", "status", "#"]:
                    continue

                # Determine status from row styling, classes, or text
                row_html = str(row).lower()
                cell_texts = [c.get_text(strip=True).lower() for c in cells]
                all_text = " ".join(cell_texts)

                if any(x in row_html for x in ["green", "check", "attending", "confirmed"]) or \
                   any(x in all_text for x in ["yes", "in", "attending", "going", "confirmed"]):
                    players["yes"].append(name)
                elif any(x in row_html for x in ["red", "times", "declined"]) or \
                     any(x in all_text for x in ["no", "out", "declined", "not attending"]):
                    players["no"].append(name)
                elif any(x in row_html for x in ["yellow", "orange", "question", "tentative"]) or \
                     any(x in all_text for x in ["maybe", "tentative", "unsure"]):
                    players["maybe"].append(name)
                else:
                    players["pending"].append(name)

        # Strategy 2: Look for divs/lists with player names if no table found
        if not any(players.values()):
            # Look for sections labeled "attending", "not attending", etc.
            for section_label in ["attending", "going", "yes", "in"]:
                header = soup.find(string=re.compile(section_label, re.I))
                if header:
                    parent = header.find_parent()
                    if parent:
                        next_list = parent.find_next(["ul", "ol", "div", "table"])
                        if next_list:
                            items = next_list.find_all(["li", "tr", "div", "span"])
                            for item in items:
                                name = item.get_text(strip=True)
                                if name and len(name) > 2:
                                    players["yes"].append(name)

        total = sum(len(v) for v in players.values())
        game_entry = {
            "team": game["teamName"],
            "date": game["date"],
            "linkText": game["linkText"],
            "url": game["url"],
            "yes": players["yes"],
            "no": players["no"],
            "maybe": players["maybe"],
            "pending": players["pending"],
            "totalYes": len(players["yes"]),
            "totalNo": len(players["no"]),
            "totalMaybe": len(players["maybe"]),
            "totalPending": len(players["pending"]),
        }
        attendance_data.append(game_entry)
        print(f"    {game['date'] or game['linkText']}: Yes:{len(players['yes'])} No:{len(players['no'])} Maybe:{len(players['maybe'])} Pending:{len(players['pending'])}")

    # Step 4: Save
    rsvp_data = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "source": "chillerstats",
        "totalGames": len(attendance_data),
        "games": attendance_data,
    }
    output_file = os.path.join(OUTPUT_DIR, "chillerstats-rsvp.json")
    with open(output_file, "w") as f:
        json.dump(rsvp_data, f, indent=2)
    print(f"  -> {len(attendance_data)} games saved to {output_file}")

    session.close()


if __name__ == "__main__":
    scrape_chillerstats_rsvp()
