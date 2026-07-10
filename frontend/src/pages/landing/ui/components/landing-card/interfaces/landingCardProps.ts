import type { LandingEntryMode } from "../../../../interfaces/landing";

export interface LandingCardProps {
  activeMode: LandingEntryMode;
  onModeChange: (mode: LandingEntryMode) => void;
}
