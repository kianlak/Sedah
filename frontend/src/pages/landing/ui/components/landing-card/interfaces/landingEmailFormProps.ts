import type { LandingEntryMode } from "../../../../interfaces/landing";

export interface LandingEmailFormProps {
  email: string;
  mode: LandingEntryMode;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}
