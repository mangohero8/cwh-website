#!/bin/bash
# CWH Data Sync — Cron Setup for Proxmox
# Run this once on your Proxmox server to set up auto-sync

set -e

echo "CWH Data Sync — Cron Setup"
echo "=========================="

# Check dependencies
echo "Checking dependencies..."
python3 --version || { echo "ERROR: Python 3 required"; exit 1; }
pip3 install requests beautifulsoup4 --quiet
echo "  Dependencies installed"

# Check for git
git --version || { echo "ERROR: git required"; exit 1; }

# Get the repo path
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "  Repo path: $SCRIPT_DIR"

# Prompt for Monday.com API token
echo ""
read -p "Enter your Monday.com API token: " MONDAY_TOKEN
echo ""

# Test the token
echo "Testing Monday.com API..."
RESULT=$(curl -s -X POST "https://api.monday.com/v2" \
  -H "Authorization: $MONDAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ me { name } }"}')

if echo "$RESULT" | grep -q "name"; then
  echo "  Monday.com API: OK"
else
  echo "  WARNING: Monday.com API test failed. Check your token."
  echo "  Result: $RESULT"
fi

# Test ChillerStats
echo "Testing ChillerStats..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://chillerstats.com/team/stats.cfm?TeamID=B1ECD637-9E6B-6275-659DF391B958D92F")
if [ "$STATUS" = "200" ]; then
  echo "  ChillerStats: OK"
else
  echo "  WARNING: ChillerStats returned $STATUS"
fi

# Run initial sync
echo ""
echo "Running initial sync..."
cd "$SCRIPT_DIR"
MONDAY_API_TOKEN="$MONDAY_TOKEN" python3 cwh_data_sync.py

# Set up git auto-push
echo ""
echo "Setting up git config..."
git config user.email "sync@columbuswarriorhockey.org"
git config user.name "CWH Auto Sync"

# Create the cron job
CRON_LINE="*/30 * * * * cd $SCRIPT_DIR && MONDAY_API_TOKEN=\"$MONDAY_TOKEN\" python3 cwh_data_sync.py >> /tmp/cwh_sync.log 2>&1 && git add public/data && git diff --cached --quiet || (git commit -m \"Auto-sync \$(date +\\%Y-\\%m-\\%d\\ \\%H:\\%M)\" && git push)"

echo ""
echo "Add this to your crontab (crontab -e):"
echo ""
echo "$CRON_LINE"
echo ""

read -p "Add to crontab automatically? (y/n): " ADD_CRON
if [ "$ADD_CRON" = "y" ]; then
  (crontab -l 2>/dev/null | grep -v "cwh_data_sync"; echo "$CRON_LINE") | crontab -
  echo "Cron job added! It will run every 30 minutes."
else
  echo "Skipped. Add the cron line manually with: crontab -e"
fi

echo ""
echo "Setup complete!"
echo "  Sync script: $SCRIPT_DIR/cwh_data_sync.py"
echo "  Log file: /tmp/cwh_sync.log"
echo "  Data output: $SCRIPT_DIR/public/data/"
