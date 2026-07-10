import type { ThemeDefinition, ThemeTokenSet } from "../interfaces/theme";

const THEME_ATTRIBUTE = "data-theme";

const tokenVariableMap: Record<keyof ThemeTokenSet, string> = {
  colorSurfacePrimary: "--color-surface-primary",
  colorSurfaceSecondary: "--color-surface-secondary",
  colorTextPrimary: "--color-text-primary",
  colorTextSecondary: "--color-text-secondary",
  surfaceOverlayBackground: "--surface-overlay-bg",
  surfaceOverlayBorder: "--surface-overlay-border",
  surfaceOverlayBlur: "--surface-overlay-blur",
  surfaceInteractiveHover: "--surface-interactive-hover",
  shadowSurfaceSoft: "--shadow-surface-soft",
  colorDangerSurface: "--color-danger-surface",
  colorDangerText: "--color-danger-text",
  shellBackgroundGradient: "--shell-background-gradient",
  ambientFieldDotColor: "--ambient-field-dot-color",
  ambientFieldOpacity: "--ambient-field-opacity",
  fontFamilyUi: "--font-family-ui"
};

export function applyTheme(theme: ThemeDefinition, root: HTMLElement = document.documentElement): void {
  root.setAttribute(THEME_ATTRIBUTE, theme.id);

  for (const [tokenName, cssVariable] of Object.entries(tokenVariableMap) as Array<
    [keyof ThemeTokenSet, string]
  >) {
    root.style.setProperty(cssVariable, theme.tokens[tokenName]);
  }
}
