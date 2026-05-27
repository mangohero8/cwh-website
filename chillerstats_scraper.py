#!/usr/bin/env python3
"""
ChillerStats Scraper for Columbus Warrior Hockey
Fetches team stats, schedules, and player data from chillerstats.com
Outputs JSON files that the website reads for live stats display.

Usage:
    python3 chillerstats_scraper.py

Output:
    public/data/stats-cahl-c.json
    public/data/stats-cahl-d.json
    public/data/schedule.json

Run this on a cron schedule (e.g., every 30 minutes) on your server:
    */30 * * * * cd /path/to/cwh-website && python3 chillerstats_scraper.py
"""

import json
import os
import sys
from datetime import datetime

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Install dependencies: pip3 install requests beautifulsoup4")
    sys.exit(1)

# ─── CONFIGURATION ───
# Replace these with your actual ChillerStats team GUIDs
# Find them by navigating to your team page on chillerstats.com
# The URL will look like: chillerstats.com/team/stats.cfm?TeamID=XXXXXXXX-XXXX-XXXX-XXXXXXXXXXXX

TEAMS = {
    "cahl-c": {
        "name": "CAHL C - Columbus Warriors CSC",
        "guid": "B1ECD637-9E6B-6275-659DF391B958D92F",
        "stats_url": "https://chillerstats.com/team/stats.cfm?TeamID=B1ECD637-9E6B-6275-659DF391B958D92F",
        "schedule_url": "https://chillerstats.com/team/schedule.cfm?TeamID=B1ECD637-9E6B-6275-659DF391B958D92F",
    },
    "cahl-d": {
        "name": "CAHL D - Warriors",
        "guid": "B1F33283-0A80-D7BD-258CF29CE5E30FAA",
        "stats_url": "https://chillerstats.com/team/stats.cfm?TeamID=B1F33283-0A80-D7BD-258CF29CE5E30FAA",
        "schedule_url": "https://chillerstats.com/team/schedule.cfm?TeamID=B1F33283-0A80-D7BD-258CF29CE5E30FAA",
    },
}

OUTPUT_DIR = "public/data"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)


