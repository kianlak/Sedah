# src-tauri

This folder contains the desktop runtime for Sedah.

It owns:

- Tauri configuration
- native window behavior
- desktop packaging
- Rust commands exposed to the frontend

It should stay thin. Business logic that is not directly about desktop runtime concerns should move into `../backend` or into shared crates later.
