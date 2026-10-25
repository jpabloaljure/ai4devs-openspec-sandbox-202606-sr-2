# health-check Specification

## Purpose

Provides a public liveness endpoint so monitors, load balancers and developers can verify that the API process is up and serving requests.

## Requirements

### Requirement: Health endpoint reports liveness
The system SHALL expose `GET /api/v1/health` which responds with HTTP 200 and the JSON body `{ "data": { "status": "ok" } }`.

#### Scenario: Service is running
- **WHEN** a client sends `GET /api/v1/health`
- **THEN** the response status is 200 and the body is `{ "data": { "status": "ok" } }`

### Requirement: Health endpoint is public
The health endpoint MUST be accessible without authentication.

#### Scenario: Request without credentials
- **WHEN** a client sends `GET /api/v1/health` without an `Authorization` header
- **THEN** the response status is 200 and not 401
