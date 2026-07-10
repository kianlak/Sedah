import type { SettingsRepository } from "../interfaces/settingsRepository";
import { BrowserSettingsRepository } from "./browserSettingsRepository";

export function createSettingsRepository(): SettingsRepository {
  return new BrowserSettingsRepository();
}
