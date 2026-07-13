import type { ReactElement } from "react";
import type { LandingEmailFormProps } from "./interfaces/landingEmailFormProps";

export function LandingEmailForm({
  email,
  emailError,
  isDisabled,
  isEmailErrorVisible,
  mode,
  onEmailChange,
  onSubmit
}: LandingEmailFormProps): ReactElement {
  const emailErrorId = "landing-email-error";
  const emailInputId = "landing-email-input";
  const emailLabelId = "landing-email-label";

  return (
    <form
      className="landing-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      <div
        className="landing-form__field"
        data-invalid={Boolean(emailError)}
      >
        <span
          className="landing-form__label"
          id={emailLabelId}
        >
          Email
        </span>
        <input
          aria-describedby={emailError ? emailErrorId : undefined}
          aria-invalid={Boolean(emailError)}
          aria-labelledby={emailLabelId}
          autoComplete="email"
          disabled={isDisabled}
          id={emailInputId}
          inputMode="email"
          onChange={(event) => {
            onEmailChange(event.target.value);
          }}
          placeholder="name@example.com"
          type="email"
          value={email}
        />
        {emailError ? (
          <span
            className="landing-form__error-bubble"
            data-visible={isEmailErrorVisible}
            id={emailErrorId}
            role="alert"
          >
            {emailError}
          </span>
        ) : null}
      </div>

      <button
        className="landing-form__submit"
        data-mode={mode}
        disabled={isDisabled}
        type="submit"
      >
        <span className="landing-form__submit-text landing-form__submit-text--login">
          Continue with Email
        </span>
        <span className="landing-form__submit-text landing-form__submit-text--signup">
          Get Email Code
        </span>
      </button>
    </form>
  );
}
