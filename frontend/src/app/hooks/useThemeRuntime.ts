import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { resolveTheme } from "../../themes/logic/themeRegistry";
import { applyTheme } from "../../themes/logic/themeRuntime";

export function useThemeRuntime(): void {
  const themeId = useAppSelector((state) => state.settings.themeId);

  useEffect(() => {
    const theme = resolveTheme(themeId);
    applyTheme(theme);
  }, [themeId]);
}
