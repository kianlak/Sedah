import type { ServiceRequestOptions } from "./serviceRequestOptions";

export interface ServiceTransport {
  request<TResponse, TRequestBody = undefined>(options: ServiceRequestOptions<TRequestBody>): Promise<TResponse>;
}
