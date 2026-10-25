# Proposal

## Why

The API has no lightweight way to confirm the service is up. Load balancers, uptime monitors and developers need a public, unauthenticated endpoint to check liveness.

## What Changes

- Add `GET /api/v1/health` returning `200` with body `{ "data": { "status": "ok" } }`.
- The endpoint is public (no authentication) and performs no database access.

## Capabilities

### New Capabilities
- `health-check`: Public liveness endpoint reporting that the API is running.

### Modified Capabilities

## Impact

- `backend/start/routes.ts`: new route under the `/api/v1` prefix.
- New controller in `backend/app/controllers/` and a functional test in `backend/tests/functional/`.
- No new dependencies; existing routes are unchanged.
