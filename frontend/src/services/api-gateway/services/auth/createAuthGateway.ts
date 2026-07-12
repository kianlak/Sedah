import type { ServiceTransport } from "../../interfaces/serviceTransport";
import type { AuthGateway } from "./interfaces/authGateway";
import type {
  BeginEmailAuthRequest,
  BeginEmailAuthResponse,
  ExchangeGoogleAuthCodeRequest,
  ExchangeGoogleAuthCodeResponse
} from "./interfaces/authDtos";

export function createAuthGateway(transport: ServiceTransport): AuthGateway {
  return {
    beginEmailAuth(request: BeginEmailAuthRequest, signal?: AbortSignal): Promise<BeginEmailAuthResponse> {
      return transport.request<BeginEmailAuthResponse, BeginEmailAuthRequest>({
        body: request,
        method: "POST",
        path: "/email/requests",
        service: "auth",
        signal
      });
    },
    exchangeGoogleAuthorizationCode(
      request: ExchangeGoogleAuthCodeRequest,
      signal?: AbortSignal
    ): Promise<ExchangeGoogleAuthCodeResponse> {
      return transport.request<ExchangeGoogleAuthCodeResponse, ExchangeGoogleAuthCodeRequest>({
        body: request,
        method: "POST",
        path: "/oauth/google/exchange",
        service: "auth",
        signal
      });
    }
  };
}
