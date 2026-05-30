# Optional Notes, Stats, And Full-Stack Upgrade

Do not start anything in this file until the frontend MVP is useful in daily study.

Frontend MVP means:

- `/questions` table works.
- Search/filter/sort works.
- Local progress works.
- `/patterns`, `/dashboard`, and `/review` are useful.
- UI is polished enough to share.

## Optional PR: Problem Notes

### Goal

Let users write lightweight local notes per problem.

### Context

Local progress exists. Notes should remain local and separate from static data.

### Branch Name

```bash
feat/problem-notes
```

### Files Allowed To Change

- `src/hooks/**`
- `src/lib/**`
- `src/types/**`
- `src/app/questions/**`
- `src/components/**`

### Files Not Allowed To Change

- Root Swati export files.
- Backend/auth/database files.
- `.github/**`
- `package.json` unless clearly justified.

### Constraints

- Store notes in `localStorage`.
- Keep notes lightweight.
- No rich-text editor.
- Do not add backend.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/problem-notes
```

### Copy/Paste Codex Prompt

```txt
Goal:
Add local notes for each problem.

Context:
The frontend MVP is useful and local progress already works.

Branch:
feat/problem-notes

Files allowed:
src/hooks/**, src/lib/**, src/types/**, src/app/questions/**, and src/components/**.

Files not allowed:
Root Swati export files, backend/auth/database files, .github/**, package.json unless clearly justified.

Constraints:
Store notes in localStorage. Keep notes lightweight. Do not create a rich-text editor. Do not add backend/auth/database.

Done criteria:
User can add/edit notes for a problem. Notes persist after refresh. Static data remains unchanged. npm run lint/build pass.

Stop conditions:
Stop if notes require backend sync, a rich editor dependency, or changes to static data.
```

### Done Criteria

- User can add and edit notes.
- Notes persist after refresh.
- Static data remains unchanged.
- `npm run lint` passes.
- `npm run build` passes.

### Manual Verification Commands

```bash
git status
git diff
npm run lint
npm run build
npm run dev
```

### Commit Message

```bash
feat(notes): add local problem notes
```

### What I Should Learn

- Forms.
- Textarea state.
- Per-item local persistence.
- Keeping user content separate from static data.

### Stop Conditions

Stop and report if scope grows into rich text, backend sync, or data migration.

## Optional PR: Stats Page

### Goal

Visualize progress after the tracker is useful.

### Context

Local progress and dashboard metrics already exist.

### Branch Name

```bash
feat/stats-page
```

### Files Allowed To Change

- `src/app/stats/**`
- `src/components/**`
- `src/lib/**`
- `src/hooks/**`
- `package.json` only if charting dependency is clearly justified

### Files Not Allowed To Change

- Root Swati export files.
- Backend/auth/database files.
- `.github/**`

### Constraints

- Show solved by section/category.
- Show status distribution.
- Show useful empty states.
- Use lightweight charting only if it adds real value.
- Do not add backend.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/stats-page
```

### Copy/Paste Codex Prompt

```txt
Goal:
Build the /stats page using existing local progress data.

Context:
The frontend MVP is useful, local progress works, and the dashboard already derives summary metrics.

Branch:
feat/stats-page

Files allowed:
src/app/stats/**, src/components/**, src/lib/**, src/hooks/**, and package.json only if a charting dependency is clearly justified.

Files not allowed:
Root Swati export files, backend/auth/database files, .github/**.

Constraints:
Show solved by section/category, status distribution, and useful empty states. Use lightweight charting only if needed. Do not add backend/auth/database.

Done criteria:
/stats shows solved by section/category and status distribution. Empty state works. npm run lint/build pass.

Stop conditions:
Stop if charts require a heavy dependency without clear value or if stats require backend history.
```

### Done Criteria

- `/stats` shows solved by section/category.
- `/stats` shows status distribution.
- Empty state works.
- `npm run lint` passes.
- `npm run build` passes.

### Manual Verification Commands

```bash
git status
git diff
npm run lint
npm run build
npm run dev
```

### Commit Message

```bash
feat(stats): add progress stats
```

### What I Should Learn

- Data visualization.
- Aggregation.
- Chart usefulness vs decoration.
- Empty states for analytics.

### Stop Conditions

Stop and report if a dependency choice is unclear or if stats require tracking history that does not exist.

## Full-Stack Decision Checklist

Only consider Supabase/auth/database if at least one answer is yes:

- Do users need progress across devices?
- Do users need login?
- Do users need cloud backup?
- Do users need sharing?
- Is local-only progress limiting real use?

If the answer is no, keep the app local-first.

## Optional Full-Stack PR Split

Do not implement all full-stack work in one PR.

Recommended sequence:

| PR | Branch | Purpose |
| --- | --- | --- |
| 1 | `chore/add-supabase-client` | Add client setup and env docs only |
| 2 | `feat/auth` | Add sign-in/sign-out UX |
| 3 | `feat/database-progress` | Store progress in Postgres |
| 4 | `feat/local-to-cloud-migration` | Migrate local progress after login |
| 5 | `chore/rls-and-security-review` | Review policies and access rules |

### Copy/Paste Codex Prompt For PR 1

```txt
Goal:
Add Supabase client setup only.

Context:
The frontend MVP is useful, and the project has explicitly decided it needs cloud sync.

Branch:
chore/add-supabase-client

Files allowed:
Supabase client config files, environment documentation, and README updates.

Files not allowed:
Feature pages, progress migration, auth UI, database writes, and Swati data files.

Constraints:
Do not implement auth or database progress in this PR. Document required env vars. Do not commit secrets.

Done criteria:
Supabase client setup exists, env docs exist, app still builds, npm run lint/build pass.

Stop conditions:
Stop if Supabase project details or env variable names are missing.
```

### What I Should Learn

- Client/server boundaries.
- Environment variables.
- Auth sequencing.
- Why data and security changes need small PRs.
