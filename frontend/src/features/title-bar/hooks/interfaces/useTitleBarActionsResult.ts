import type { TitleBarAction } from "../../interfaces/titleBar";

export interface UseTitleBarActionsResult {
  isBusy: boolean;
  handleAction: (action: TitleBarAction) => void;
}
