import type { ReactElement } from "react";
import { AppRouteRenderer } from "./routes/AppRouteRenderer";
import { useThemeRuntime } from "./hooks/useThemeRuntime";
import { ShellPage } from "../pages/shell/ui/ShellPage";

export function App(): ReactElement {
  useThemeRuntime();

  return (
    <main className="app-root">
      <ShellPage>
        <AppRouteRenderer />
      </ShellPage>
    </main>
  );
}
