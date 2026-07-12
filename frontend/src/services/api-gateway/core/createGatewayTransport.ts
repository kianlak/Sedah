import type { ServiceRequestOptions } from "../interfaces/serviceRequestOptions";
import type { ServiceTransport } from "../interfaces/serviceTransport";
import type { ApiGatewayRuntime } from "../runtime/apiGatewayRuntime";
import { ApiGatewayError } from "./ApiGatewayError";

export function createGatewayTransport(runtime: ApiGatewayRuntime): ServiceTransport {
  return {
    async request<TResponse, TRequestBody = undefined>(
      options: ServiceRequestOptions<TRequestBody>
    ): Promise<TResponse> {
      const controller = new AbortController();
      const timeoutHandle = window.setTimeout(() => {
        controller.abort(new DOMException("Gateway request timed out.", "AbortError"));
      }, runtime.timeoutMs);
      const signal = options.signal ?? controller.signal;
      const url = buildServiceUrl(runtime, options);

      try {
        const response = await fetch(url, {
          body: createRequestBody(options.body),
          headers: createRequestHeaders(options.body, options.headers),
          method: options.method ?? "GET",
          signal
        });
        const responseBody = await readResponseBody(response);

        if (!response.ok) {
          throw new ApiGatewayError({
            responseBody,
            service: options.service,
            status: response.status,
            statusText: response.statusText,
            url
          });
        }

        return responseBody as TResponse;
      } finally {
        window.clearTimeout(timeoutHandle);
      }
    }
  };
}

function buildServiceUrl<TRequestBody>(
  runtime: ApiGatewayRuntime,
  options: ServiceRequestOptions<TRequestBody>
): string {
  const servicePath = runtime.servicePaths[options.service];
  const requestPath = options.path.startsWith("/") ? options.path : `/${options.path}`;
  const url = new URL(`${runtime.baseUrl}${servicePath}${requestPath}`);

  if (options.query) {
    const searchParameters =
      options.query instanceof URLSearchParams ? options.query : buildSearchParams(options.query);

    searchParameters.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

function buildSearchParams(
  query: Record<string, string | number | boolean | null | undefined>
): URLSearchParams {
  const searchParameters = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) {
      continue;
    }

    searchParameters.set(key, String(value));
  }

  return searchParameters;
}

function createRequestBody(body: unknown): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  return JSON.stringify(body);
}

function createRequestHeaders(body: unknown, headers: HeadersInit | undefined): Headers {
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  return requestHeaders;
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("Content-Type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}
