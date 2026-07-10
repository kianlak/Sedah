#[derive(Debug)]
pub struct AppState {
    app_name: &'static str,
    playback_ready: bool,
    platform_name: &'static str,
}

impl AppState {
    pub fn new(platform_name: &'static str) -> Self {
        Self {
            app_name: "Sedah",
            playback_ready: false,
            platform_name,
        }
    }

    pub fn app_name(&self) -> &'static str {
        self.app_name
    }

    pub fn playback_ready(&self) -> bool {
        self.playback_ready
    }

    pub fn platform_name(&self) -> &'static str {
        self.platform_name
    }
}
