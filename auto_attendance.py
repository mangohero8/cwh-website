#!/usr/bin/env python3
"""
Auto-create Game Attendance groups in Monday.com from ChillerStats schedule.
Add this function to cwh_data_sync.py or run standalone.

Reads schedule.json and roster JSONs, then:
1. Finds upcoming games (no score yet)
2. Checks which games already have groups in Monday.com
3. Creates new groups + populates with roster players
"""

import os
import json
import requests
from datetime import datetime

OUTPUT_DIR = "public/data"
MONDAY_API_URL = "https://api.monday.com/v2"
ATTENDANCE_BOARD_ID = "18415594839"

# Column IDs on the Game Attendance board
COL_RSVP = "color_mm3wg5kd"
COL_POSITION = "color_mm3wff6z"
COL_JERSEY = "text_mm3w8t2w"
COL_TEAM = "color_mm3w3fg4"

# Team mapping for schedule -> roster
TEAM_MAP = {
    "Columbus Warriors CSC": {"roster": "roster-cahl-c.json", "stats": "stats-cahl-c.json", "label": "CAHL C"},
    "Columbus Warriors DWB": {"roster": "roster-cahl-d.json", "stats": "stats-cahl-d.json", "label": "CAHL D"},
}


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
        resp = requests.post(MONDAY_API_URL, json=payload, headers=headers, timeout=30)
        data = resp.json()
        if "errors" in data:
            print(f"    Monday API error: {data['errors']}")
            return None
        return data.get("data")
    except Exception as e:
        print(f"    Monday API exception: {e}")
        return None


def get_existing_groups(token):
    """Get all existing group titles from the Game Attendance board."""
    query = """
    query($boardId: [ID!]!) {
        boards(ids: $boardId) {
            groups {
                id
                title
            }
        }
    }
    """
    data = monday_query(token, query, {"boardId": [ATTENDANCE_BOARD_ID]})
    if not data or "boards" not in data:
        return []
    return data["boards"][0].get("groups", [])


def create_group(token, group_name, color="#007eb5"):
    """Create a new group in the Game Attendance board."""
    query = """
    mutation($boardId: ID!, $groupName: String!, $groupColor: String) {
        create_group(board_id: $boardId, group_name: $groupName, group_color: $groupColor) {
            id
            title
        }
    }
    """
    data = monday_query(token, query, {
        "boardId": ATTENDANCE_BOARD_ID,
        "groupName": group_name,
        "groupColor": color,
    })
    if data and "create_group" in data:
        return data["create_group"]
    return None


def add_player_to_group(token, group_id, name, position="", jersey="", team_label=""):
    """Add a player item to a group."""
    col_values = {}
    if team_label:
        col_values[COL_TEAM] = {"label": team_label}
    if position:
        # Map position names to Monday.com labels
        pos_map = {
            "C": "Center", "Center": "Center",
            "LW": "Wing", "RW": "Wing", "W": "Wing", "Wing": "Wing", "F": "Wing", "Forward": "Wing",
            "D": "Defense", "Defense": "Defense", "LD": "Defense", "RD": "Defense",
            "G": "Goalie", "Goalie": "Goalie",
        }
        mapped = pos_map.get(position, "")
        if mapped:
            col_values[COL_POSITION] = {"label": mapped}
    if jersey:
        col_values[COL_JERSEY] = str(jersey)

    query = """
    mutation($boardId: ID!, $groupId: String!, $itemName: String!, $colValues: JSON!) {
        create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $colValues) {
            id
            name
        }
    }
    """
    data = monday_query(token, query, {
        "boardId": ATTENDANCE_BOARD_ID,
        "groupId": group_id,
        "itemName": name,
        "colValues": json.dumps(col_values),
    })
    return data


def get_roster_players(team_name):
    """Get player list from roster and stats JSON files."""
    team_info = TEAM_MAP.get(team_name)
    if not team_info:
        return []

    players = []

    # Try stats file first (has position data)
    stats_file = os.path.join(OUTPUT_DIR, team_info["stats"])
    if os.path.exists(stats_file):
        with open(stats_file) as f:
            stats = json.load(f)

        for section, pos in [("forwards", ""), ("defense", "Defense"), ("goalies", "Goalie")]:
            for p in stats.get(section, []):
                player = {
                    "name": p.get("name", ""),
                    "jersey": p.get("jersey", ""),
                    "position": pos or p.get("pos", ""),
                }
                if player["name"]:
                    players.append(player)

        # Add unassigned players
        for p in stats.get("unassigned", []):
            player = {
                "name": p.get("name", ""),
                "jersey": p.get("jersey", ""),
                "position": p.get("pos", ""),
            }
            if player["name"]:
                players.append(player)

    return players


def make_game_label(game, team_label):
    """Create a group name like 'Jun 14 — CAHL C vs Tabby Daddies (Home)'"""
    date = game.get("date", "")
    opponent = game.get("opponent", "Unknown")
    home_away = game.get("homeAway", "")

    ha_tag = f" ({home_away})" if home_away else ""
    return f"{date} — {team_label} vs {opponent}{ha_tag}"


def auto_create_attendance_groups(token):
    """Main function: auto-create game attendance groups from schedule."""
    print("\n=== AUTO-CREATE ATTENDANCE GROUPS ===")

    if not token:
        print("  No Monday API token, skipping")
        return

    # Load schedule
    sched_file = os.path.join(OUTPUT_DIR, "schedule.json")
    if not os.path.exists(sched_file):
        print("  No schedule.json found, run ChillerStats scraper first")
        return

    with open(sched_file) as f:
        schedule = json.load(f)

    # Find upcoming games (no score)
    upcoming = []
    for game in schedule.get("games", []):
        score = game.get("score", "").strip()
        if not score:
            upcoming.append(game)

    print(f"  Found {len(upcoming)} upcoming games in schedule")

    if not upcoming:
        print("  No upcoming games to create groups for")
        return

    # Get existing groups
    existing_groups = get_existing_groups(token)
    existing_titles = [g["title"].lower() for g in existing_groups]
    print(f"  {len(existing_groups)} existing groups in attendance board")

    # Process each upcoming game
    created = 0
    for game in upcoming:
        team_name = game.get("team", "")
        team_info = TEAM_MAP.get(team_name)
        if not team_info:
            continue

        team_label = team_info["label"]
        group_name = make_game_label(game, team_label)

        # Check if group already exists (fuzzy match on date + opponent)
        opponent = game.get("opponent", "").lower()
        date = game.get("date", "").lower()
        already_exists = False
        for existing in existing_titles:
            if date in existing and opponent in existing:
                already_exists = True
                break

        if already_exists:
            print(f"  SKIP (exists): {group_name}")
            continue

        # Create group
        color = "#007eb5" if team_label == "CAHL C" else "#fdab3d"
        group = create_group(token, group_name, color)
        if not group:
            print(f"  FAILED to create: {group_name}")
            continue

        group_id = group["id"]
        print(f"  CREATED: {group_name} (ID: {group_id})")

        # Add all roster players
        players = get_roster_players(team_name)
        for p in players:
            add_player_to_group(
                token, group_id,
                p["name"], p["position"], p["jersey"], team_label
            )

        print(f"    Added {len(players)} players")
        created += 1

    print(f"  -> {created} new game groups created")


if __name__ == "__main__":
    token = os.environ.get("MONDAY_API_TOKEN", "")
    if not token:
        print("Set MONDAY_API_TOKEN environment variable")
    else:
        auto_create_attendance_groups(token)
