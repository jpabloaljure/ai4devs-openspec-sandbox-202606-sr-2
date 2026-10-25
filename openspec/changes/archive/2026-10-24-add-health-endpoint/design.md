# Design

## Context

Routes live in `backend/start/routes.ts` with no prefix today; controllers are auto-registered via `#generated/controllers`. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Minimal, dependency-free liveness check under `/api/v1`.

**Non-Goals:**
- Readiness checks (database, external services).
- Migrating existing routes under `/api/v1`.

## Decisions

- **Dedicated `HealthController` with a `show` action**, matching the existing controller-per-resource style, rather than an inline route closure.
- **Response `{ data: { status: "ok" } }`**, following the project convention of wrapping payloads in `data`; the `status: "ok"` field is the requested contract.
- **Route group with `prefix('api/v1')`** only for the new route, so existing routes are untouched. AdonisJS matches paths case-insensitively, so `/API/v1/health` also resolves.
- **No DB call**: a pure liveness probe stays fast and does not fail on DB issues.

## Risks / Trade-offs

- [Liveness only, not readiness] → Out of scope; add a separate endpoint later if needed.
