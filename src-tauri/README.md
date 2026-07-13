# src-tauri

This folder contains the desktop runtime for Sedah.

It owns:

- Tauri configuration
- native window behavior
- desktop packaging
- Rust commands exposed to the frontend

It should stay thin. Business logic that is not directly about desktop runtime concerns should move into `../backend` or into shared crates later.

Current internal boundaries:

- `app/`
  runtime bootstrap and Tauri builder composition
- `commands/`
  IPC commands exposed to the frontend
- `platform/`
  OS-specific runtime differences when they actually exist, split into `windows/`, `macos/`, and `linux/`
- `services/`
  native runtime service layer behind Tauri commands
- `state/`
  desktop runtime state
- `theme/`
  native window appearance details
- `window/`
  native window configuration and shell-level window behavior

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the long-term crate structure and boundary rules.
