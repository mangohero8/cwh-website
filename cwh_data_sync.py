#!/usr/bin/env python3
"""
CWH Data Sync — Combined scraper for Columbus Warrior Hockey website
Pulls data from ChillerStats and Monday.com, outputs JSON for the website.

Usage:
    # Set your Monday.com API token as environment variable
    export MONDAY_API_TOKEN="your_token_here"
    
    python3 cwh_data_sync.py

    # Or pass token directly
    python3 cwh_data_sync.py --monday-token "your_token_here"

Output files (in public/data/):
    stats-cahl-c.json    — CAHL C team stats from ChillerStats
    stats-cahl-d.json    — CAHL D team stats from ChillerStats
    schedule.json        — Combined game schedule from ChillerStats
    news.json            — News articles from Monday.com board
    events.json          — Events from Monday.com board

Cron setup (every 30 min):
    */30 * * * * cd /path/to/cwh-website && MONDAY_API_TOKEN="xxx" python3 cwh_data_sync.py && git add public/data && git commit -m "Auto-sync data $(date +\%Y-\%m-\%d\ \%H:\%M)" && git push
"""

import json
import os
import sys
import argparse
from datetime import datetime

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Install dependencies: pip3 install requests beautifulsoup4")
    sys.exit(1)

# ─── CONFIGURATION ───
CHILLER_TEAMS = {
    "cahl-c": {
        "name": "CAHL C - Columbus Warriors CSC",
        "guid": "B1ECD637-9E6B-6275-659DF391B958D92F",
    },
    "cahl-d": {
        "name": "CAHL D - Columbus Warriors DWB",
        "guid": "B1F33283-0A80-D7BD-258CF29CE5E30FAA",
    },
}

# Monday.com board IDs (from our setup)
MONDAY_BOARDS = {
    "news": None,  # Will be created or set below
    "events": None,  # Will be created or set below
    "projects": "18414643181",  # CWH Projects
    "onboarding": "18414643412",  # Player Onboarding Pipeline
    "it_projects": "18414644405",  # IT Projects
}

MONDAY_API_URL = "https://api.monday.com/v2"
OUTPUT_DIR = "public/data"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}


def ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)


# ═══════════════════════════════════════════
# CHILLERSTATS SCRAPER
# ═══════════════════════════════════════════

def fetch_page(url):
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return resp.text
    except requests.RequestException as e:
        print(f"  ERROR fetching {url}: {e}")
        return None


def parse_chiller_stats(html, team_name, team_guid):
    """Parse ChillerStats team stats page using data-title attributes."""
    soup = BeautifulSoup(html, "html.parser")
    stats = {
        "team": team_name,
        "season": "",
        "updated": datetime.utcnow().isoformat() + "Z",
        "source": "chillerstats.com",
        "teamId": team_guid,
        "unassigned": [],
        "forwards": [],
        "defense": [],
        "goalies": [],
        "stickAndPuck": [],
        "dropIn": [],
    }

    # Get season from breadcrumb
    breadcrumb = soup.find("ol", class_="breadcrumb")
    if breadcrumb:
        active = breadcrumb.find("li", class_="active")
        if active:
            stats["season"] = active.get_text().strip().replace(" Stats", "")

    # Find all section headers and tables
    sections = soup.find_all("div", class_="col-xs-12")
    current_section = "unassigned"

    for section in sections:
        h2 = section.find("h2")
        if h2:
            text = h2.get_text().strip().upper()
            if "FORWARD" in text:
                current_section = "forwards"
            elif "DEFENSE" in text or "DEFENCE" in text:
                current_section = "defense"
            elif "GOALIE" in text:
                current_section = "goalies"
            elif text == "":
                current_section = "unassigned"

        table = section.find("table")
        if not table:
            continue

        rows = table.find("tbody")
        if not rows:
            continue

        for row in rows.find_all("tr"):
            cells = row.find_all("td")
            if len(cells) < 7:
                continue

            # Use data-title attributes for reliable parsing
            cell_data = {}
            for cell in cells:
                dt = cell.get("data-title", "")
                cell_data[dt] = cell.get_text().strip()

            # Extract player name from link
            name_cell = row.find("td", {"data-title": "Name"})
            name = ""
            if name_cell:
                link = name_cell.find("a")
                name = link.get_text().strip() if link else name_cell.get_text().strip()

            if not name:
                continue

            if current_section == "goalies":
                player = {
                    "jersey": cell_data.get("Jersey", "0"),
                    "name": name,
                    "pos": cell_data.get("Position", "Goalie"),
                    "gp": int(cell_data.get("GP", "0") or "0"),
                    "w": int(cell_data.get("W", "0") or "0"),
                    "l": int(cell_data.get("L", "0") or "0"),
                    "otl": int(cell_data.get("OTL", "0") or "0"),
                    "ga": int(cell_data.get("GA", "0") or "0"),
                    "gaa": cell_data.get("GAA", "0.0"),
                }
            else:
                player = {
                    "jersey": cell_data.get("Jersey", "0"),
                    "name": name,
                    "pos": cell_data.get("Position", ""),
                    "gp": int(cell_data.get("GP", "0") or "0"),
                    "g": int(cell_data.get("G", "0") or "0"),
                    "a": int(cell_data.get("A", "0") or "0"),
                    "pts": int(cell_data.get("PTS", "0") or "0"),
                    "pim": int(cell_data.get("PIM", "0") or "0"),
                }

            stats[current_section].append(player)

    # Parse Stick & Puck and Drop-In schedules from footer
    widgets = soup.find("aside", id="last-widgets")
    if widgets:
        for widget_section in widgets.find_all("section", class_="footer-widget"):
            h3 = widget_section.find("h3")
            if not h3:
                continue
            title = h3.get_text().strip()
            table = widget_section.find("table")
            if not table:
                continue

            target = "stickAndPuck" if "Stick" in title else "dropIn" if "Drop" in title else None
            if not target:
                continue

            for row in table.find_all("tr"):
                cells = row.find_all("td")
                if len(cells) >= 3:
                    stats[target].append({
                        "rink": cells[0].get_text().strip(),
                        "date": cells[1].get_text().strip(),
                        "time": cells[2].get_text().strip(),
                    })

    return stats


