use tauri::Manager;

use crate::commands;
use crate::platform;
use crate::state::AppState;
use crate::theme::native_window::DEFAULT_WINDOW_BACKGROUND;

pub fn run() {
    let platform_context = platform::current_platform_context();

    tauri::Builder::default()
        .manage(AppState::new(platform_context.platform_name))
        .invoke_handler(tauri::generate_handler![
            commands::runtime::get_runtime_status
        ])
        .setup(|app| {
            // This is the right place for future subsystem bootstrapping such as
            // playback initialization, configuration loading, and logging setup.
            if let Some(main_window) = app.get_webview_window("main") {
                // Normalize the initial spawn position so Windows does not
                // maximize an undecorated window from an edge-adjacent origin.
                main_window.center()?;

                // Match the native window/webview fallback color to the shell so
                // Windows maximize/resize seams do not expose a white edge.
                main_window.set_background_color(Some(DEFAULT_WINDOW_BACKGROUND))?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("failed to run Sedah application");
}
