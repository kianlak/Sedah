import type { ReactElement } from "react";
import "../css/title-bar.css";
import { useAppSelector } from "../../../app/store/hooks";
import { resolveTheme } from "../../../themes/logic/themeRegistry";
import { suppressTitleBarContextMenu } from "../logic/titleBarActions";
import { useTitleBarActions } from "../hooks/useTitleBarActions";
import type { TitleBarControlButtonProps } from "./interfaces/titleBarControlButtonProps";

export function TitleBar(): ReactElement {
  const themeId = useAppSelector((state) => state.settings.themeId);
  const { windowControls } = resolveTheme(themeId).assets;
  const { handleAction, isBusy } = useTitleBarActions();

  return (
    <header
      className="title-bar"
      aria-label="Application title bar"
      data-tauri-drag-region=""
      onContextMenu={suppressTitleBarContextMenu}
    >
      <div
        className="title-bar__brand"
        data-tauri-drag-region=""
      >
        Sedah
      </div>

      <div
        className="title-bar__spacer"
        data-tauri-drag-region=""
      />

      <nav
        className="title-bar__controls"
        aria-label="Window controls"
      >
        <TitleBarControlButton
          action="minimize"
          className="title-bar__control--minimize"
          iconSource={windowControls.minimize}
          isBusy={isBusy}
          label="Minimize window"
          onAction={handleAction}
        />
        <TitleBarControlButton
          action="toggle-maximize"
          className="title-bar__control--maximize"
          iconSource={windowControls.maximize}
          isBusy={isBusy}
          label="Maximize or restore window"
          onAction={handleAction}
        />
        <TitleBarControlButton
          action="close"
          className="title-bar__control--close"
          iconSource={windowControls.close}
          isBusy={isBusy}
          label="Close window"
          onAction={handleAction}
        />
      </nav>
    </header>
  );
}

function TitleBarControlButton({
  action,
  className,
  iconSource,
  isBusy,
  label,
  onAction
}: TitleBarControlButtonProps): ReactElement {
  return (
    <button
      aria-label={label}
      className={`title-bar__control ${className}`}
      data-tauri-drag-region="false"
      disabled={isBusy}
      onClick={() => {
        onAction(action);
      }}
      type="button"
    >
      <img
        alt=""
        aria-hidden="true"
        className="title-bar__control-icon"
        src={iconSource}
      />
    </button>
  );
}
