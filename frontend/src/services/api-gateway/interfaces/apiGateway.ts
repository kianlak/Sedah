import type { AuthGateway } from "../services/auth/interfaces/authGateway";

export interface ApiGateway {
  auth: AuthGateway;
}
