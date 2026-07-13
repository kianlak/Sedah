import type { ReactElement } from "react";
import "../../../css/card.css";
import "../../../css/form.css";
import { useLandingCardState } from "../../../hooks/useLandingCardState";
import type { LandingEntryMode, LandingFeedback } from "../../../interfaces/landing";
import { LandingEmailForm } from "./LandingEmailForm";
import { LandingGoogleButton } from "./LandingGoogleButton";
import { LandingModeSwitch } from "./LandingModeSwitch";
import type { LandingCardProps } from "./interfaces/landingCardProps";

export function LandingCard({ activeMode, onModeChange }: LandingCardProps): ReactElement {
  const {
    beginGoogleAuth,
    changeMode,
    email,
    emailError,
    feedback,
    isAuthActionPending,
    isEmailErrorVisible,
    requestEmailAuth,
    updateEmail
  } = useLandingCardState({
    activeMode,
    onModeChange
  });

  return (
    <section
      aria-label="Sedah account access"
      className="landing-card"
      data-landing-mode={activeMode}
    >
      <LandingModeSwitch
        activeMode={activeMode}
        onModeChange={changeMode}
      />

      <div className="landing-card__body">
        <div className="landing-card__content">
          <LandingCardPanel
            beginGoogleAuth={beginGoogleAuth}
            emailError={emailError}
            feedback={feedback}
            isAuthActionPending={isAuthActionPending}
            isEmailErrorVisible={isEmailErrorVisible}
            mode={activeMode}
            onEmailChange={updateEmail}
            requestEmailAuth={requestEmailAuth}
            email={email}
          />
        </div>
      </div>
    </section>
  );
}

interface LandingCardPanelProps {
  beginGoogleAuth: () => Promise<void>;
  mode: LandingEntryMode;
  email: string;
  emailError: string | null;
  feedback: LandingFeedback;
  isAuthActionPending: boolean;
  onEmailChange: (value: string) => void;
  isEmailErrorVisible: boolean;
  requestEmailAuth: () => Promise<void>;
}

function LandingCardPanel({
  beginGoogleAuth,
  mode,
  email,
  emailError,
  feedback,
  isAuthActionPending,
  onEmailChange,
  isEmailErrorVisible,
  requestEmailAuth
}: LandingCardPanelProps): ReactElement | null {
  return (
    <>
      <div
        className="landing-card__lead-stack"
        data-mode={mode}
      >
        <p className="landing-card__lead landing-card__lead--login">
          Continue with your email to log in to your free-user account.
        </p>
        <p className="landing-card__lead landing-card__lead--signup">
          Continue with Google or request a 6-digit email code to finish creating your account.
        </p>
      </div>

      <div
        aria-hidden={mode !== "signup"}
        className="landing-card__signup-section"
        data-expanded={mode === "signup"}
      >
        <div className="landing-card__signup-section-inner">
          <LandingGoogleButton
            isDisabled={isAuthActionPending}
            onClick={beginGoogleAuth}
          />

          <div
            aria-hidden="true"
            className="landing-card__divider"
          >
            <span>or</span>
          </div>
        </div>
      </div>

      <div
        className="landing-card__mode-copy"
        data-mode={mode}
      >
        <p className="landing-card__mode-copy-text landing-card__mode-copy-text--login">
          Sign back in to your free-user account with your email.
        </p>
        <p className="landing-card__mode-copy-text landing-card__mode-copy-text--signup">
          Create a new free-user account with Google or request a 6-digit code by email.
        </p>
      </div>

      <LandingEmailForm
        email={email}
        emailError={emailError}
        isDisabled={isAuthActionPending}
        isEmailErrorVisible={isEmailErrorVisible}
        mode={mode}
        onEmailChange={onEmailChange}
        onSubmit={requestEmailAuth}
      />

      <p
        aria-live="polite"
        className="landing-card__status"
        data-tone={feedback.tone}
      >
        <span className="landing-card__status-text">{feedback.message}</span>
      </p>
    </>
  );
}
