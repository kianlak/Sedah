import type { AppSettings } from "../interfaces/appSettings";
import { defaultAppSettings } from "../config/defaultAppSettings";
import { createSettingsRepository } from "../storage/createSettingsRepository";
import { resolveTheme } from "../../themes/logic/themeRegistry";

const settingsRepository = createSettingsRepository();

export function resolveInitialSettings(): AppSettings {
  const persistedSettings = settingsRepository.load();
  const mergedSettings = {
    ...defaultAppSettings,
    ...persistedSettings
  };
  const activeTheme = resolveTheme(mergedSettings.themeId);
  const resolvedSettings = {
    ...mergedSettings,
    themeId: activeTheme.id
  };

  settingsRepository.save(resolvedSettings);
  return resolvedSettings;
}
