#[cfg(target_os = "linux")]
mod linux;
#[cfg(target_os = "macos")]
mod macos;
#[cfg(target_os = "windows")]
mod windows;

#[derive(Debug, Clone, Copy)]
pub struct PlatformContext {
    pub platform_name: &'static str,
}

impl PlatformContext {
    pub const fn new(platform_name: &'static str) -> Self {
        Self { platform_name }
    }
}

pub fn current_platform_context() -> PlatformContext {
    platform_context()
}

#[cfg(target_os = "windows")]
use windows::platform_context;

#[cfg(target_os = "macos")]
use macos::platform_context;

#[cfg(target_os = "linux")]
use linux::platform_context;
