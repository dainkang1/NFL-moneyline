NFL Moneyline — Football Odds (React + Express)

Overview
- React client shows weekly football lines: Moneyline, Spread, and Totals (Over/Under) per sportsbook.
- Express proxy server calls The Odds API so your API key is never exposed in the browser.

Requirements
- Node.js 18+ and npm 8+
- A free The Odds API key: https://the-odds-api.com/

Quick Start
1) Configure server environment
   - `cp server/.env.example server/.env`
   - Edit `server/.env` and set `ODDS_API_KEY=your_key_here`
   - Optional: tweak `SPORT`, `BOOKMAKERS`, `PORT` (see Config below)

2) Install dependencies
   - Server: `cd server && npm install`
   - Client: open a new terminal, `cd client && npm install`

3) Run in development
   - Server: `npm run dev` (from `server/`) → http://localhost:5050
   - Client: `npm run dev` (from `client/`) → usually http://localhost:5173
   - The client dev server proxies `/api/*` to the Express server.

4) Verify
   - Health: `curl http://localhost:5050/api/health` → `{ ok: true, sport: ... }`
   - Visit the client URL, you should see games listed with book lines.
   - Toggle “Use mock data” if you don’t have an API key yet.

Project Structure
- `server/`: Node/Express API proxy to The Odds API
- `client/`: React + Vite UI for browsing games and odds

Config (server/.env)
- `ODDS_API_KEY` (required): your key from The Odds API
- `SPORT` (default `americanfootball_nfl`): or `americanfootball_ncaaf`
- `BOOKMAKERS` (optional): comma-separated ids to filter (e.g., `draftkings,fanduel,betmgm`)
- `PORT` (default `5050`): Express server port

Using the App
- Filters: choose Date (YYYY-MM-DD), Region (US/EU/UK/AU), and Team (home or away) to narrow games.
- Mock Data: enable the “Use mock data” toggle to preview the UI without network access.
- Bookmakers: rows list each sportsbook with Moneyline, Spread, and Totals (Over/Under) for both teams.

API (via proxy)
- `GET /api/odds?date=YYYY-MM-DD&regions=us`
  - Markets: `h2h` (moneyline), `spreads`, `totals`
  - Odds format: `american`
  - Honors `BOOKMAKERS` if set in `server/.env`

Scripts
- Server: `npm run dev` (hot reload), `npm start` (prod)
- Client: `npm run dev` (Vite dev), `npm run build`, `npm run preview`

Build & Deploy
- Client build: `cd client && npm run build` → outputs static files to `client/dist/`.
- Server prod: `cd server && npm start` (ensure `server/.env` is set on the host).
- Common deployment pattern: host the API (server/) on a Node host (e.g., Render/Heroku) and the client (dist) on a static host (e.g., Netlify/Vercel). Update the client to use your API base URL or keep a reverse proxy.

Troubleshooting
- 500 ODDS_API_KEY not configured: set `ODDS_API_KEY` in `server/.env` and restart the server.
- 401/403 from upstream: verify your Odds API key and plan limits. Check request quota on their dashboard.
- No games shown: confirm the Date filter and that the selected sport has scheduled games for that week.
- Port in use: change `PORT` in `server/.env` and/or Vite dev port in `client/vite.config.js`.
- CORS: handled by the proxy (`/api`), so the browser never calls The Odds API directly.
# NFL-moneyline
