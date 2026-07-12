import { useEffect, useRef, useState } from "react";
import { validateLandingEmail } from "../logic/validateLandingEmail";

const EMAIL_ERROR_DISPLAY_MS = 2400;
const EMAIL_ERROR_EXIT_MS = 180;

interface UseLandingEmailValidationResult {
  emailError: string | null;
  handleEmailInputChange: () => void;
  isEmailErrorVisible: boolean;
  resetEmailValidation: () => void;
  validateEmail: (email: string) => boolean;
}

export function useLandingEmailValidation(): UseLandingEmailValidationResult {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isEmailErrorVisible, setIsEmailErrorVisible] = useState(false);
  const showEmailErrorFrameReference = useRef<number | null>(null);
  const hideEmailErrorTimeoutReference = useRef<number | null>(null);
  const clearEmailErrorTimeoutReference = useRef<number | null>(null);

  const clearEmailErrorTimers = (): void => {
    if (showEmailErrorFrameReference.current !== null) {
      window.cancelAnimationFrame(showEmailErrorFrameReference.current);
      showEmailErrorFrameReference.current = null;
    }

    if (hideEmailErrorTimeoutReference.current !== null) {
      window.clearTimeout(hideEmailErrorTimeoutReference.current);
      hideEmailErrorTimeoutReference.current = null;
    }

    if (clearEmailErrorTimeoutReference.current !== null) {
      window.clearTimeout(clearEmailErrorTimeoutReference.current);
      clearEmailErrorTimeoutReference.current = null;
    }
  };

  const dismissEmailError = (): void => {
    clearEmailErrorTimers();

    if (emailError === null) {
      return;
    }

    setIsEmailErrorVisible(false);
    clearEmailErrorTimeoutReference.current = window.setTimeout(() => {
      clearEmailErrorTimeoutReference.current = null;
      setEmailError(null);
    }, EMAIL_ERROR_EXIT_MS);
  };

  const showEmailError = (message: string): void => {
    clearEmailErrorTimers();
    setEmailError(message);
    setIsEmailErrorVisible(false);
    showEmailErrorFrameReference.current = window.requestAnimationFrame(() => {
      showEmailErrorFrameReference.current = null;
      setIsEmailErrorVisible(true);
      hideEmailErrorTimeoutReference.current = window.setTimeout(() => {
        hideEmailErrorTimeoutReference.current = null;
        dismissEmailError();
      }, EMAIL_ERROR_DISPLAY_MS);
    });
  };

  useEffect(() => {
    return () => {
      clearEmailErrorTimers();
    };
  }, []);

  const handleEmailInputChange = (): void => {
    if (emailError !== null || isEmailErrorVisible) {
      dismissEmailError();
    }
  };

  const validateEmail = (email: string): boolean => {
    const nextEmailError = validateLandingEmail(email);

    if (nextEmailError) {
      showEmailError(nextEmailError);
      return false;
    }

    dismissEmailError();
    return true;
  };

  const resetEmailValidation = (): void => {
    setEmailError(null);
    setIsEmailErrorVisible(false);
    clearEmailErrorTimers();
  };

  return {
    emailError,
    handleEmailInputChange,
    isEmailErrorVisible,
    resetEmailValidation,
    validateEmail
  };
}
