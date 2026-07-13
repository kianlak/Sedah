# src-tauri Architecture

This crate is Sedah's desktop runtime boundary.

It should stay focused on:

- Tauri application bootstrap
- window lifecycle and native window behavior
- IPC commands exposed to the frontend
- desktop-only integrations with the operating system
- runtime state needed by the desktop shell

It should not become the place for:

- backend microservice logic
- auth/business workflow orchestration
- general application domain logic that is not desktop-specific
- persistence/data access that belongs to `backend` or shared crates later

## Long-Term Structure

The target shape for this crate is:

```text
src-tauri/
  src/
    app/
      bootstrap.rs
      setup.rs
      mod.rs
    commands/
      runtime_status.rs
      window.rs
      playback.rs
      mod.rs
    platform/
      windows/
        mod.rs
      macos/
        mod.rs
      linux/
        mod.rs
      mod.rs
    services/
      runtime/
        runtime_status_service.rs
        mod.rs
      playback/
      library/
      settings/
      mod.rs
    state/
      app_state.rs
      playback_state.rs
      settings_state.rs
      mod.rs
    theme/
      native_window.rs
      mod.rs
    window/
      main_window.rs
      mod.rs
    lib.rs
    main.rs
```

Not every module needs to exist immediately. The important part is that new native functionality lands in the right boundary as it appears.

## Runtime Rules

1. `app/bootstrap.rs` should compose the runtime, not own every behavior directly.
2. `app/setup.rs` should own application setup concerns that do not belong inline in bootstrap.
3. `commands/` should stay as thin IPC adapters between the frontend and Rust services/state.
4. `window/` should own native window configuration, labels, and shell-level behavior.
5. `platform/` should only exist for real OS-specific divergence.
6. `services/` should hold native runtime services such as playback, media scanning, local settings, and filesystem access.
7. `state/` should contain runtime-owned state only, not arbitrary business data.
8. If logic is not desktop-specific, it should not default into `src-tauri`.

When a platform-specific area grows beyond a trivial constant or helper, it should live under its own OS directory rather than staying as a single flat file.

## Sedah Direction

For Sedah specifically:

- `src-tauri` should own desktop shell concerns
- `backend` should own local processing concerns
- `server` should own network-facing service concerns later
- `frontend` should talk to Tauri through narrow IPC commands, not broad native access

This keeps the desktop shell professional, testable, and replaceable as the product grows.
