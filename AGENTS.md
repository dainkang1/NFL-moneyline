# Repository Guidelines

## Project Structure & Module Organization
- `client/`: React (Vite) app. Key folders: `src/components/`, `src/services/`, `src/data/`, `src/assets/`.
- `server/`: Express proxy for The Odds API (`index.js`). Reads `.env`.
- `scripts/`: Local helpers (`setup.sh`, `dev.sh`).
- `Makefile`: Common tasks; see commands below.

## Build, Test, and Development Commands
- `make setup`: One‑time setup; installs client/server deps and prepares `server/.env`.
- `make dev` or `./scripts/dev.sh`: Run server (on `:5050`) and Vite client concurrently.
- `make server`: Run server in watch mode (`nodemon`).
- `make client`: Run Vite dev server.
- `make build`: Build client for production (`client/dist`).
- `cd client && npm run preview`: Preview built client locally.

## Coding Style & Naming Conventions
- JavaScript/ESM: use `import`/`export`, 2‑space indent, semicolons, single quotes or consistent style.
- React: Components in `PascalCase` (`GameOdds.jsx`, `TeamLabel.jsx`); hooks at top of components; derived data via `useMemo` when helpful.
- Files: component files `PascalCase.jsx`; utilities/services `camelCase.js`.
- Env/config: add keys to `server/.env` (never commit secrets).

## Testing Guidelines
- No test suite yet. Recommended setup:
  - Client: Vitest + React Testing Library (`*.test.jsx` in `client/src/`).
  - Server: Vitest or Jest + Supertest (`*.test.js` in `server/`).
- Example (future): `cd client && npm test` or `cd server && npm test` once configured.

## Commit & Pull Request Guidelines
- Commits: imperative, concise; optionally prefix with type (e.g., `feat:`, `fix:`, `docs:`). Example: `feat: add team filter to odds view`.
- Pull Requests:
  - Include summary, rationale, and testing steps.
  - Link related issues; attach screenshots/GIFs for UI changes.
  - Keep changes scoped; update `README.md` if behavior or setup changes.

## Security & Configuration Tips
- Required: `server/.env` with `ODDS_API_KEY` (The Odds API). Optional: `PORT`, `SPORT`, `BOOKMAKERS`.
- Do not commit `.env`. Verify CORS needs in `server/index.js`.
- Node 18+ recommended. If API key is absent, `/api/odds` returns 500 (health at `/api/health`).

