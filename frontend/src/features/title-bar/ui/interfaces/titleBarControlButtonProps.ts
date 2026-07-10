import type { TitleBarAction } from "../../interfaces/titleBar";

export interface TitleBarControlButtonProps {
  action: TitleBarAction;
  className: string;
  iconSource: string;
  isBusy: boolean;
  label: string;
  onAction: (action: TitleBarAction) => void;
}
