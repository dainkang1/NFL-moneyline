SHELL := /bin/bash

.PHONY: setup install dev server client build clean

setup:
	@bash scripts/setup.sh

install:
	@echo "Installing server deps" && (cd server && npm install)
	@echo "Installing client deps" && (cd client && npm install)

dev:
	@bash scripts/dev.sh

server:
	@cd server && npm run dev

client:
	@cd client && npm run dev

build:
	@cd client && npm run build

clean:
	@rm -rf client/node_modules server/node_modules client/dist || true

