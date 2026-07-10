import type { ReactElement } from "react";
import type { LandingGoogleButtonProps } from "./interfaces/landingGoogleButtonProps";

export function LandingGoogleButton({ onClick }: LandingGoogleButtonProps): ReactElement {
  return (
    <button
      className="landing-card__google"
      onClick={onClick}
      type="button"
    >
      <span
        aria-hidden="true"
        className="landing-card__google-mark"
      >
        G
      </span>
      Continue with Google
    </button>
  );
}
