# Design

## Context

`GET /me` is served by `ProfileController.show`, which builds the response by hand (`id`, `email`, `createdAt`). Login happens in `AccessTokensController.store` via `User.verifyCredentials` + `User.accessTokens.create`. `backend/database/schema.ts` is auto-generated from migrations (`node ace migration:run`), and `User` extends `UserSchema`. The `users` table already has `full_name`. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Persist `display_name` and `last_login_at` on `users` via a new migration.
- Return both fields from `GET /me`; update `lastLoginAt` on successful login.

**Non-Goals:**
- No endpoint to edit `displayName` (follow-up change).
- No backfill, no change to signup/login response bodies, no login history table.

## Decisions

- **Separate `display_name` column rather than reusing `full_name`.** The user described it as its own profile field, and `full_name` may mean the legal name. Alternative: alias `fullName` — rejected to avoid conflating semantics.
- **Both columns nullable, no defaults.** Existing rows stay valid; the API returns `null` (SQLite `ALTER TABLE ADD COLUMN` handles this without table rebuild). Alternative: default `displayName` to email local-part — rejected as hidden behavior; clients can fall back.
- **New migration, not an edit of the create-table migration.** Preserves history for already-migrated databases. Name: `<timestamp>_add_display_name_and_last_login_at_to_users_table.ts`; `down()` drops both columns.
- **Set `lastLoginAt` in `AccessTokensController.store`** after `verifyCredentials` succeeds (`user.lastLoginAt = DateTime.now(); await user.save()`), so failed logins never touch it. Signup does not set it: it is not a login. Alternative: a model hook — rejected, since token creation is not exclusive to login.
- **Serialize in `ProfileController` with `.toISO()`**, matching `createdAt`. Nullable values use `user.lastLoginAt?.toISO() ?? null`.
- **Regenerate `database/schema.ts`** by running the migration; not hand-edited.

## Risks / Trade-offs

- [Extra write per login] → Negligible for this app's scale.
- [`save()` also bumps `updatedAt`] → Acceptable; alternatively use a targeted query update if that proves undesirable.
- [Users who logged in before deploy show `lastLoginAt: null` until their next login] → Documented in the spec scenarios.
