import { useEffect, useState } from "react";
import type { LandingEntryMode, LandingEntryProvider, LandingFeedback } from "../interfaces/landing";
import { buildLandingEmailFeedback, buildLandingGoogleFeedback } from "../logic/landingFeedback";

const DEFAULT_FEEDBACK: LandingFeedback = {
  message: "",
  tone: "neutral"
};

interface UseLandingCardStateOptions {
  activeMode: LandingEntryMode;
  onModeChange: (mode: LandingEntryMode) => void;
}

interface UseLandingCardStateResult {
  email: string;
  feedback: LandingFeedback;
  setEmail: (value: string) => void;
  handleProviderAction: (provider: LandingEntryProvider) => void;
  handleModeChange: (mode: LandingEntryMode) => void;
  handleEmailAction: () => void;
}

export function useLandingCardState({
  activeMode,
  onModeChange
}: UseLandingCardStateOptions): UseLandingCardStateResult {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<LandingFeedback>(DEFAULT_FEEDBACK);

  useEffect(() => {
    setFeedback(DEFAULT_FEEDBACK);
  }, [activeMode]);

  const handleProviderAction = (provider: LandingEntryProvider): void => {
    const submission = {
      mode: activeMode,
      provider,
      email: email.trim()
    };

    setFeedback(provider === "google" ? buildLandingGoogleFeedback(submission) : buildLandingEmailFeedback(submission));
  };

  const handleModeChange = (mode: LandingEntryMode): void => {
    onModeChange(mode);
  };

  const handleEmailAction = (): void => {
    const submission = {
      mode: activeMode,
      provider: "email" as const,
      email: email.trim()
    };
    const nextFeedback = buildLandingEmailFeedback(submission);

    setFeedback(nextFeedback);

    if (nextFeedback.tone === "warning") {
      return;
    }
  };

  return {
    email,
    feedback,
    setEmail,
    handleProviderAction,
    handleModeChange,
    handleEmailAction
  };
}
