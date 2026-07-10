import type { LandingFeedback, LandingSubmission } from "../interfaces/landing";

export function buildLandingGoogleFeedback(submission: LandingSubmission): LandingFeedback {
  const modeLabel = submission.mode === "login" ? "sign in" : "account creation";

  return {
    tone: "neutral",
    message: `Google ${modeLabel} is staged in the UI. The provider callback and secure token exchange still need backend wiring.`
  };
}

export function buildLandingEmailFeedback(submission: LandingSubmission): LandingFeedback {
  if (!submission.email) {
    return {
      tone: "warning",
      message: "Enter your email before continuing."
    };
  }

  if (submission.mode === "signup") {
    return {
      tone: "neutral",
      message: "Email-based signup scaffolding is ready for a free-user account. Auth delivery and account creation wiring still need backend services."
    };
  }

  return {
    tone: "neutral",
    message: "Email-based login scaffolding is ready. Auth delivery and session wiring still need backend services."
  };
}
