# Columbus Warrior Hockey Website

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/cwh-website.git
cd cwh-website

# 2. Download images from Crossbar
chmod +x download-images.sh
./download-images.sh

# 3. Install dependencies
npm install

# 4. Run locally
npm run dev

# 5. Build for production
npm run build
# Output goes to /dist — upload this to Cloudflare Pages
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to Cloudflare Dashboard → Pages → Create a project
3. Connect your GitHub repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18
5. Deploy

## Image Setup

Images must be downloaded from Crossbar and placed in `public/images/`. Run the download script or manually save each image.

### Required images:
| File | Source |
|------|--------|
| logo.png | CWH logo |
| hero.jpg | Homepage banner photo |
| sponsors-all.jpg | Sponsor collage image |
| usahockey.png | USA Hockey badge |
| midam.png | Mid-Am Hockey badge |
| kroger.jpg | Kroger Community Rewards logo |
| moomoo.png | Moo Moo Express Car Wash logo |
| chiller.png | OhioHealth Chiller logo |
| guardians-cup.jpg | Guardian's Cup article photo |

## Monday.com Form Links
- Player Registration: https://wkf.ms/4fDnOqL
- Uniform Order: https://wkf.ms/43cPPyl
- Complaint Form: https://wkf.ms/4nMZ7KM
- Expense Request: https://wkf.ms/4x2zl9E

## Tech Stack
- React 18 + Vite
- Hosted on Cloudflare Pages
- Images self-hosted (no Crossbar dependency)
- Monday.com forms for data collection
