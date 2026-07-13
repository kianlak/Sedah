import type { LandingEntryMode } from "../../../pages/landing/interfaces/landing";

export interface AuthFeedbackResult {
  message: string;
  tone: "neutral" | "warning";
}

export interface BeginEmailAuthInput {
  email: string;
  mode: LandingEntryMode;
}

export interface BeginProviderAuthInput {
  email: string;
  mode: LandingEntryMode;
  provider: "google";
}

export interface AuthService {
  beginEmailAuth(input: BeginEmailAuthInput, signal?: AbortSignal): Promise<AuthFeedbackResult>;
  beginProviderAuth(input: BeginProviderAuthInput, signal?: AbortSignal): Promise<AuthFeedbackResult>;
}
