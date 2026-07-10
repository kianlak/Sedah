export interface ThemeAssetSet {
  windowControls: {
    minimize: string;
    maximize: string;
    close: string;
  };
}

export interface ThemeTokenSet {
  colorSurfacePrimary: string;
  colorSurfaceSecondary: string;
  colorTextPrimary: string;
  colorTextSecondary: string;
  surfaceOverlayBackground: string;
  surfaceOverlayBorder: string;
  surfaceOverlayBlur: string;
  surfaceInteractiveHover: string;
  shadowSurfaceSoft: string;
  colorDangerSurface: string;
  colorDangerText: string;
  shellBackgroundGradient: string;
  ambientFieldDotColor: string;
  ambientFieldOpacity: string;
  fontFamilyUi: string;
}

export interface ThemeDefinition {
  id: string;
  label: string;
  tokens: ThemeTokenSet;
  assets: ThemeAssetSet;
}
