# Review, Polish, And Production

This file covers three separate PRs. Do not start review until local progress exists.

## PR A: Review Page

### Goal

Show questions that deserve review next.

### Context

Static questions and local progress exist.

### Branch Name

```bash
feat/review-page
```

### Files Allowed To Change

- `src/app/review/**`
- `src/components/**`
- `src/lib/**`
- `src/hooks/**`
- `src/types/**`

### Files Not Allowed To Change

- Root Swati export files.
- Backend/auth/database files.
- `.github/**`
- `package.json` unless clearly justified.

### Constraints

- Show questions with `need-review`.
- Show questions with `attempted`.
- Show questions with low confidence if confidence exists.
- Provide an empty state when nothing needs review.
- Let user update status from the review page.
- LeetCode links must work and open official URLs.
- Do not add complex spaced repetition yet.
- Do not add backend.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/review-page
```

### Copy/Paste Codex Prompt

```txt
Goal:
Build the /review page using localStorage progress.

Context:
Static questions, search/filter table, and local progress tracking already exist.

Branch:
feat/review-page

Files allowed:
src/app/review/**, src/components/**, src/lib/**, src/hooks/**, and src/types/**.

Files not allowed:
Root Swati export files, backend/auth/database files, .github/**, package.json unless clearly justified.

Constraints:
Show questions marked need-review, attempted, or low confidence if confidence exists. Add an empty state when no review items exist. User can update status from the review page. Each item links to the official LeetCode URL. Do not add complex spaced repetition or backend.

Done criteria:
/review shows relevant questions, empty state works, user can update status, LeetCode links work, and npm run lint/build pass.

Stop conditions:
Stop if review logic requires backend state, if confidence does not exist and would require a broad progress model migration, or if official links cannot be validated.
```

### Done Criteria

- `/review` shows relevant review questions.
- Empty state appears when no items match.
- User can update status.
- Official LeetCode links work.
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
feat(review): add review queue
```

### What I Should Learn

- Reusing hooks across pages.
- Empty states.
- Filtering by user progress.
- Review workflow design.

### Stop Conditions

Stop and report if review behavior cannot be derived from existing progress data or if the task turns into spaced repetition.

## PR B: UI Polish

### Goal

Improve visual hierarchy, spacing, responsive layout, empty states, and badges.

### Context

Core frontend MVP pages exist. This PR changes presentation, not behavior.

### Branch Name

```bash
style/ui-polish
```

### Files Allowed To Change

- `src/app/**`
- `src/components/**`
- `src/lib/**` only for display helpers
- `src/app/globals.css`

### Files Not Allowed To Change

- Static data source files.
- Progress storage schema unless a bug fix is required.
- Backend/auth/database files.
- `.github/**`
- `package.json` unless clearly justified.

### Constraints

- Do not change core behavior.
- Do not change data model.
- Do not add backend.
- Improve spacing, hierarchy, responsive layout, badges, and empty states.
- Prefer existing UI patterns.
- Use shadcn/ui only if already installed or if adding it is explicitly justified.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b style/ui-polish
```

### Copy/Paste Codex Prompt

```txt
Goal:
Polish the UI of the LeetCode Pattern Tracker without changing behavior.

Context:
Core pages and local progress already work.

Branch:
style/ui-polish

Files allowed:
src/app/**, src/components/**, src/lib/** only for display helpers, and src/app/globals.css.

Files not allowed:
Static data source files, progress storage schema unless fixing a bug, backend/auth/database files, .github/**, package.json unless clearly justified.

Constraints:
Do not change core behavior or data model. Improve visual hierarchy, spacing, responsiveness, empty states, status badges, difficulty badges, and consistency. Do not add backend.

Done criteria:
Main pages look consistent, mobile layout is acceptable, badges are readable, empty states are clear, and npm run lint/build pass.

Stop conditions:
Stop if a visual change requires behavior changes, a new dependency is unclear, or the data model would need to change.
```

### Done Criteria

- Main pages look consistent.
- Mobile layout is acceptable.
- Status and difficulty badges are readable.
- Empty states are clear.
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
style: polish tracker ui
```

### What I Should Learn

- Visual hierarchy.
- Responsive layout.
- Reusable UI primitives.
- How polish differs from behavior changes.

### Stop Conditions

Stop and report if polish requires changing product behavior, adding unexplained dependencies, or touching protected data.

## PR C: Production Readiness

### Goal

Prepare the app for a clean Vercel production presentation.

### Context

Frontend MVP exists and has been polished.

### Branch Name

```bash
chore/production-readiness
```

### Files Allowed To Change

- `src/app/layout.tsx`
- `src/app/icon.*` or favicon assets if needed
- `README.md`
- Vercel-related docs only if needed

### Files Not Allowed To Change

- Core feature behavior.
- Static Swati data files.
- Progress storage.
- Backend/auth/database files.
- `.github/workflows/**` unless CI is broken and this task explicitly expands.

### Constraints

- Add clear metadata title and description.
- Add README setup instructions.
- Add deployment URL placeholder if the final URL is not known.
- Confirm production build.
- Do not add new product features.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b chore/production-readiness
```

### Copy/Paste Codex Prompt

```txt
Goal:
Prepare the LeetCode Pattern Tracker for Vercel production deployment.

Context:
Frontend MVP and polish are complete.

Branch:
chore/production-readiness

Files allowed:
src/app/layout.tsx, src/app/icon.* or favicon assets if needed, README.md, and Vercel-related docs only if needed.

Files not allowed:
Core feature behavior, static Swati data files, progress storage, backend/auth/database files, .github/workflows/** unless CI is broken and this task explicitly expands.

Constraints:
Add clear metadata title and description. Update README setup instructions and deployment URL placeholder if needed. Confirm npm run build. Do not add features.

Done criteria:
App has clear title/description, README has local setup and deployment placeholder, and npm run build passes.

Stop conditions:
Stop if production readiness requires behavior changes, environment secrets, backend setup, or unclear deployment decisions.
```

### Done Criteria

- App has a clear title and description.
- README includes local setup.
- README includes deployment link or placeholder.
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
chore: prepare production deployment
```

### What I Should Learn

- Production metadata.
- Deployment hygiene.
- README setup documentation.
- How Vercel production readiness differs from feature work.

### Stop Conditions

Stop and report if secrets, backend services, or Vercel account actions are required.
