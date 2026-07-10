import type { LandingEntryMode } from "../../../../interfaces/landing";

export interface LandingModeSwitchProps {
  activeMode: LandingEntryMode;
  onModeChange: (mode: LandingEntryMode) => void;
}
