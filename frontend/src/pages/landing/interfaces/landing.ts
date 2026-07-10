export type LandingEntryMode = "login" | "signup";

export type LandingEntryProvider = "email" | "google";

export interface LandingFeedback {
  message: string;
  tone: "neutral" | "warning";
}

export interface LandingSubmission {
  mode: LandingEntryMode;
  provider: LandingEntryProvider;
  email: string;
}
