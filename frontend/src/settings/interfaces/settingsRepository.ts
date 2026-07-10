import type { AppSettings } from "./appSettings";

export interface SettingsRepository {
  load(): AppSettings | null;
  save(settings: AppSettings): void;
}
