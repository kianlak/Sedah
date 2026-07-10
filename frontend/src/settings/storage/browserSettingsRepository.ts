import type { AppSettings } from "../interfaces/appSettings";
import type { SettingsRepository } from "../interfaces/settingsRepository";

const SETTINGS_STORAGE_KEY = "sedah.app.settings";

export class BrowserSettingsRepository implements SettingsRepository {
  load(): AppSettings | null {
    const storage = getStorage();

    if (!storage) {
      return null;
    }

    const rawSettings = storage.getItem(SETTINGS_STORAGE_KEY);

    if (!rawSettings) {
      return null;
    }

    try {
      return JSON.parse(rawSettings) as AppSettings;
    } catch {
      storage.removeItem(SETTINGS_STORAGE_KEY);
      return null;
    }
  }

  save(settings: AppSettings): void {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}
