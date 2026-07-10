import { useState } from "react";
import type { TitleBarAction } from "../interfaces/titleBar";
import { runTitleBarAction } from "../logic/titleBarActions";
import type { UseTitleBarActionsResult } from "./interfaces/useTitleBarActionsResult";

export function useTitleBarActions(): UseTitleBarActionsResult {
  const [isBusy, setIsBusy] = useState(false);

  const handleAction = (action: TitleBarAction): void => {
    setIsBusy(true);
    void runTitleBarAction(action).finally(() => {
      setIsBusy(false);
    });
  };

  return {
    isBusy,
    handleAction
  };
}
