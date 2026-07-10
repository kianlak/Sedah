import { getCurrentWindow } from "@tauri-apps/api/window";
import type { TitleBarAction } from "../interfaces/titleBar";
import type { PreventableEvent } from "./interfaces/preventableEvent";

const titleBarWindow = getCurrentWindow();

export function suppressTitleBarContextMenu(event: PreventableEvent): void {
  event.preventDefault();
}

export async function runTitleBarAction(action: TitleBarAction): Promise<void> {
  switch (action) {
    case "minimize":
      await titleBarWindow.minimize();
      return;
    case "toggle-maximize":
      await titleBarWindow.toggleMaximize();
      return;
    case "close":
      await titleBarWindow.close();
      return;
  }
}
