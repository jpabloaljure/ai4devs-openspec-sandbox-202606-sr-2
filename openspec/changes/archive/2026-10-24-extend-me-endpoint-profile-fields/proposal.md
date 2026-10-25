# Proposal

## Why

Clients consuming `GET /me` currently only get `id`, `email` and `createdAt`. They need a human-friendly `displayName` for UI greetings and a `lastLoginAt` timestamp for security/activity information, and neither is stored today.

## What Changes

- Add a nullable `display_name` column to `users` (new profile field, distinct from the existing `full_name`).
- Add a nullable `last_login_at` column to `users`, updated on every successful `POST /login`.
- Extend `GET /me` response to `{ data: { id, email, createdAt, displayName, lastLoginAt } }`.
- `displayName` is `null` until set; `lastLoginAt` is `null` for users who have never logged in (signup alone does not count as a login).
- Existing fields and the `POST /signup` / `POST /login` response shapes are unchanged (additive, non-breaking).

## Capabilities

### New Capabilities

### Modified Capabilities
- `auth`: "Return current user" requirement now includes `displayName` and `lastLoginAt`; "Log in users" requirement now records the last successful login time.

## Impact

- DB: new migration adding two nullable columns to `users`; regenerated `backend/database/schema.ts`.
- Code: `backend/app/controllers/profile_controller.ts`, `backend/app/controllers/access_tokens_controller.ts`, `backend/app/models/user.ts` (if needed).
- Tests: `backend/tests/functional/auth.spec.ts`.
- API: additive fields on `GET /me`; no breaking changes. No endpoint to set `displayName` is included in this change.
