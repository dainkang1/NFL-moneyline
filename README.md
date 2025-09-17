NFL Moneyline — Football Odds (React + Express)

Overview
- React client displays weekly football lines: Moneyline, Spreads, and Totals per sportsbook.
- Express proxy server calls The Odds API so your API key stays server-side.

Requirements
- Node.js 18+ and npm 8+
- A free The Odds API key: https://the-odds-api.com/

Fast Start
- One-time: `make setup` (copies `server/.env` and installs deps)
- Run dev: `make dev` (server on 5050, Vite on 5173)
- Without Make: `bash scripts/setup.sh` then `bash scripts/dev.sh`

Quick Start (manual)
1) Configure server environment
   - `cp server/.env.example server/.env`
   - Edit `server/.env` and set `ODDS_API_KEY=your_key_here`
   - Optional: tweak `SPORT`, `BOOKMAKERS`, `PORT` (see Config below)

2) Install dependencies
   - Server: `cd server && npm install`
   - Client: in another terminal, `cd client && npm install`

3) Run in development
   - Server: from `server/` → `npm run dev` (http://localhost:5050)
   - Client: from `client/` → `npm run dev` (http://localhost:5173)
   - The client dev server proxies `/api/*` to the Express server.

4) Verify
   - Health: `curl http://localhost:5050/api/health` → `{ ok: true, sport: ... }`
   - Visit the client URL; games should list with book lines.
   - No API key? Toggle “Use mock data” in the UI to preview.

Project Structure
- `server/`: Node/Express API proxy to The Odds API
- `client/`: React + Vite UI for browsing games and odds
- `scripts/`: helper scripts for setup and concurrent dev
- `Makefile`: convenience targets mirroring scripts

Config (`server/.env`)
- `ODDS_API_KEY`: your key from The Odds API (required)
- `SPORT`: default `americanfootball_nfl` (or `americanfootball_ncaaf`)
- `BOOKMAKERS`: optional comma-separated ids (e.g., `draftkings,fanduel,betmgm`)
- `PORT`: Express port (default `5050`)

Using the App
- Filters: Date (YYYY-MM-DD), Region (US/EU/UK/AU), and Team to narrow games.
- Mock Data: enable the “Use mock data” toggle for offline/demo data (`client/src/mock/odds-sample.json`).
- Bookmakers: each row lists sportsbook prices for Moneyline, Spread, and Totals for both teams.

API (via proxy)
- `GET /api/odds?date=YYYY-MM-DD&regions=us`
  - Markets: `h2h` (moneyline), `spreads`, `totals`
  - Odds format: `american`
  - Respects `BOOKMAKERS` filter from `server/.env`

Scripts
- Server: `npm run dev` (hot reload), `npm start` (prod)
- Client: `npm run dev`, `npm run build`, `npm run preview`
- Make: `make setup`, `make dev`, `make server`, `make client`, `make build`

Build & Deploy
- Client build: `cd client && npm run build` → outputs `client/dist/`.
- Server prod: `cd server && npm start` (ensure `server/.env` is configured on the host).
- Typical deployment: host API (server) on a Node host (Render/Heroku/Fly) and serve `client/dist` on a static host (Netlify/Vercel/S3+CDN). Configure the client to point to your API base URL or keep a reverse proxy.

Troubleshooting
- Missing `ODDS_API_KEY`: set it in `server/.env` and restart the server.
- 401/403 from upstream: verify your key, plan limits, and remaining quota on The Odds API dashboard.
- No games listed: adjust the Date filter and confirm the selected sport has scheduled games.
- Port in use: change `PORT` in `server/.env` and/or Vite dev port in `client/vite.config.js`.
- CORS: the client only calls `/api`; the server talks to The Odds API.

Notes
- `/.env` files are git-ignored; keep your API key private.
- `.nvmrc` pins a Node version; optionally run `nvm use` if you have nvm.
