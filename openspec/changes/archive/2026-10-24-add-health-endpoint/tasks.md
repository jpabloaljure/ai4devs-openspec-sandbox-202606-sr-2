# Tasks

## 1. Health endpoint

- [x] 1.1 Create `HealthController` with `show` returning `{ data: { status: 'ok' } }` in `backend/app/controllers/health_controller.ts`; verify it type-checks (`npm run typecheck` in `backend`)
- [x] 1.2 Register `GET /api/v1/health` (public, no auth middleware) in `backend/start/routes.ts`; verify with `node ace list:routes`
- [x] 1.3 Add functional test `backend/tests/functional/health.spec.ts` covering 200 + body `{ data: { status: 'ok' } }` and access without credentials; verify with `node ace test functional`
