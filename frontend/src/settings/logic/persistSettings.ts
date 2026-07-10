import type { AppSettings } from "../interfaces/appSettings";
import { createSettingsRepository } from "../storage/createSettingsRepository";

const settingsRepository = createSettingsRepository();

export function persistSettings(settings: AppSettings): void {
  settingsRepository.save(settings);
}
