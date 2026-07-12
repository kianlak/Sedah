export const API_SERVICE_NAMES = ["auth"] as const;

export type ApiServiceName = (typeof API_SERVICE_NAMES)[number];

export interface ApiGatewayRuntime {
  baseUrl: string;
  servicePaths: Record<ApiServiceName, string>;
  timeoutMs: number;
}

const DEFAULT_API_GATEWAY_URL = "http://127.0.0.1:4010";
const DEFAULT_API_GATEWAY_TIMEOUT_MS = 8000;

export function createApiGatewayRuntime(environment: ImportMetaEnv = import.meta.env): ApiGatewayRuntime {
  return {
    baseUrl: normalizeBaseUrl(environment.VITE_API_GATEWAY_URL, DEFAULT_API_GATEWAY_URL),
    servicePaths: {
      auth: "/auth"
    },
    timeoutMs: resolveTimeout(environment.VITE_API_GATEWAY_TIMEOUT_MS, DEFAULT_API_GATEWAY_TIMEOUT_MS)
  };
}

function normalizeBaseUrl(value: string | undefined, fallback: string): string {
  const candidate = value?.trim() || fallback;

  return candidate.endsWith("/") ? candidate.slice(0, -1) : candidate;
}

function resolveTimeout(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
}
