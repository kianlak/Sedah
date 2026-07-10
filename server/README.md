# Server

This folder is for remotely deployed service code.

Examples:

- authorization and identity services
- account and profile APIs
- catalog and metadata services
- recommendation and search services
- background workers and async processing

The desktop host should call into these services through explicit clients instead of embedding that behavior into the Tauri shell.
