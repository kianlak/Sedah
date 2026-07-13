use super::setup;
use crate::commands;
use crate::platform;
use crate::state;

pub fn run() {
    let platform_context = platform::current_platform_context();

    let builder =
        tauri::Builder::default().manage(state::build_app_state(platform_context.platform_name));

    commands::register(builder)
        .setup(|app| {
            setup::configure_app(app.handle())?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("failed to run Sedah application");
}
