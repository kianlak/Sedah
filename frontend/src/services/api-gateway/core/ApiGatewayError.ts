export class ApiGatewayError extends Error {
  readonly responseBody: unknown;
  readonly service: string;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;

  constructor(options: {
    responseBody: unknown;
    service: string;
    status: number;
    statusText: string;
    url: string;
  }) {
    super(`API gateway request failed for ${options.service} (${options.status} ${options.statusText})`);
    this.name = "ApiGatewayError";
    this.responseBody = options.responseBody;
    this.service = options.service;
    this.status = options.status;
    this.statusText = options.statusText;
    this.url = options.url;
  }
}
