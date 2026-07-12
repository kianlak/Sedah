import type { ApiGateway } from "./interfaces/apiGateway";
import type { ApiGatewayRuntime } from "./runtime/apiGatewayRuntime";
import { createGatewayTransport } from "./core/createGatewayTransport";
import { createApiGatewayRuntime } from "./runtime/apiGatewayRuntime";
import { createAuthGateway } from "./services/auth/createAuthGateway";

export function createApiGateway(runtime: ApiGatewayRuntime = createApiGatewayRuntime()): ApiGateway {
  const transport = createGatewayTransport(runtime);

  return {
    auth: createAuthGateway(transport)
  };
}
