import closeIcon from "../../assets/themes/midnight/icons/window/close.svg";
import maximizeIcon from "../../assets/themes/midnight/icons/window/maximize.svg";
import minimizeIcon from "../../assets/themes/midnight/icons/window/minimize.svg";
import type { ThemeDefinition } from "../interfaces/theme";

export const midnightTheme: ThemeDefinition = {
  id: "midnight",
  label: "Midnight",
  tokens: {
    colorSurfacePrimary: "#000000",
    colorSurfaceSecondary: "#090b10",
    colorTextPrimary: "#f5f5f5",
    colorTextSecondary: "rgba(245, 245, 245, 0.72)",
    surfaceOverlayBackground: "rgba(14, 17, 24, 0.54)",
    surfaceOverlayBorder: "rgba(255, 255, 255, 0.08)",
    surfaceOverlayBlur: "24px",
    surfaceInteractiveHover: "rgba(255, 255, 255, 0.08)",
    shadowSurfaceSoft: "0 10px 30px rgba(0, 0, 0, 0.22)",
    colorDangerSurface: "rgba(225, 55, 55, 0.92)",
    colorDangerText: "#ffffff",
    shellBackgroundGradient: "linear-gradient(160deg, #090b10, #000000 70%)",
    ambientFieldDotColor: "rgba(255, 255, 255, 0.92)",
    ambientFieldOpacity: "0.42",
    fontFamilyUi: "\"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif"
  },
  assets: {
    windowControls: {
      minimize: minimizeIcon,
      maximize: maximizeIcon,
      close: closeIcon
    }
  }
};