def scrape_chillerstats():
    """Scrape all ChillerStats teams."""
    print("\n=== CHILLERSTATS ===")
    all_schedules = []

    for team_key, team_config in CHILLER_TEAMS.items():
        print(f"\nFetching {team_config['name']}...")

        # Stats page
        stats_url = f"https://chillerstats.com/team/stats.cfm?TeamID={team_config['guid']}"
        print(f"  Stats: {stats_url}")
        html = fetch_page(stats_url)
        if html:
            stats = parse_chiller_stats(html, team_config["name"], team_config["guid"])
            output_file = os.path.join(OUTPUT_DIR, f"stats-{team_key}.json")
            with open(output_file, "w") as f:
                json.dump(stats, f, indent=2)
            fwd_count = len(stats["forwards"])
            def_count = len(stats["defense"])
            g_count = len(stats["goalies"])
            u_count = len(stats["unassigned"])
            print(f"  -> Saved: {fwd_count}F, {def_count}D, {g_count}G, {u_count} unassigned")
        else:
            print("  -> FAILED")

        # Schedule page
        sched_url = f"https://chillerstats.com/team/schedule.cfm?TeamID={team_config['guid']}"
        print(f"  Schedule: {sched_url}")
        sched_html = fetch_page(sched_url)
        if sched_html:
            soup = BeautifulSoup(sched_html, "html.parser")
            # Find the main schedule table (not footer tables)
            container = soup.find("div", class_="table-responsive")
            if container:
                table = container.find("table")
                if table:
                    tbody = table.find("tbody")
                    rows = tbody.find_all("tr") if tbody else table.find_all("tr")[1:]
                    for row in rows:
                        cells = row.find_all("td")
                        if len(cells) < 6:
                            continue
                        
                        # Columns: Date, Time, Facility, Rink, Home, Away, Score, W/L
                        date_text = cells[0].get_text().strip()
                        time_text = cells[1].get_text().strip()
                        facility = cells[2].get_text().strip()
                        rink = cells[3].get_text().strip()
                        home_cell = cells[4]
                        away_cell = cells[5]
                        
                        # Determine opponent - our team is bold, opponent is a link
                        home_text = home_cell.get_text().strip()
                        away_text = away_cell.get_text().strip()
                        
                        # Check if our team is home or away (our team has bold style)
                        home_is_us = home_cell.find("td", style=True) is not None or (home_cell.get("style") and "bold" in home_cell.get("style", ""))
                        if not home_is_us:
                            home_is_us = not home_cell.find("a", href=True)
                        
                        if home_is_us:
                            opponent = away_text
                            home_away = "Home"
                        else:
                            opponent = home_text
                            home_away = "Away"
                        
                        # Score and result
                        score = cells[6].get_text().strip() if len(cells) > 6 else ""
                        result_cell = cells[7] if len(cells) > 7 else None
                        result = ""
                        if result_cell:
                            result_link = result_cell.find("a")
                            if result_link:
                                result = result_link.get_text().strip()
                        
                        location = facility + " - " + rink
                        
                        game = {
                            "team": team_config["name"],
                            "date": date_text,
                            "time": time_text,
                            "opponent": opponent,
                            "location": location,
                            "homeAway": home_away,
                            "score": score,
                            "result": result,
                        }
                        if date_text:
                            all_schedules.append(game)
            
            team_games = len([g for g in all_schedules if g["team"] == team_config["name"]])
            print(f"  -> Found {team_games} games")

    # Save combined schedule
    combined = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "games": all_schedules,
    }
    sched_file = os.path.join(OUTPUT_DIR, "schedule.json")
    with open(sched_file, "w") as f:
        json.dump(combined, f, indent=2)
    print(f"\nCombined schedule: {len(all_schedules)} games -> {sched_file}")

    # Generate season leaderboard from stats
    print("\n=== LEADERBOARD ===")
    all_skaters = []
    all_goalies = []
    for team_key, team_config in CHILLER_TEAMS.items():
        stats_file = os.path.join(OUTPUT_DIR, f"stats-{team_key}.json")
        if os.path.exists(stats_file):
            with open(stats_file) as f:
                team_stats = json.load(f)
            team_name = team_config["name"]
            for section in ["forwards", "defense", "unassigned"]:
                for p in team_stats.get(section, []):
                    if p.get("gp", 0) > 0:
                        p["team"] = team_name
                        p["teamKey"] = team_key
                        all_skaters.append(p)
            for p in team_stats.get("goalies", []):
                if p.get("gp", 0) > 0:
                    p["team"] = team_name
                    p["teamKey"] = team_key
                    all_goalies.append(p)

    # Sort leaderboards
    top_points = sorted(all_skaters, key=lambda x: (-x.get("pts", 0), -x.get("g", 0)))[:10]
    top_goals = sorted(all_skaters, key=lambda x: (-x.get("g", 0), -x.get("pts", 0)))[:10]
    top_assists = sorted(all_skaters, key=lambda x: (-x.get("a", 0), -x.get("pts", 0)))[:10]
    top_pim = sorted(all_skaters, key=lambda x: -x.get("pim", 0))[:10]
    top_goalies = sorted(all_goalies, key=lambda x: (float(x.get("gaa", "99")), -x.get("w", 0)))

    # Player of the week - highest points
    potw = top_points[0] if top_points else None

    leaderboard = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "topPoints": top_points,
        "topGoals": top_goals,
        "topAssists": top_assists,
        "topPIM": top_pim,
        "goalies": top_goalies,
        "playerOfTheWeek": potw,
    }
    lb_file = os.path.join(OUTPUT_DIR, "leaderboard.json")
    with open(lb_file, "w") as f:
        json.dump(leaderboard, f, indent=2)
    print(f"Leaderboard: {len(top_points)} skaters, {len(top_goalies)} goalies -> {lb_file}")
    if potw:
        print(f"Player of the Week: {potw['name']} ({potw.get('pts',0)} PTS)")

    # Generate game recaps from schedule results
    print("\n=== GAME RECAPS ===")
    recaps = []
    for game in all_schedules:
        score = game.get("score", "").strip()
        result = game.get("result", "").strip()
        if score and result:
            parts = score.split("-")
            if len(parts) == 2:
                try:
                    s1 = int(parts[0].strip())
                    s2 = int(parts[1].strip())
                except:
                    continue
                
                team_short = game["team"].split(" - ")[-1] if " - " in game["team"] else game["team"]
                opponent = game.get("opponent", "Unknown")
                ha = game.get("homeAway", "")
                
                if result == "W":
                    if ha == "Home":
                        headline = f"{team_short} defeats {opponent} {s1}-{s2} at home"
                    else:
                        headline = f"{team_short} wins {s2}-{s1} on the road against {opponent}"
                    emoji = "🏆"
                elif result == "L":
                    if ha == "Home":
                        headline = f"{team_short} falls to {opponent} {s1}-{s2} at home"
                    else:
                        headline = f"{team_short} loses {s2}-{s1} away to {opponent}"
                    emoji = "📊"
                else:
                    headline = f"{team_short} ties {opponent} {score}"
                    emoji = "🤝"
                
                recap = {
                    "date": game.get("date", ""),
                    "team": game["team"],
                    "opponent": opponent,
                    "score": score,
                    "result": result,
                    "homeAway": ha,
                    "location": game.get("location", ""),
                    "headline": headline,
                }
                recaps.append(recap)
    
    recaps_data = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "recaps": recaps,
    }
    recap_file = os.path.join(OUTPUT_DIR, "recaps.json")
    with open(recap_file, "w") as f:
        json.dump(recaps_data, f, indent=2)
    print(f"Game recaps: {len(recaps)} completed games -> {recap_file}")


