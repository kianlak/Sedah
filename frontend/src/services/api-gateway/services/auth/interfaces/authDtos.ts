export interface BeginEmailAuthRequest {
  email: string;
  mode: "login" | "signup";
}

export interface BeginEmailAuthResponse {
  deliveryChannel: "email";
  message: string;
  requestId: string;
}

export interface ExchangeGoogleAuthCodeRequest {
  authorizationCode: string;
  redirectUri: string;
}

export interface ExchangeGoogleAuthCodeResponse {
  accountId: string;
  sessionToken: string;
}
