#!/usr/bin/env bash
set -euo pipefail

# Run server and client concurrently with cleanup on exit

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "Error: '$1' is required" >&2; exit 1; }
}

need_cmd npm

PIDS=()
cleanup() {
  echo "\n[dev] Shutting down..."
  for pid in "${PIDS[@]:-}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
    fi
  done
  wait || true
}
trap cleanup EXIT INT TERM

echo "[dev] Starting server (http://localhost:5050)..."
(cd server && npm run dev) &
PIDS+=($!)

sleep 1
echo "[dev] Starting client (Vite dev server)..."
(cd client && npm run dev) &
PIDS+=($!)

echo "[dev] Both processes running. Press Ctrl+C to stop."

wait

