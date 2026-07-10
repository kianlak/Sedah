use tauri::window::Color;

/// Default native window color shown before or beneath webview content.
///
/// This stays aligned with the shell's startup theme so native resize/maximize
/// repaints do not flash a light seam around the app surface.
pub const DEFAULT_WINDOW_BACKGROUND: Color = Color(9, 11, 16, 255);