# ═══════════════════════════════════════════
# MONDAY.COM API
# ═══════════════════════════════════════════

def monday_query(token, query, variables=None):
    """Execute a Monday.com GraphQL query."""
    headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    }
    payload = {"query": query}
    if variables:
        payload["variables"] = variables

    try:
        resp = requests.post(MONDAY_API_URL, json=payload, headers=headers, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        if "errors" in data:
            print(f"  Monday API error: {data['errors']}")
            return None
        return data.get("data")
    except requests.RequestException as e:
        print(f"  Monday API request failed: {e}")
        return None


def fetch_monday_boards(token):
    """Fetch all boards to find news/events boards."""
    query = """
    query {
        boards(limit: 50) {
            id
            name
        }
    }
    """
    data = monday_query(token, query)
    if data and "boards" in data:
        return data["boards"]
    return []


def fetch_board_items(token, board_id, limit=50):
    """Fetch items from a Monday.com board."""
    query = """
    query($boardId: [ID!]!, $limit: Int!) {
        boards(ids: $boardId) {
            name
            items_page(limit: $limit) {
                items {
                    id
                    name
                    created_at
                    updated_at
                    column_values {
                        id
                        text
                        value
                        type
                    }
                }
            }
        }
    }
    """
    variables = {"boardId": [str(board_id)], "limit": limit}
    data = monday_query(token, query, variables)
    if data and "boards" in data and len(data["boards"]) > 0:
        board = data["boards"][0]
        return board.get("items_page", {}).get("items", [])
    return []


def sync_monday_news(token):
    """
    Sync news from Monday.com.
    Creates a news.json with articles for the website.
    
    To use this, create a Monday board called "News" with columns:
    - Name (title of the article)
    - Status (Published / Draft)
    - Date (publish date)
    - Long Text (article content/excerpt)
    - Link (link to full article or image URL)
    """
    print("\n=== MONDAY.COM NEWS ===")

    # Find the news board
    boards = fetch_monday_boards(token)
    news_board = None
    for b in boards:
        if "news" in b["name"].lower():
            news_board = b
            break

    if not news_board:
        print("  No 'News' board found in Monday.com")
        print("  Create a board called 'News' with columns: Name, Status, Date, Long Text")
        # Save empty news
        news_data = {
            "updated": datetime.utcnow().isoformat() + "Z",
            "articles": [],
            "note": "Create a 'News' board in Monday.com to populate"
        }
        with open(os.path.join(OUTPUT_DIR, "news.json"), "w") as f:
            json.dump(news_data, f, indent=2)
        return

    print(f"  Found board: {news_board['name']} (ID: {news_board['id']})")
    items = fetch_board_items(token, news_board["id"])

    articles = []
    for item in items:
        article = {
            "id": item["id"],
            "title": item["name"],
            "created": item["created_at"],
            "updated": item["updated_at"],
        }
        # Extract column values
        for col in item.get("column_values", []):
            if col["type"] == "date":
                article["date"] = col["text"]
            elif col["type"] == "long_text" or col["type"] == "text":
                if col["text"]:
                    article["excerpt"] = col["text"][:200]
            elif col["type"] == "status":
                article["status"] = col["text"]
            elif col["type"] == "link":
                article["link"] = col["text"]

        # Only include published articles
        status = article.get("status", "").lower()
        if status in ["published", "live", "active", ""]:
            articles.append(article)

    news_data = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "board_id": news_board["id"],
        "articles": articles,
    }
    output_file = os.path.join(OUTPUT_DIR, "news.json")
    with open(output_file, "w") as f:
        json.dump(news_data, f, indent=2)
    print(f"  -> {len(articles)} articles saved to {output_file}")


