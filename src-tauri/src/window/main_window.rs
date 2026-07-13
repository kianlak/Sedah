use tauri::{AppHandle, Manager};

use crate::theme::native_window::DEFAULT_WINDOW_BACKGROUND;

pub const MAIN_WINDOW_LABEL: &str = "main";

pub fn configure_main_window(app: &AppHandle) -> tauri::Result<()> {
    if let Some(main_window) = app.get_webview_window(MAIN_WINDOW_LABEL) {
        // Normalize the initial spawn position so Windows does not maximize an
        // undecorated window from an edge-adjacent origin.
        main_window.center()?;

        // Match the native window/webview fallback color to the shell so
        // maximize and resize repaints do not expose a bright edge.
        main_window.set_background_color(Some(DEFAULT_WINDOW_BACKGROUND))?;
    }

    Ok(())
}
