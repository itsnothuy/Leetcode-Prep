# App Shell And Data Model

This file covers two separate PRs. Complete app shell before organizing data.

## PR A: App Shell

### Goal

Create the base application layout, routes, and navigation placeholders.

### Context

Scaffold and CI should be merged before this starts. This PR creates structure but no real product data UI.

### Branch Name

```bash
feat/app-shell
```

### Files Allowed To Change

- `src/app/**`
- `src/components/**`
- `src/lib/**` only if needed for simple shared helpers

### Files Not Allowed To Change

- `swati_*`
- `src/data/**`
- `.github/**`
- `package.json`
- `package-lock.json`

### Constraints

- Add routes for `/`, `/questions`, `/patterns`, `/review`, and `/stats`.
- Add small reusable layout/navigation components.
- Placeholder pages only.
- Do not implement real table, filters, localStorage, dashboard metrics, charts, or backend.
- Keep the UI practical for a study tracker, not a marketing page.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/app-shell
```

### Copy/Paste Codex Prompt

```txt
Goal:
Build the app shell and navigation for the LeetCode Pattern Tracker.

Context:
Scaffold and CI are merged. This PR should create only routes, layout, navigation, and placeholder page content.

Branch:
feat/app-shell

Files allowed:
src/app/**, src/components/**, and src/lib/** only for small shared helpers.

Files not allowed:
swati_*, src/data/**, .github/**, package.json, package-lock.json.

Constraints:
Add routes for /, /questions, /patterns, /review, and /stats. Add shared navigation components. Do not implement real data table, filters, localStorage, charts, backend, auth, or data migration.

Done criteria:
All five routes render. Navigation works between routes. Components are small and readable. npm run lint and npm run build pass.

Stop conditions:
Stop if scaffold or CI is missing, if the branch is not feat/app-shell, or if implementing placeholders appears to require changing data files or adding dependencies.
```

### Done Criteria

- `/` renders a dashboard placeholder.
- `/questions` renders a questions placeholder.
- `/patterns` renders a patterns placeholder.
- `/review` renders a review placeholder.
- `/stats` renders a stats placeholder.
- Navigation works.
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
feat(app): add app shell and navigation
```

### What I Should Learn

- App Router route folders.
- Shared layout composition.
- Navigation with Next.js links.
- How to separate shell from feature logic.

### Stop Conditions

Stop and report if the repo is dirty, the branch is wrong, npm checks fail unexpectedly, or the task starts requiring real data/progress behavior.

## PR B: Organize Data

### Goal

Expose Swati data through typed frontend modules without changing the original exports.

### Context

The app shell exists. This PR prepares data for UI consumption but does not build UI.

### Branch Name

```bash
chore/organize-data
```

### Files Allowed To Change

- `src/data/**`
- `src/types/**`
- `src/lib/problem-utils.ts`
- `tsconfig.json` only if import configuration must be fixed

### Files Not Allowed To Change

- `swati_leetcode_patterns_questions.csv`
- `swati_leetcode_patterns_questions.json`
- `swati_leetcode_patterns_questions.md`
- `swati_patterns_data.ts`
- UI pages except minimal import smoke checks
- `.github/**`

### Constraints

- Do not change problem titles.
- Do not change official LeetCode URLs.
- Do not remove original export files.
- Keep static problem data separate from future user progress.
- Add types for `Pattern` and `Problem`.
- Add small utility functions only if they clarify grouping or flattening.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b chore/organize-data
```

### Copy/Paste Codex Prompt

```txt
Goal:
Organize the Swati data into frontend-friendly TypeScript modules.

Context:
The app shell exists. Original Swati exports live at repo root and must remain unchanged.

Branch:
chore/organize-data

Files allowed:
src/data/**, src/types/**, src/lib/problem-utils.ts, and tsconfig.json only if needed for imports.

Files not allowed:
swati_leetcode_patterns_questions.csv, swati_leetcode_patterns_questions.json, swati_leetcode_patterns_questions.md, swati_patterns_data.ts, .github/**, and UI pages except minimal import smoke checks.

Constraints:
Do not change problem titles or official LeetCode URLs. Do not remove original export files. Keep static data separate from future user progress. Create Pattern and Problem types. Add small utilities only if useful.

Done criteria:
The app can import typed Swati data from src/data. Pattern and Problem types exist. npm run lint and npm run build pass.

Stop conditions:
Stop if source data files are missing, official URLs would need to be guessed, or organizing data appears to require changing the original exports.
```

### Done Criteria

- Typed Swati data is importable from `src/data`.
- `Pattern` and `Problem` types exist.
- Utility functions are small and tested by build/typecheck.
- `npm run lint` passes.
- `npm run build` passes.

### Manual Verification Commands

```bash
git status
git diff
npm run lint
npm run build
```

### Commit Message

```bash
chore(data): organize swati data
```

### What I Should Learn

- TypeScript data modeling.
- Static imports in a Next.js app.
- Why raw data and UI-ready data can be separate.
- Why static dataset and user progress must remain separate.

### Stop Conditions

Stop and report if data files are missing, type modeling would require silently changing the data model, or lint/build fails in a non-obvious way.
