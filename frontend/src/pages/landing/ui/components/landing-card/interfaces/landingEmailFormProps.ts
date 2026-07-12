import type { LandingEntryMode } from "../../../../interfaces/landing";

export interface LandingEmailFormProps {
  email: string;
  emailError: string | null;
  isEmailErrorVisible: boolean;
  mode: LandingEntryMode;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}
