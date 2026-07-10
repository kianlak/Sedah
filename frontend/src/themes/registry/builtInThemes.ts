import { midnightTheme } from "../presets/midnightTheme";

export const builtInThemes = [midnightTheme];
export const defaultTheme = midnightTheme;
export const themeById = new Map(builtInThemes.map((theme) => [theme.id, theme]));
