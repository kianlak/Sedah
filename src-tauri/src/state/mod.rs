mod app_state;

pub use app_state::AppState;

pub fn build_app_state(platform_name: &'static str) -> AppState {
    AppState::new(platform_name)
}
