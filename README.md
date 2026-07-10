# Sedah

Sedah is a desktop-first music player that is being reshaped into a longer-term streaming platform. The repository is split by responsibility so the desktop shell, local processing, and remote services can evolve independently.

## Structure

- `frontend/`
  - React + Vite webview UI rendered inside the desktop app.
- `src-tauri/`
  - Tauri + Rust desktop runtime.
  - Owns windowing, native commands, packaging, and app bootstrap.
- `backend/`
  - Local processing code that runs on the user's machine but is not the Tauri shell itself.
  - Intended for playback orchestration, offline workflows, local media processing, caching, and other desktop-local application logic.
- `server/`
  - Rust microservices and other remotely deployed service code.
  - This is where authorization, account APIs, metadata APIs, and other network-backed services belong.
- `database/`
  - Database assets and migrations.
- `middleware/`
  - Shared request/response and cross-cutting middleware.

## Current State

- The desktop shell is runnable through Tauri.
- The landing page and shell UI were carried over from the previous prototype.
- Auth and service flows are intentionally not wired yet.

## Commands

```bash
npm run dev:web
npm run build:web
npm run typecheck:web
npm run dev:tauri
npm run tauri:build
npm run check:rust
```