def sync_monday_events(token):
    """
    Sync events from Monday.com.
    
    To use this, create a Monday board called "Events" with columns:
    - Name (event name)
    - Date (event date)
    - Status (Upcoming / Past)
    - Location (text)
    - Long Text (description)
    """
    print("\n=== MONDAY.COM EVENTS ===")

    boards = fetch_monday_boards(token)
    events_board = None
    for b in boards:
        if "event" in b["name"].lower():
            events_board = b
            break

    if not events_board:
        print("  No 'Events' board found in Monday.com")
        events_data = {
            "updated": datetime.utcnow().isoformat() + "Z",
            "events": [],
            "note": "Create an 'Events' board in Monday.com to populate"
        }
        with open(os.path.join(OUTPUT_DIR, "events.json"), "w") as f:
            json.dump(events_data, f, indent=2)
        return

    print(f"  Found board: {events_board['name']} (ID: {events_board['id']})")
    items = fetch_board_items(token, events_board["id"])

    events = []
    for item in items:
        event = {
            "id": item["id"],
            "name": item["name"],
        }
        for col in item.get("column_values", []):
            if col["type"] == "date":
                event["date"] = col["text"]
            elif col["type"] == "status":
                event["status"] = col["text"]
            elif col["type"] == "text" or col["type"] == "long_text":
                if "loc" in col["id"].lower():
                    event["location"] = col["text"]
                else:
                    event["description"] = col["text"]

        events.append(event)

    events_data = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "board_id": events_board["id"],
        "events": events,
    }
    output_file = os.path.join(OUTPUT_DIR, "events.json")
    with open(output_file, "w") as f:
        json.dump(events_data, f, indent=2)
    print(f"  -> {len(events)} events saved to {output_file}")


