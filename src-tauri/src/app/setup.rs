use tauri::AppHandle;

use crate::window;

pub fn configure_app(app: &AppHandle) -> tauri::Result<()> {
    // This is the right place for future subsystem bootstrapping such as
    // playback initialization, configuration loading, and logging setup.
    window::configure_main_window(app)?;
    Ok(())
}
