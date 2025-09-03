New Tests — Football Odds (React + Express)

Overview
- React client shows weekly football lines: moneyline, spread, and totals (Over/Under).
- Express proxy server calls The Odds API to avoid exposing your API key in the browser.

Project Structure
- server: Node/Express proxy that fetches odds from The Odds API
- client: React + Vite app to display matchups and odds per bookmaker

Setup
- Get API key: create a free key at https://the-odds-api.com/
- Configure env: copy `.env.example` to `.env` and set `ODDS_API_KEY`.
- Run server:
  - `cd server && npm install && npm run dev`
- Run client (new terminal):
  - `cd client && npm install && npm run dev`

By default, the client expects the proxy at http://localhost:5050 and calls `/api/odds`.

Notes
- The proxy defaults to NFL (`americanfootball_nfl`). You can switch to NCAAF by setting `SPORT=americanfootball_ncaaf` in `.env`.
- The client includes a small mock sample to render a UI even if the API is unavailable. Toggle it via the UI.
- UI filters: date, region (US/EU/UK/AU), and team (shows games involving the selected team).

Environment Variables
- `ODDS_API_KEY`: required, from The Odds API
- `SPORT`: `americanfootball_nfl` (default) or `americanfootball_ncaaf`
- `BOOKMAKERS`: optional, comma-separated ids to filter books (e.g., `draftkings,fanduel,betmgm`)
- `PORT`: proxy server port (default 5050)

Scripts
- Server: `npm run dev` (nodemon), `npm start` (node)
- Client: `npm run dev` (Vite), `npm run build`, `npm run preview`

API Details (Proxy)
- `GET /api/odds?date=YYYY-MM-DD&regions=us`
  - Proxies to The Odds API with markets: `h2h,spreads,totals` and odds format `american`.
  - If `BOOKMAKERS` is set in `.env`, the proxy limits results to those books.
