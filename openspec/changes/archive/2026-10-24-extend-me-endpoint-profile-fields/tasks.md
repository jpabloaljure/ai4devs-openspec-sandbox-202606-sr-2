# Tasks

## 1. Database schema

- [x] 1.1 Create migration `add_display_name_and_last_login_at_to_users_table` adding nullable `display_name` (string) and `last_login_at` (timestamp) with a `down()` that drops both; verify `node ace migration:run` and `migration:rollback` both succeed
- [x] 1.2 Confirm `backend/database/schema.ts` is regenerated with `displayName` and `lastLoginAt` on `UserSchema`; verify via `git diff` and `npx tsc --noEmit` in `backend/`

## 2. Login records last login

- [x] 2.1 In `AccessTokensController.store`, set `user.lastLoginAt = DateTime.now()` and save after `verifyCredentials` succeeds; verify with a functional test that a successful login sets it and a wrong-password login leaves it unchanged

## 3. Extend GET /me

- [x] 3.1 Add `displayName` and `lastLoginAt` (ISO string or `null`) to `ProfileController.show`; verify with functional tests covering: never-logged-in user (`lastLoginAt: null`), no display name (`displayName: null`), and a user who logged in (ISO timestamp)
- [x] 3.2 Update existing `GET /me` test in `backend/tests/functional/auth.spec.ts` to expect the new fields; verify `node ace test` passes in full
- [x] 3.3 Run `npx biome check` in `backend/` and verify no lint/format errors
