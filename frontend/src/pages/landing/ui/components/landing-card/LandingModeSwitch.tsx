import type { ReactElement } from "react";
import type { LandingModeButtonProps } from "./interfaces/landingModeButtonProps";
import type { LandingModeSwitchProps } from "./interfaces/landingModeSwitchProps";

export function LandingModeSwitch({ activeMode, onModeChange }: LandingModeSwitchProps): ReactElement {
  return (
    <div
      aria-label="Landing mode"
      className="landing-card__switch"
      role="tablist"
    >
      <LandingModeButton
        active={activeMode === "login"}
        label="Login"
        onClick={() => {
          onModeChange("login");
        }}
      />
      <LandingModeButton
        active={activeMode === "signup"}
        label="Sign up"
        onClick={() => {
          onModeChange("signup");
        }}
      />
    </div>
  );
}

function LandingModeButton({ active, label, onClick }: LandingModeButtonProps): ReactElement {
  return (
    <button
      aria-pressed={active}
      className="landing-card__switch-button"
      data-active={active}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
