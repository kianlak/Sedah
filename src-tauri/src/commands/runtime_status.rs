use serde::Serialize;
use tauri::State;

use crate::services::runtime::RuntimeStatusService;
use crate::state::AppState;

/// Frontend-facing snapshot of desktop runtime readiness.
#[derive(Debug, Clone, Serialize)]
pub struct RuntimeStatus {
    pub app_name: &'static str,
    pub playback_ready: bool,
    pub platform_name: &'static str,
}

#[tauri::command]
pub fn get_runtime_status(state: State<'_, AppState>) -> RuntimeStatus {
    RuntimeStatusService::new().get_status(&state)
}
