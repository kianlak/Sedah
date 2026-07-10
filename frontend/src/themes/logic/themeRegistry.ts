import type { ThemeDefinition } from "../interfaces/theme";
import { defaultTheme, themeById } from "../registry/builtInThemes";

export function resolveTheme(themeId?: string): ThemeDefinition {
  if (!themeId) {
    return defaultTheme;
  }

  return themeById.get(themeId) ?? defaultTheme;
}
