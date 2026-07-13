use crate::commands::runtime_status::RuntimeStatus;
use crate::state::AppState;

pub struct RuntimeStatusService;

impl RuntimeStatusService {
    pub const fn new() -> Self {
        Self
    }

    pub fn get_status(&self, state: &AppState) -> RuntimeStatus {
        RuntimeStatus {
            app_name: state.app_name(),
            playback_ready: state.playback_ready(),
            platform_name: state.platform_name(),
        }
    }
}
