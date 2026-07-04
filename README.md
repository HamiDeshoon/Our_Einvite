# React + TypeScript + Vite

This project is a wedding e‑invite built with React, TypeScript, and Vite. It showcases a modern, accessible design with custom typography, improved colour contrast, subtle animations, a responsive video section, a styled location area, and a live countdown timer.

## Features

- **Distinct typography** – `Great Vibes` (display) paired with `Cormorant Garamond` (serif) and `Source Sans 3` (sans‑serif).
- **Accessible colour palette** – darker taupe (`#5A4632`) for better contrast against the cream background.
- **Fade‑in animations** – applied to major sections (`Hero`, `VideoUpload`, `LocationSection`, `CountdownTimer`, etc.) for a polished entrance.
- **Responsive video upload** – users can upload a local video file or provide a YouTube link (plain‑text file). The component automatically renders an `<iframe>` for YouTube URLs.
- **Styled location section** – includes an animated underline link to Google Maps and uses the `font-display` class for a decorative heading.
- **Live countdown timer** – announces remaining time with `aria-live="polite"` for screen‑reader users.
- **RSVP form** – connected to a Google Sheets backend via Google Apps Script (see setup below).

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build

```bash
# Create a production build
npm run build
```

The output is placed in the `dist/` folder.

## Deployment (GitHub Pages)

The repository is configured to automatically build and deploy to GitHub Pages on every push to `main`.

1. Ensure GitHub Pages is enabled:
   - Go to **Settings → Pages**
   - Source: **GitHub Actions**
2. The workflow `.github/workflows/deploy.yml` will:
   - Checkout the code
   - Install Node.js 20
   - Install dependencies (`npm ci`)
   - Build the app (`npm run build`)
   - Upload the `dist/` folder as an artifact
   - Deploy to the `gh-pages` branch using `actions/deploy-pages`
3. A `public/.nojekyll` file is included to skip Jekyll processing (required for Vite's `_assets` folder).

### Secrets

The RSVP endpoint URL must be provided as a secret:

- **Name:** `VITE_GOOGLE_SHEET_URL`
- **Value:** The Web App URL from your Google Apps Script deployment (ends with `/exec`)

Add it via **Settings → Secrets and variables → Actions → New repository secret**.

Local development: copy `.env.example` to `.env` and fill in the value.

## RSVP Setup (Google Sheets)

1. **Create a Google Sheet** with the following headers in row 1:
   ```
   Timestamp | Name | Email | Phone | Guests | Attending | Message
   ```
2. Open **Extensions → Apps Script**.
3. Paste the contents of `apps-script.gs` (replace `YOUR_SHEET_ID_HERE` with your sheet's ID, found in the URL).
4. Deploy → **New deployment**:
   - Select type **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (or **Anyone with Google account** if you prefer)
   - Copy the deployed URL (ends with `/exec`).
5. Set the secret `VITE_GOOGLE_SHEET_URL` to that URL (or add to `.env` for local).
6. (Optional) Set up an email notification by uncommenting the `MailApp.sendEmail` line in the script.

The form will now submit to the sheet; each response appears as a new row with a timestamp.

## Usage

- **Video section** – click "Upload Video / Provide YouTube Link". Choose a video file or a plain‑text file containing a YouTube URL. The video will display inline; YouTube links are embedded via an `<iframe>`.
- **Location section** – displays the venue address with a clickable link that opens Google Maps in a new tab.
- **Countdown timer** – automatically counts down to the ceremony date (`2026‑08‑13T18:00:00`).
- **RSVP form** – fill in your details, optionally leave a message, and submit. A honeypot field blocks bots. On success you’ll see a thank‑you message; on error a retry prompt appears.

## Changelog

- **2026‑06‑29** – Added `font-display` (Great Vibes), updated colour palette (`--color-taupe`), introduced fade‑in animations, enhanced `VideoUpload` for YouTube embeds, refined `LocationSection` styling, added `aria-live` to `CountdownTimer`, and updated README with usage instructions and changelog.
- **2026‑07‑04** – Added RSVP Google Sheets backend, GitHub Actions deployment workflow, environment‑variable setup, and updated documentation.