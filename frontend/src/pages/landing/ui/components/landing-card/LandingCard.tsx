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
    email,
    emailError,
    feedback,
    isEmailErrorVisible,
    setEmail,
    handleProviderAction,
    handleModeChange,
    handleEmailAction
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
        onModeChange={handleModeChange}
      />

      <div className="landing-card__body">
        <div className="landing-card__content">
          <LandingCardPanel
            emailError={emailError}
            feedback={feedback}
            handleEmailAction={handleEmailAction}
            handleProviderAction={handleProviderAction}
            isEmailErrorVisible={isEmailErrorVisible}
            mode={activeMode}
            onEmailChange={setEmail}
            email={email}
          />
        </div>
      </div>
    </section>
  );
}

interface LandingCardPanelProps {
  mode: LandingEntryMode;
  email: string;
  emailError: string | null;
  feedback: LandingFeedback;
  onEmailChange: (value: string) => void;
  handleProviderAction: (provider: "google") => void;
  handleEmailAction: () => void;
  isEmailErrorVisible: boolean;
}

function LandingCardPanel({
  mode,
  email,
  emailError,
  feedback,
  onEmailChange,
  handleProviderAction,
  handleEmailAction,
  isEmailErrorVisible
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
            onClick={() => {
              handleProviderAction("google");
            }}
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
        isEmailErrorVisible={isEmailErrorVisible}
        mode={mode}
        onEmailChange={onEmailChange}
        onSubmit={handleEmailAction}
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
