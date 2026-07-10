import type { ReactElement } from "react";
import type { LandingEmailFormProps } from "./interfaces/landingEmailFormProps";

export function LandingEmailForm({
  email,
  mode,
  onEmailChange,
  onSubmit
}: LandingEmailFormProps): ReactElement {
  return (
    <form
      className="landing-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="landing-form__field">
        <span>Email</span>
        <input
          autoComplete="email"
          onChange={(event) => {
            onEmailChange(event.target.value);
          }}
          placeholder="name@example.com"
          type="email"
          value={email}
        />
      </label>

      <button
        className="landing-form__submit"
        data-mode={mode}
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
