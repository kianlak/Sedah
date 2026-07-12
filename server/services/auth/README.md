# Auth Service

This folder is reserved for the authentication and identity microservice.

Likely responsibilities:

- begin login and signup flows
- handle email auth delivery requests
- exchange OAuth provider codes
- issue and refresh sessions
- own account identity rules and security checks

The gateway should treat this as a downstream service rather than embedding auth logic directly.
