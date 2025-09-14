#!/usr/bin/env bash
set -euo pipefail

# Simple local setup for NFL-moneyline (server + client)
# - Ensures Node/npm versions
# - Copies server/.env from example if missing and optionally injects API key
# - Installs dependencies in server and client

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[setup] NFL-moneyline setup starting..."

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "Error: '$1' is required" >&2; exit 1; }
}

need_cmd node
need_cmd npm

# Check Node and npm versions (soft check with warnings)
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]") || NODE_MAJOR=0
NPM_MAJOR=$(npm -v | cut -d. -f1) || NPM_MAJOR=0

if [ "${NODE_MAJOR}" -lt 18 ]; then
  echo "[setup] Warning: Node 18+ recommended. Detected $(node -v)."
fi
if [ "${NPM_MAJOR}" -lt 8 ]; then
  echo "[setup] Warning: npm 8+ recommended. Detected $(npm -v)."
fi

# Ensure server/.env exists
if [ ! -f server/.env ]; then
  if [ -f server/.env.example ]; then
    cp server/.env.example server/.env
    echo "[setup] Created server/.env from server/.env.example"
  else
    echo "[setup] Warning: server/.env.example not found; creating empty server/.env"
    touch server/.env
  fi
fi

# Optionally set ODDS_API_KEY interactively if empty
if ! grep -q '^ODDS_API_KEY=' server/.env || grep -q '^ODDS_API_KEY=\s*$' server/.env; then
  echo ""
  echo "[setup] You can enter your The Odds API key now (optional)."
  echo -n "Enter ODDS_API_KEY (leave blank to skip): "
  read -r APIKEY || true
  if [ -n "${APIKEY:-}" ]; then
    # Replace or add the key
    if grep -q '^ODDS_API_KEY=' server/.env; then
      sed -i.bak "s/^ODDS_API_KEY=.*/ODDS_API_KEY=${APIKEY//\//\\/}/" server/.env && rm -f server/.env.bak
    else
      printf "\nODDS_API_KEY=%s\n" "$APIKEY" >> server/.env
    fi
    echo "[setup] Wrote ODDS_API_KEY to server/.env"
  else
    echo "[setup] Skipping ODDS_API_KEY; you can edit server/.env later."
  fi
fi

echo "[setup] Installing server dependencies..."
(cd server && npm install)

echo "[setup] Installing client dependencies..."
(cd client && npm install)

echo "[setup] Done. Try: ./scripts/dev.sh (or: make dev)"

