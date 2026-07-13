import type { AuthFeedbackResult, AuthService, BeginEmailAuthInput, BeginProviderAuthInput } from "./interfaces/authService";

export function createStubAuthService(): AuthService {
  return {
    async beginEmailAuth(input: BeginEmailAuthInput): Promise<AuthFeedbackResult> {
      return {
        message:
          input.mode === "signup"
            ? "Email-based signup scaffolding is ready for a free-user account. Auth delivery and account creation wiring still need backend services."
            : "Email-based login scaffolding is ready. Auth delivery and session wiring still need backend services.",
        tone: "neutral"
      };
    },
    async beginProviderAuth(input: BeginProviderAuthInput): Promise<AuthFeedbackResult> {
      return {
        message: `Google ${input.mode === "login" ? "sign in" : "account creation"} is staged in the UI. The provider callback and secure token exchange still need backend wiring.`,
        tone: "neutral"
      };
    }
  };
}