def sync_monday_attendance(token):
    """
    Sync game attendance from Monday.com Game Attendance board.
    Board structure: groups = games, items = players, RSVP status column.
    """
    print("\n=== MONDAY.COM ATTENDANCE ===")

    boards = fetch_monday_boards(token)
    att_board = None
    for b in boards:
        if "attendance" in b["name"].lower():
            att_board = b
            break

    if not att_board:
        print("  No 'Game Attendance' board found")
        att_data = {
            "updated": datetime.utcnow().isoformat() + "Z",
            "games": [],
        }
        with open(os.path.join(OUTPUT_DIR, "attendance.json"), "w") as f:
            json.dump(att_data, f, indent=2)
        return

    print(f"  Found board: {att_board['name']} (ID: {att_board['id']})")

    # Fetch board with groups and items
    query = """
    query($boardId: [ID!]!) {
        boards(ids: $boardId) {
            groups {
                id
                title
            }
            items_page(limit: 500) {
                items {
                    id
                    name
                    group {
                        id
                        title
                    }
                    column_values {
                        id
                        text
                        value
                        type
                    }
                }
            }
        }
    }
    """
    data = monday_query(token, query, {"boardId": [str(att_board["id"])]})
    if not data or "boards" not in data or len(data["boards"]) == 0:
        print("  Failed to fetch board data")
        return

    board = data["boards"][0]
    items = board.get("items_page", {}).get("items", [])

    # Organize by game (group)
    games = {}
    for item in items:
        group = item.get("group", {})
        group_title = group.get("title", "Unknown")
        group_id = group.get("id", "")

        if group_title not in games:
            games[group_title] = {
                "game": group_title,
                "groupId": group_id,
                "players": [],
            }

        player = {
            "id": item["id"],
            "name": item["name"],
        }

        for col in item.get("column_values", []):
            col_id = col["id"]
            if "rsvp" in col_id.lower() or col_id == "color_mm3wg5kd":
                player["rsvp"] = col["text"] or ""
            elif "position" in col_id.lower() or col_id == "color_mm3wff6z":
                player["position"] = col["text"] or ""
            elif "jersey" in col_id.lower() or col_id == "text_mm3w8t2w":
                player["jersey"] = col["text"] or ""
            elif "team" in col_id.lower() or col_id == "color_mm3w3fg4":
                player["team"] = col["text"] or ""

        games[group_title]["players"].append(player)

    # Build lineup for each game
    game_list = []
    for game_name, game_data in games.items():
        yes_players = [p for p in game_data["players"] if p.get("rsvp", "").lower() == "yes"]
        maybe_players = [p for p in game_data["players"] if p.get("rsvp", "").lower() == "maybe"]
        no_players = [p for p in game_data["players"] if p.get("rsvp", "").lower() == "no"]
        no_response = [p for p in game_data["players"] if p.get("rsvp", "") == ""]

        # Auto-generate lineup from Yes players
        centers = [p for p in yes_players if p.get("position", "").lower() == "center"]
        wings = [p for p in yes_players if p.get("position", "").lower() in ["wing", "forward"]]
        defense = [p for p in yes_players if p.get("position", "").lower() == "defense"]
        goalies = [p for p in yes_players if p.get("position", "").lower() == "goalie"]
        unassigned = [p for p in yes_players if p.get("position", "") == "" or p.get("position", "").lower() not in ["center", "wing", "forward", "defense", "goalie"]]

        # Build forward lines: 1 Center + 2 Wings per line
        # Extra wings or unassigned fill remaining spots
        available_wings = wings + unassigned  # Unassigned skaters go to wing pool
        lines = []
        line_num = 1
        
        # First, build lines around each center
        for c in centers:
            line_players = []
            # Pick up to 2 wings for this line
            w1 = available_wings.pop(0) if available_wings else None
            w2 = available_wings.pop(0) if available_wings else None
            if w1:
                line_players.append(w1)
            line_players.append(c)  # Center in the middle
            if w2:
                line_players.append(w2)
            lines.append({"line": line_num, "players": line_players})
            line_num += 1
        
        # Remaining wings without a center form additional lines
        while len(available_wings) >= 2:
            chunk = []
            for _ in range(min(3, len(available_wings))):
                chunk.append(available_wings.pop(0))
            lines.append({"line": line_num, "players": chunk})
            line_num += 1
        
        # Any solo leftover wing
        if available_wings:
            lines.append({"line": line_num, "players": available_wings})
            line_num += 1

        d_pairs = []
        pair_num = 1
        for i in range(0, len(defense), 2):
            pair = defense[i:i+2]
            d_pairs.append({"pair": pair_num, "players": pair})
            pair_num += 1

        game_entry = {
            "game": game_name,
            "totalPlayers": len(game_data["players"]),
            "yes": len(yes_players),
            "no": len(no_players),
            "maybe": len(maybe_players),
            "noResponse": len(no_response),
            "lineup": {
                "forwards": lines,
                "defense": d_pairs,
                "goalies": goalies,
            },
            "bench": maybe_players,
            "out": no_players,
            "pending": no_response,
        }
        game_list.append(game_entry)

    att_data = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "board_id": att_board["id"],
        "games": game_list,
    }
    output_file = os.path.join(OUTPUT_DIR, "attendance.json")
    with open(output_file, "w") as f:
        json.dump(att_data, f, indent=2)
    print(f"  -> {len(game_list)} games with attendance saved to {output_file}")


