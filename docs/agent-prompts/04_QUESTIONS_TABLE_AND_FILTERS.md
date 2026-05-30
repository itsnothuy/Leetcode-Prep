# Questions Table And Filters

This file covers two separate PRs. Build the static table before adding filters.

## PR A: Questions Table

### Goal

Render all questions from the typed static Swati data on `/questions`.

### Context

The app shell and typed data modules should already exist.

### Branch Name

```bash
feat/questions-table
```

### Files Allowed To Change

- `src/app/questions/**`
- `src/components/**`
- `src/lib/**` only for display helpers
- `src/types/**` only for small type refinements

### Files Not Allowed To Change

- Root Swati export files.
- `.github/**`
- `package.json`
- `package-lock.json`
- Progress hooks or localStorage modules.

### Constraints

- Show problem number, title, pattern, section/category, and difficulty if available.
- Every question title must link to the official LeetCode URL.
- External links must use `target="_blank"` and `rel="noopener noreferrer"`.
- Do not add progress tracking yet.
- Do not add backend/auth/database.
- Do not add charts.
- Keep desktop readable and mobile acceptable.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/questions-table
```

### Copy/Paste Codex Prompt

```txt
Goal:
Build the /questions page using the typed static Swati data.

Context:
App shell and src/data typed imports already exist. This PR renders the static table only.

Branch:
feat/questions-table

Files allowed:
src/app/questions/**, src/components/**, src/lib/** only for display helpers, and src/types/** only for small type refinements.

Files not allowed:
Root Swati export files, .github/**, package.json, package-lock.json, progress hooks, and localStorage modules.

Constraints:
Show problem number, title, pattern, section/category, and difficulty if available. Every question title must link to the official LeetCode URL with target="_blank" and rel="noopener noreferrer". Do not add progress tracking, backend, auth, database, charts, search, filters, or sorting.

Done criteria:
/questions shows all questions. Every title opens the official LeetCode URL in a new tab. npm run lint and npm run build pass.

Stop conditions:
Stop if typed data is missing, URLs are missing or appear unofficial, or implementing the table would require guessing links.
```

### Done Criteria

- `/questions` shows all questions.
- Each row includes title, pattern, section/category, and LeetCode link.
- Links are official and open in a new tab.
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
feat(questions): add static questions table
```

### What I Should Learn

- Rendering lists from typed data.
- Table semantics and responsive layout.
- External link safety.
- Reusable row and cell components.

### Stop Conditions

Stop and report if official URLs cannot be preserved, the data shape is unclear, or npm checks fail unexpectedly.

## PR B: Question Filters

### Goal

Make `/questions` usable with client-side search, filters, and sorting.

### Context

The static questions table is already working.

### Branch Name

```bash
feat/question-filters
```

### Files Allowed To Change

- `src/app/questions/**`
- `src/components/**`
- `src/lib/**`
- `src/types/**` only for UI state types

### Files Not Allowed To Change

- Root Swati export files.
- Progress/localStorage files.
- Backend/auth files.
- `.github/**`
- `package.json` unless a dependency is explicitly justified.

### Constraints

- Client-side filtering only.
- Search by title.
- Filter by section/category.
- Filter by pattern.
- Filter by difficulty if available.
- Add clear filters.
- Add sorting by number/title/pattern if practical.
- Use URL query params only if it clearly improves shareability or pattern-page navigation.
- Do not add backend/progress.
- Avoid TanStack Table unless table complexity justifies it and the dependency reason is explained.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/question-filters
```

### Copy/Paste Codex Prompt

```txt
Goal:
Add search, filtering, and sorting to the /questions table.

Context:
The static /questions table already renders all typed Swati questions.

Branch:
feat/question-filters

Files allowed:
src/app/questions/**, src/components/**, src/lib/**, and src/types/** only for UI state types.

Files not allowed:
Root Swati export files, progress/localStorage files, backend/auth files, .github/**, package.json unless a dependency is explicitly justified.

Constraints:
Use client-side filtering only. Search by problem title. Filter by section/category and pattern. Filter by difficulty if available. Add clear filters. Add sorting by number/title/pattern if practical. Use URL query params only if justified. Do not add backend or progress tracking.

Done criteria:
User can search by title, filter by section/category, filter by pattern, clear filters, and sort if implemented. npm run lint and npm run build pass.

Stop conditions:
Stop if a new dependency seems necessary but the reason is unclear, if filter behavior requires backend state, or if official links are affected.
```

### Done Criteria

- User can search by problem title.
- User can filter by section/category.
- User can filter by pattern.
- User can clear filters.
- Sorting works if implemented.
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
feat(questions): add search and filters
```

### What I Should Learn

- Controlled inputs.
- Derived state.
- Client-side filtering.
- Sorting UI tradeoffs.

### Stop Conditions

Stop and report if filters require changing static data, adding unjustified dependencies, or widening into progress tracking.
