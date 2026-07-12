# API Gateway

This folder is for the gateway layer that fronts local and remote microservices.

Responsibilities:

- expose a stable API surface to the desktop client
- route requests to downstream services such as `auth`, `catalog`, and `profile`
- centralize cross-cutting concerns like auth headers, tracing, rate limiting, and response shaping
- provide a clean migration path from local development services to hosted infrastructure

The frontend should call the gateway boundary, not individual microservice URLs directly.
