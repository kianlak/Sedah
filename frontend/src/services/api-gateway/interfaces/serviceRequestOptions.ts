import type { ApiServiceName } from "../runtime/apiGatewayRuntime";

export interface ServiceRequestOptions<TRequestBody = undefined> {
  body?: TRequestBody;
  headers?: HeadersInit;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  query?: URLSearchParams | Record<string, string | number | boolean | null | undefined>;
  service: ApiServiceName;
  signal?: AbortSignal;
}
