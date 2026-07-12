import type {
  BeginEmailAuthRequest,
  BeginEmailAuthResponse,
  ExchangeGoogleAuthCodeRequest,
  ExchangeGoogleAuthCodeResponse
} from "./authDtos";

export interface AuthGateway {
  beginEmailAuth(request: BeginEmailAuthRequest, signal?: AbortSignal): Promise<BeginEmailAuthResponse>;
  exchangeGoogleAuthorizationCode(
    request: ExchangeGoogleAuthCodeRequest,
    signal?: AbortSignal
  ): Promise<ExchangeGoogleAuthCodeResponse>;
}