def generate_leaderboard():
    """Generate season leaderboard from stats JSON files."""
    print("\n=== LEADERBOARD ===")
    
    all_skaters = []
    all_goalies = []
    
    for team_key in ["cahl-c", "cahl-d"]:
        stats_file = os.path.join(OUTPUT_DIR, f"stats-{team_key}.json")
        if not os.path.exists(stats_file):
            continue
        with open(stats_file) as f:
            stats = json.load(f)
        
        team_name = stats.get("team", team_key)
        
        for section in ["forwards", "defense", "unassigned"]:
            for p in stats.get(section, []):
                if p.get("gp", 0) > 0:
                    all_skaters.append({
                        "name": p["name"],
                        "team": team_name,
                        "jersey": p.get("jersey", ""),
                        "pos": p.get("pos", ""),
                        "gp": p.get("gp", 0),
                        "g": p.get("g", 0),
                        "a": p.get("a", 0),
                        "pts": p.get("pts", 0),
                        "pim": p.get("pim", 0),
                    })
        
        for g in stats.get("goalies", []):
            if g.get("gp", 0) > 0:
                all_goalies.append({
                    "name": g["name"],
                    "team": team_name,
                    "jersey": g.get("jersey", ""),
                    "gp": g.get("gp", 0),
                    "w": g.get("w", 0),
                    "l": g.get("l", 0),
                    "gaa": g.get("gaa", "0.0"),
                    "ga": g.get("ga", 0),
                })
    
    # Sort leaderboards
    top_points = sorted(all_skaters, key=lambda x: (-x["pts"], -x["g"]))[:10]
    top_goals = sorted(all_skaters, key=lambda x: -x["g"])[:10]
    top_assists = sorted(all_skaters, key=lambda x: -x["a"])[:10]
    top_pim = sorted(all_skaters, key=lambda x: -x["pim"])[:5]
    goalies_ranked = sorted(all_goalies, key=lambda x: float(x["gaa"]))
    
    # Player of the week - top points scorer
    potw = top_points[0] if top_points else None
    
    leaderboard = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "playerOfTheWeek": potw,
        "topPoints": top_points,
        "topGoals": top_goals,
        "topAssists": top_assists,
        "topPIM": top_pim,
        "goalies": goalies_ranked,
    }
    
    output_file = os.path.join(OUTPUT_DIR, "leaderboard.json")
    with open(output_file, "w") as f:
        json.dump(leaderboard, f, indent=2)
    print(f"  -> Leaderboard saved with {len(all_skaters)} skaters, {len(all_goalies)} goalies")


