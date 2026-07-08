# TutorJulian · InvoiceForge

Single-page invoice generator for TutorJulian gigs. Paste lesson dates/times
copied from Google Calendar, set a rate, get a print-ready client invoice
with a PayNow QR and auto-generated payment reference.

The whole app is `public/index.html` — no build step, no framework.
`server.js` is a thin Express wrapper that just serves that file, so
Zeabur's Node buildpack has a clean, unambiguous entrypoint.

## Stack

- Static HTML/CSS/JS (`public/index.html`)
- Express static server (`server.js`) — Node ≥18
- No database. Settings, PayNow QR, and invoice sequence numbers persist in
  the browser's `localStorage`, scoped to whatever domain this ends up on.
  That means data does **not** sync across devices/browsers yet.

## Local dev

```
npm install
npm start
```
Serves on `http://localhost:8080` (or `$PORT` if set).

## Deploy — GitHub → Zeabur

Same flow as the rest of the fleet:

1. Push this repo to GitHub, work in `feature/*` branches, merge to `dev`
   for staging, then `main` for production.
2. In Zeabur: **New Service → Deploy from GitHub → select this repo**.
   Zeabur auto-detects Node from `package.json` and runs `npm install && npm start`.
3. Point a Zeabur domain (or your Cloudflare CNAME, same pattern as
   `juliancheung.com`) at the service.
4. No environment variables are required. `PORT` is injected by Zeabur automatically.

`.github/workflows/ci.yml` boots the server and hits `/healthz` on every
push to `feature`/`dev`/`main` and on PRs into `dev`/`main` — catches a
broken commit before Zeabur's own deploy webhook picks it up.

## Roadmap (deferred from MVP)

- Auto-pull lessons from Google Calendar (currently manual paste-and-parse)
- Invoice history / per-client saved profiles
- Cross-device sync for settings + PayNow QR (currently per-browser `localStorage`)
