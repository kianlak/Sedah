use serde::Serialize;
use tauri::State;

use crate::state::AppState;

/// Frontend-facing snapshot of backend runtime readiness.
#[derive(Debug, Clone, Serialize)]
pub struct RuntimeStatus {
    pub app_name: &'static str,
    pub playback_ready: bool,
    pub platform_name: &'static str,
}

impl From<&AppState> for RuntimeStatus {
    fn from(state: &AppState) -> Self {
        Self {
            app_name: state.app_name(),
            playback_ready: state.playback_ready(),
            platform_name: state.platform_name(),
        }
    }
}

#[tauri::command]
pub fn get_runtime_status(state: State<'_, AppState>) -> RuntimeStatus {
    RuntimeStatus::from(&*state)
}