def generate_recaps():
    """Generate game recaps from schedule data (games with scores)."""
    print("\n=== GAME RECAPS ===")
    
    sched_file = os.path.join(OUTPUT_DIR, "schedule.json")
    if not os.path.exists(sched_file):
        print("  No schedule.json found")
        return
    
    with open(sched_file) as f:
        schedule = json.load(f)
    
    recaps = []
    for game in schedule.get("games", []):
        score = game.get("score", "").strip()
        result = game.get("result", "").strip()
        if not score or not result:
            continue
        
        # Parse score "2 - 3" format
        parts = score.split("-")
        if len(parts) != 2:
            continue
        
        try:
            score_home = int(parts[0].strip())
            score_away = int(parts[1].strip())
        except ValueError:
            continue
        
        is_home = game.get("homeAway", "") == "Home"
        opponent = game.get("opponent", "Unknown")
        team = game.get("team", "")
        
        if is_home:
            our_score = score_home
            their_score = score_away
        else:
            our_score = score_away
            their_score = score_home
        
        won = result.upper() == "W"
        
        # Generate recap text
        if won:
            if our_score - their_score >= 3:
                headline = f"Warriors Dominate {opponent}"
                summary = f"A commanding {our_score}-{their_score} victory over {opponent}."
            elif our_score - their_score == 1:
                headline = f"Warriors Edge {opponent} in Thriller"
                summary = f"A hard-fought {our_score}-{their_score} win against {opponent}."
            else:
                headline = f"Warriors Take Down {opponent}"
                summary = f"A solid {our_score}-{their_score} victory over {opponent}."
        else:
            if their_score - our_score >= 3:
                headline = f"Warriors Fall to {opponent}"
                summary = f"A tough {their_score}-{our_score} loss against {opponent}."
            elif their_score - our_score == 1:
                headline = f"Warriors Drop Close One to {opponent}"
                summary = f"A narrow {their_score}-{our_score} defeat against {opponent}."
            else:
                headline = f"Warriors Come Up Short Against {opponent}"
                summary = f"A {their_score}-{our_score} loss to {opponent}."
        
        recap = {
            "date": game.get("date", ""),
            "team": team,
            "opponent": opponent,
            "location": game.get("location", ""),
            "homeAway": game.get("homeAway", ""),
            "score": score,
            "result": result,
            "ourScore": our_score,
            "theirScore": their_score,
            "headline": headline,
            "summary": summary,
        }
        recaps.append(recap)
    
    recap_data = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "recaps": recaps,
    }
    output_file = os.path.join(OUTPUT_DIR, "recaps.json")
    with open(output_file, "w") as f:
        json.dump(recap_data, f, indent=2)
    print(f"  -> {len(recaps)} game recaps generated")


