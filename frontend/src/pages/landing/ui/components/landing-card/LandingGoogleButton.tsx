import type { MouseEvent, ReactElement } from "react";
import type { LandingGoogleButtonProps } from "./interfaces/landingGoogleButtonProps";

export function LandingGoogleButton({ isDisabled, onClick }: LandingGoogleButtonProps): ReactElement {
  return (
    <button
      className="landing-card__google"
      disabled={isDisabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        void onClick();
      }}
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
