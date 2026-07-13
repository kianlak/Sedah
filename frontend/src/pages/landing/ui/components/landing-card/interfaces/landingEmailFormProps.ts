import type { LandingEntryMode } from "../../../../interfaces/landing";

export interface LandingEmailFormProps {
  email: string;
  emailError: string | null;
  isDisabled: boolean;
  isEmailErrorVisible: boolean;
  mode: LandingEntryMode;
  onEmailChange: (value: string) => void;
  onSubmit: () => Promise<void>;
}
