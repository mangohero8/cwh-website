# CWH Website — Developer Setup Guide

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)
- A GitHub account with access to this repo

## 1. Clone the repo

```bash
git clone https://github.com/mangohero8/cwh-website.git
cd cwh-website
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the local dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser — you'll see the site running locally. The dev server auto-reloads as you save changes.

## 4. Create a branch for your work

```bash
git checkout -b feature/your-feature-name
```

Use descriptive names:
- `feature/photo-gallery`
- `fix/schedule-parsing`
- `update/roster-photos`
- `style/footer-spacing`

## 5. Make your changes

Edit files, add images, update styles. Key files:

| File | Purpose |
|---|---|
| `src/App.jsx` | Main site — all pages and components |
| `public/images/` | All images (logos, players, sponsors, news) |
| `public/data/` | JSON data files (auto-generated — **do not edit**) |
| `cwh_data_sync.py` | ChillerStats + Monday.com scraper (runs on Proxmox) |

## 6. Commit your changes

```bash
git add -A
git commit -m "Description of what you changed"
```

## 7. Push your branch

```bash
git push -u origin feature/your-feature-name
```

## 8. Create a Pull Request

1. Go to [github.com/mangohero8/cwh-website](https://github.com/mangohero8/cwh-website)
2. You'll see a banner: **"Compare & pull request"** — click it
3. Add a description of your changes
4. Click **"Create pull request"**
5. Cloudflare will auto-build a preview at a temporary URL — check it to verify your changes look correct
6. Tag Robb (@mangohero8) for review

## 9. After approval, merge

- Click **"Merge pull request"** on GitHub
- The live site at [cwh.carp-home.com](https://cwh.carp-home.com) auto-deploys within ~1 minute
- Delete your branch after merging to keep things clean

## Rules

- **Never push directly to `main`** — always use a branch + Pull Request
- **Don't edit files in `public/data/`** — they're auto-generated every 30 minutes by the Proxmox scraper pulling from ChillerStats and Monday.com
- **Test locally** with `npm run dev` before pushing
- **Self-host images** — don't link to external image URLs; download and place them in `public/images/`

## Tech Stack

- **React 18** + **Vite 6** — frontend framework and build tool
- **Cloudflare Pages** — hosting and deployment (auto-deploys on push to main)
- **ChillerStats** — live hockey stats and schedule data
- **Monday.com** — news articles and events management
- **Proxmox** — server running the data sync cron job every 30 minutes

## Data Pipeline

```
ChillerStats ─┐
               ├─→ Proxmox (cwh_data_sync.py) ─→ JSON files ─→ GitHub ─→ Cloudflare Pages ─→ cwh.carp-home.com
Monday.com  ───┘
```

The scraper runs every 30 minutes and auto-commits updated JSON to `public/data/`. The site reads these JSON files at runtime to display live stats, schedules, news, and events.

## Questions?

Contact Robb Carpenter — carprobb15@gmail.com
