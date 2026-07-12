# Server

This folder is for the gateway and remotely deployed service code.

Examples:

- API gateway and edge routing
- authorization and identity services
- account and profile APIs
- catalog and metadata services
- recommendation and search services
- background workers and async processing

Suggested structure:

- `gateway/` for the API gateway boundary
- `services/auth/` for authentication and identity
- `services/...` for other domain services

The desktop host should call into these services through explicit gateway clients instead of embedding that behavior into the Tauri shell.
