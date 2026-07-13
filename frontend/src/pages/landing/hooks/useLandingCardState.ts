import { useEffect, useState } from "react";
import { DEFAULT_LANDING_FEEDBACK } from "../constants/landingFeedback";
import type { LandingEntryMode, LandingFeedback } from "../interfaces/landing";
import { authService } from "../../../domain/auth/authService";
import { useLandingEmailValidation } from "./useLandingEmailValidation";

interface UseLandingCardStateOptions {
  activeMode: LandingEntryMode;
  onModeChange: (mode: LandingEntryMode) => void;
}

interface UseLandingCardStateResult {
  email: string;
  emailError: string | null;
  feedback: LandingFeedback;
  isAuthActionPending: boolean;
  isEmailErrorVisible: boolean;
  beginGoogleAuth: () => Promise<void>;
  changeMode: (mode: LandingEntryMode) => void;
  requestEmailAuth: () => Promise<void>;
  updateEmail: (value: string) => void;
}

export function useLandingCardState({
  activeMode,
  onModeChange
}: UseLandingCardStateOptions): UseLandingCardStateResult {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<LandingFeedback>(DEFAULT_LANDING_FEEDBACK);
  const [isAuthActionPending, setIsAuthActionPending] = useState(false);
  const {
    emailError,
    handleEmailInputChange,
    isEmailErrorVisible,
    resetEmailValidation,
    validateEmail
  } = useLandingEmailValidation();

  useEffect(() => {
    resetEmailValidation();
    setFeedback(DEFAULT_LANDING_FEEDBACK);
  }, [activeMode, resetEmailValidation]);

  const updateEmail = (value: string): void => {
    setEmail(value);
    handleEmailInputChange();
  };

  const beginGoogleAuth = async (): Promise<void> => {
    setIsAuthActionPending(true);

    try {
      const result = await authService.beginProviderAuth({
        email: email.trim(),
        mode: activeMode,
        provider: "google"
      });

      setFeedback(result);
    } finally {
      setIsAuthActionPending(false);
    }
  };

  const changeMode = (mode: LandingEntryMode): void => {
    onModeChange(mode);
  };

  const requestEmailAuth = async (): Promise<void> => {
    if (!validateEmail(email)) {
      return;
    }

    setIsAuthActionPending(true);

    try {
      const result = await authService.beginEmailAuth({
        email: email.trim(),
        mode: activeMode
      });

      setFeedback(result);
    } finally {
      setIsAuthActionPending(false);
    }
  };

  return {
    beginGoogleAuth,
    changeMode,
    email,
    emailError,
    feedback,
    isAuthActionPending,
    isEmailErrorVisible,
    requestEmailAuth,
    updateEmail
  };
}