def fetch_page(url):
    """Fetch a page from ChillerStats with retry logic."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return resp.text
    except requests.RequestException as e:
        print(f"  ERROR fetching {url}: {e}")
        return None


def parse_stats_page(html, team_name):
    """
    Parse the ChillerStats team stats page.
    Extracts forwards, defense, and goalie stats tables.
    
    NOTE: You'll need to inspect the actual HTML structure of your team's
    stats page and adjust the selectors below. The structure typically has:
    - H2/H3 headers: "FORWARDS", "DEFENSE", "GOALIES"
    - Tables with columns: #, Name, GP, G, A, PTS, PIM, PPG, SHG, GWG
    - Goalie tables: #, Name, GP, W, L, T, GAA, SA, SV%, SO
    """
    soup = BeautifulSoup(html, "html.parser")
    stats = {
        "team": team_name,
        "updated": datetime.utcnow().isoformat() + "Z",
        "forwards": [],
        "defense": [],
        "goalies": [],
    }

    # Find all tables on the page
    tables = soup.find_all("table")
    
    current_section = "forwards"
    
    for table in tables:
        # Try to determine which section this table belongs to
        prev = table.find_previous(["h2", "h3", "h4", "b", "strong"])
        if prev:
            text = prev.get_text().strip().upper()
            if "FORWARD" in text:
                current_section = "forwards"
            elif "DEFENSE" in text or "DEFENCE" in text:
                current_section = "defense"
            elif "GOALIE" in text or "GOAL" in text:
                current_section = "goalies"

        rows = table.find_all("tr")
        for row in rows[1:]:  # Skip header row
            cells = row.find_all(["td", "th"])
            if len(cells) < 4:
                continue
            
            cell_texts = [c.get_text().strip() for c in cells]
            
            if current_section in ["forwards", "defense"]:
                # Skater stats: #, Name, GP, G, A, PTS, PIM, ...
                try:
                    player = {
                        "number": cell_texts[0] if cell_texts[0].isdigit() else "",
                        "name": cell_texts[1] if len(cell_texts) > 1 else "",
                        "gp": int(cell_texts[2]) if len(cell_texts) > 2 and cell_texts[2].isdigit() else 0,
                        "g": int(cell_texts[3]) if len(cell_texts) > 3 and cell_texts[3].isdigit() else 0,
                        "a": int(cell_texts[4]) if len(cell_texts) > 4 and cell_texts[4].isdigit() else 0,
                        "pts": int(cell_texts[5]) if len(cell_texts) > 5 and cell_texts[5].isdigit() else 0,
                        "pim": int(cell_texts[6]) if len(cell_texts) > 6 and cell_texts[6].isdigit() else 0,
                    }
                    if player["name"]:
                        stats[current_section].append(player)
                except (ValueError, IndexError):
                    continue
            
            elif current_section == "goalies":
                # Goalie stats: #, Name, GP, W, L, T, GAA, SA, SV%, SO
                try:
                    player = {
                        "number": cell_texts[0] if cell_texts[0].isdigit() else "",
                        "name": cell_texts[1] if len(cell_texts) > 1 else "",
                        "gp": int(cell_texts[2]) if len(cell_texts) > 2 and cell_texts[2].isdigit() else 0,
                        "w": int(cell_texts[3]) if len(cell_texts) > 3 and cell_texts[3].isdigit() else 0,
                        "l": int(cell_texts[4]) if len(cell_texts) > 4 and cell_texts[4].isdigit() else 0,
                        "gaa": cell_texts[6] if len(cell_texts) > 6 else "0.00",
                        "svpct": cell_texts[8] if len(cell_texts) > 8 else ".000",
                    }
                    if player["name"]:
                        stats["goalies"].append(player)
                except (ValueError, IndexError):
                    continue

    return stats


def parse_schedule_page(html, team_name):
    """
    Parse the ChillerStats team schedule page.
    Extracts upcoming and past games.
    """
    soup = BeautifulSoup(html, "html.parser")
    schedule = {
        "team": team_name,
        "updated": datetime.utcnow().isoformat() + "Z",
        "games": [],
    }

    tables = soup.find_all("table")
    for table in tables:
        rows = table.find_all("tr")
        for row in rows[1:]:
            cells = row.find_all(["td", "th"])
            cell_texts = [c.get_text().strip() for c in cells]
            
            if len(cell_texts) >= 4:
                game = {
                    "date": cell_texts[0] if len(cell_texts) > 0 else "",
                    "time": cell_texts[1] if len(cell_texts) > 1 else "",
                    "opponent": cell_texts[2] if len(cell_texts) > 2 else "",
                    "location": cell_texts[3] if len(cell_texts) > 3 else "",
                    "result": cell_texts[4] if len(cell_texts) > 4 else "",
                }
                if game["date"] and game["opponent"]:
                    schedule["games"].append(game)

    return schedule


def main():
    print(f"ChillerStats Scraper — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)
    
    ensure_output_dir()
    
    all_schedules = []
    
    for team_key, team_config in TEAMS.items():
        print(f"\nFetching {team_config['name']}...")
        
        # Fetch stats
        print(f"  Stats: {team_config['stats_url']}")
        stats_html = fetch_page(team_config["stats_url"])
        if stats_html:
            stats = parse_stats_page(stats_html, team_config["name"])
            output_file = os.path.join(OUTPUT_DIR, f"stats-{team_key}.json")
            with open(output_file, "w") as f:
                json.dump(stats, f, indent=2)
            print(f"  -> Saved {output_file}")
            print(f"     Forwards: {len(stats['forwards'])}, Defense: {len(stats['defense'])}, Goalies: {len(stats['goalies'])}")
        
        # Fetch schedule
        print(f"  Schedule: {team_config['schedule_url']}")
        sched_html = fetch_page(team_config["schedule_url"])
        if sched_html:
            schedule = parse_schedule_page(sched_html, team_config["name"])
            all_schedules.extend(schedule["games"])
            print(f"  -> Found {len(schedule['games'])} games")
    
    # Save combined schedule
    combined = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "games": sorted(all_schedules, key=lambda g: g.get("date", "")),
    }
    sched_file = os.path.join(OUTPUT_DIR, "schedule.json")
    with open(sched_file, "w") as f:
        json.dump(combined, f, indent=2)
    print(f"\nCombined schedule saved to {sched_file} ({len(all_schedules)} total games)")
    
    print("\nDone!")


if __name__ == "__main__":
    main()
