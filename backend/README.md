# Backend

This folder is reserved for local application processing that runs on the user's machine but is not the Tauri desktop host itself.

Examples of code that belongs here:

- playback coordination
- local caching and indexing
- media analysis and transforms
- offline-first data preparation
- local adapters that the Tauri shell can call into

The desktop shell and packaging layer live in `../src-tauri`.
