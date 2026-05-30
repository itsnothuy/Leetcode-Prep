# Local Progress, Patterns, And Dashboard

This file covers three separate PRs. Do not start these until the questions table and filters work.

## PR A: Local Progress

### Goal

Add `localStorage` progress tracking without backend/auth/database.

### Context

The questions table and filters exist. Static data must remain immutable and separate from user progress.

### Branch Name

```bash
feat/local-progress
```

### Files Allowed To Change

- `src/hooks/**`
- `src/lib/**`
- `src/types/**`
- `src/app/questions/**`
- `src/components/**`

### Files Not Allowed To Change

- Root Swati export files.
- `src/data/**` except read-only imports.
- Backend/auth/database files.
- `.github/**`
- `package.json` unless clearly justified.

### Constraints

- Store progress in `localStorage`.
- Use status values: `not-started`, `attempted`, `solved`, `need-review`, `skipped`.
- Use a custom hook for progress state.
- Handle Next.js client/hydration concerns.
- Keep static data immutable.
- Do not add review scheduling yet.
- Do not add backend.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/local-progress
```

### Copy/Paste Codex Prompt

```txt
Goal:
Add localStorage-based progress tracking to the questions table.

Context:
/questions already renders typed static data with search and filters. Static Swati data must remain separate from user progress.

Branch:
feat/local-progress

Files allowed:
src/hooks/**, src/lib/**, src/types/**, src/app/questions/**, and src/components/**.

Files not allowed:
Root Swati export files, src/data/** except read-only imports, backend/auth/database files, .github/**, package.json unless clearly justified.

Constraints:
Progress must be stored in localStorage. Status values are not-started, attempted, solved, need-review, and skipped. Use a custom hook. Handle Next.js client/hydration concerns. Do not add backend/auth/database or review scheduling.

Done criteria:
User can change status for a question. Status persists after refresh. Progress data is stored separately from static question data. npm run lint and npm run build pass.

Stop conditions:
Stop if the task appears to require backend/auth/database, if hydration bugs are unclear, or if the static dataset would need to be mutated.
```

### Done Criteria

- User can change status for a question.
- Status persists after refresh.
- Progress data is stored separately from static data.
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
feat(progress): add local progress tracking
```

### What I Should Learn

- Client state.
- `localStorage`.
- Custom hooks.
- Hydration and client-only behavior in Next.js.

### Stop Conditions

Stop and report if progress cannot be stored separately, hydration behavior is unclear, or a backend becomes necessary.

## PR B: Patterns Page

### Goal

Let users browse progress by pattern.

### Context

Local progress exists. Use static data plus progress state to compute pattern progress.

### Branch Name

```bash
feat/patterns-page
```

### Files Allowed To Change

- `src/app/patterns/**`
- `src/app/questions/**` only for reading pattern query params if needed
- `src/components/**`
- `src/lib/**`
- `src/hooks/**`

### Files Not Allowed To Change

- Root Swati export files.
- Backend/auth/database files.
- `.github/**`
- `package.json` unless clearly justified.

### Constraints

- Show all 94 patterns.
- Pattern cards show section/category, solved count, total count, and progress bar.
- Clicking a pattern navigates to `/questions` filtered to that pattern via query param or another clear method.
- Do not add charts.
- Do not add backend.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/patterns-page
```

### Copy/Paste Codex Prompt

```txt
Goal:
Build the /patterns page using static data and local progress.

Context:
Local progress tracking exists. Questions can already be filtered.

Branch:
feat/patterns-page

Files allowed:
src/app/patterns/**, src/app/questions/** only for reading pattern query params if needed, src/components/**, src/lib/**, and src/hooks/**.

Files not allowed:
Root Swati export files, backend/auth/database files, .github/**, package.json unless clearly justified.

Constraints:
Show all 94 patterns. Each pattern card shows section/category, solved count, total count, and progress bar. Clicking a pattern navigates to /questions filtered to that pattern. Do not add charts or backend.

Done criteria:
/patterns lists all patterns, each card shows progress, clicking a pattern takes the user to relevant questions, and npm run lint/build pass.

Stop conditions:
Stop if pattern counts do not match the dataset, URL filtering conflicts with existing question filters, or the implementation requires backend state.
```

### Done Criteria

- `/patterns` lists all patterns.
- Each card shows solved count and total count.
- Each card shows a progress bar.
- Clicking a pattern navigates to relevant questions.
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
feat(patterns): add pattern progress page
```

### What I Should Learn

- Grouping data.
- Aggregating progress.
- URL query params.
- Card layouts for repeated items.

### Stop Conditions

Stop and report if pattern totals do not reconcile with the dataset or the query-param behavior is ambiguous.

## PR C: Dashboard

### Goal

Make `/` a useful prep dashboard.

### Context

Static data and local progress exist. The dashboard should summarize current progress.

### Branch Name

```bash
feat/dashboard
```

### Files Allowed To Change

- `src/app/page.tsx`
- `src/components/**`
- `src/lib/**`
- `src/hooks/**`

### Files Not Allowed To Change

- Root Swati export files.
- Backend/auth/database files.
- `.github/**`
- `package.json` unless clearly justified.

### Constraints

- Show total questions.
- Show solved count.
- Show attempted count.
- Show need-review count.
- Show progress percentage.
- Show weakest or most incomplete sections.
- No heavy charts yet.
- No backend.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/dashboard
```

### Copy/Paste Codex Prompt

```txt
Goal:
Build the home dashboard using static data and local progress.

Context:
Static data, questions table, filters, local progress, and patterns page already exist.

Branch:
feat/dashboard

Files allowed:
src/app/page.tsx, src/components/**, src/lib/**, and src/hooks/**.

Files not allowed:
Root Swati export files, backend/auth/database files, .github/**, package.json unless clearly justified.

Constraints:
Show total questions, solved count, attempted count, need-review count, progress percentage, and weakest or most incomplete sections. No heavy charts, backend, auth, or database.

Done criteria:
/ shows useful summary metrics from static data plus local progress. npm run lint and npm run build pass.

Stop conditions:
Stop if dashboard metrics require changing progress storage shape without explanation, or if the task drifts into charts/stats/full-stack work.
```

### Done Criteria

- `/` shows total questions.
- `/` shows solved count.
- `/` shows attempted count.
- `/` shows need-review count.
- `/` shows progress percentage.
- `/` shows weak or incomplete sections.
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
feat(dashboard): add progress overview
```

### What I Should Learn

- Dashboard metrics.
- Derived statistics.
- Reusable stat cards.
- Turning raw progress into product signals.

### Stop Conditions

Stop and report if metrics cannot be derived from existing data or if adding charts becomes necessary.