def sync_monday_leadership(token):
    """Sync leadership data from Monday.com Leadership board."""
    print("\n=== MONDAY.COM LEADERSHIP ===")

    boards = fetch_monday_boards(token)
    lead_board = None
    for b in boards:
        if "leadership" in b["name"].lower():
            lead_board = b
            break

    if not lead_board:
        print("  No 'Leadership' board found")
        lead_data = {"updated": datetime.utcnow().isoformat() + "Z", "sections": []}
        with open(os.path.join(OUTPUT_DIR, "leadership.json"), "w") as f:
            json.dump(lead_data, f, indent=2)
        return

    print(f"  Found board: {lead_board['name']} (ID: {lead_board['id']})")

    query = """
    query($boardId: [ID!]!) {
        boards(ids: $boardId) {
            groups {
                id
                title
            }
            items_page(limit: 200) {
                items {
                    id
                    name
                    group {
                        id
                        title
                    }
                    column_values {
                        id
                        text
                        value
                        type
                    }
                }
            }
        }
    }
    """
    data = monday_query(token, query, {"boardId": [str(lead_board["id"])]})
    if not data or "boards" not in data or len(data["boards"]) == 0:
        print("  Failed to fetch board data")
        return

    board = data["boards"][0]
    groups = board.get("groups", [])
    items = board.get("items_page", {}).get("items", [])

    # Organize by group (section)
    sections = {}
    for group in groups:
        sections[group["id"]] = {
            "section": group["title"],
            "members": [],
        }

    for item in items:
        group = item.get("group", {})
        group_id = group.get("id", "")
        if group_id not in sections:
            continue

        member = {
            "name": item["name"],
        }

        for col in item.get("column_values", []):
            col_id = col["id"]
            text = col.get("text", "") or ""
            if col_id == "text_mm3w8845":
                member["title"] = text
            elif col_id == "long_text_mm3wjghn":
                member["bio"] = text
            elif col_id == "color_mm3wvp77":
                member["branch"] = text
            elif col_id == "link_mm3wsyaj":
                # Parse link - Monday returns "text - url" format
                if " - http" in text:
                    member["photo"] = text.split(" - ")[-1]
                elif text.startswith("http"):
                    member["photo"] = text
                else:
                    member["photo"] = ""
            elif col_id == "link_mm3weeds":
                if " - http" in text:
                    member["militaryPhoto"] = text.split(" - ")[-1]
                elif text.startswith("http"):
                    member["militaryPhoto"] = text
                else:
                    member["militaryPhoto"] = ""
            elif col_id == "text_mm3wkb8f":
                member["serviceYears"] = text
            elif col_id == "numeric_mm3wcthf":
                try:
                    member["order"] = int(float(text)) if text else 99
                except:
                    member["order"] = 99

        sections[group_id]["members"].append(member)

    # Sort members by order within each section
    section_list = []
    for gid, section in sections.items():
        section["members"].sort(key=lambda m: m.get("order", 99))
        if section["members"]:
            section_list.append(section)

    lead_data = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "board_id": lead_board["id"],
        "sections": section_list,
    }
    output_file = os.path.join(OUTPUT_DIR, "leadership.json")
    with open(output_file, "w") as f:
        json.dump(lead_data, f, indent=2)
    total = sum(len(s["members"]) for s in section_list)
    print(f"  -> {total} members in {len(section_list)} sections saved to {output_file}")


# ═══════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(description="CWH Data Sync")
    parser.add_argument("--monday-token", help="Monday.com API token")
    parser.add_argument("--skip-chiller", action="store_true", help="Skip ChillerStats scraping")
    parser.add_argument("--skip-monday", action="store_true", help="Skip Monday.com sync")
    args = parser.parse_args()

    print(f"CWH Data Sync — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

    ensure_output_dir()

    # ChillerStats
    if not args.skip_chiller:
        scrape_chillerstats()
    else:
        print("\nSkipping ChillerStats")

    # Generate leaderboard and recaps from scraped data
    generate_leaderboard()
    generate_recaps()

    # Monday.com
    monday_token = args.monday_token or os.environ.get("MONDAY_API_TOKEN")
    if monday_token and not args.skip_monday:
        sync_monday_news(monday_token)
        sync_monday_events(monday_token)
        sync_monday_attendance(monday_token)
        sync_monday_leadership(monday_token)
    elif not args.skip_monday:
        print("\nSkipping Monday.com — no API token provided")
        print("  Set MONDAY_API_TOKEN env var or use --monday-token flag")

    print("\n" + "=" * 50)
    print("Sync complete!")
    print(f"Output directory: {OUTPUT_DIR}/")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        if f.endswith(".json"):
            size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
            print(f"  {f} ({size:,} bytes)")


if __name__ == "__main__":
    main()
