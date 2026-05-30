# Master Roadmap

Use this file to orient every future Codex session for the LeetCode Pattern Tracker. Build one small PR at a time. Do not skip ahead.

## Product Vision

Build a frontend-first LeetCode prep tracker for Swati's LeetCode pattern sheet.

The useful MVP lets a user:

- Browse every Swati question.
- Search, filter, and sort questions.
- Open the official LeetCode problem URL from the question title.
- Track status locally as `Not Started`, `Attempted`, `Solved`, `Need Review`, or `Skipped`.
- Browse progress by pattern.
- Review weak, attempted, or review-needed questions.

## Known Dataset

- `94` patterns.
- `438` pattern-question entries.
- `413` unique LeetCode questions.
- Source files are committed at repo root:
  - `swati_leetcode_patterns_questions.csv`
  - `swati_leetcode_patterns_questions.json`
  - `swati_leetcode_patterns_questions.md`
  - `swati_patterns_data.ts`

Preserve official LeetCode URLs. Do not guess, regenerate, or fake links.

## Stack

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui later if useful.
- TanStack Table later if table complexity justifies it.
- Static Swati data first.
- `localStorage` progress first.
- Vercel deployment.
- Supabase/auth/database only after the frontend MVP is genuinely useful.

## Phase Table

| Phase | Branch | Purpose | Status |
| --- | --- | --- | --- |
| 0 | `main` | Preflight repo docs and Swati data | Done |
| 1 | `chore/scaffold-next-app` | Scaffold Next.js app | Merged on `origin/main` |
| 2 | `chore/add-ci` | Add GitHub Actions lint/build CI | Next |
| 3 | Vercel dashboard | Connect Vercel previews and production | After CI |
| 4 | `feat/app-shell` | Add routes and navigation placeholders | Planned |
| 5 | `chore/organize-data` | Move typed static data into `src/data` | Planned |
| 6 | `feat/questions-table` | Render static questions table | Planned |
| 7 | `feat/question-filters` | Add search, filters, and sorting | Planned |
| 8 | `feat/local-progress` | Add `localStorage` progress tracking | Planned |
| 9 | `feat/patterns-page` | Add pattern overview and progress | Planned |
| 10 | `feat/dashboard` | Build useful home dashboard | Planned |
| 11 | `feat/review-page` | Build review queue | Planned |
| 12 | `style/ui-polish` | Improve visual quality and responsive layout | Planned |
| 13 | `chore/production-readiness` | Metadata, README setup, deployment polish | Planned |
| 14 | `feat/problem-notes` | Optional local problem notes | Optional |
| 15 | `feat/stats-page` | Optional stats and charts | Optional |
| 16 | Multiple PRs | Optional Supabase/auth/database migration | Optional |
| 17 | `docs/portfolio-polish` | Portfolio README and screenshots | Planned |

## Git Workflow

Default branch loop:

```bash
git checkout main
git pull origin main
git checkout -b <branch-name>
```

After one focused slice:

```bash
git status
git diff
npm run lint
npm run build
npm run dev
git add -p
git commit -m "<type(scope): short description>"
git push -u origin <branch-name>
```

Then open a PR, review, verify GitHub CI, verify Vercel preview after Vercel is connected, merge, and return to `main`.

## Rules For Future Codex Sessions

- Keep `main` stable.
- Use one branch per slice.
- Build one PR only per prompt.
- Do not work directly on `main` after setup.
- Do not add CI before `package.json` exists.
- Do not add Supabase, auth, Prisma, database, or backend code before the frontend MVP works.
- Do not add notes, stats, dashboard, or review features before the foundational table and local progress slices exist.
- Keep static Swati data separate from user progress data.
- Do not modify Swati export files unless the task explicitly requires it.
- Do not add dependencies unless the prompt asks for them or the reason is clear and explained.

## Common Stop Conditions

Stop and report instead of guessing if:

- The repo is dirty before starting.
- The branch is not the expected branch.
- Required data files are missing.
- `package.json` is missing for a task that requires npm scripts.
- `npm run lint` or `npm run build` fails and the fix is not obvious.
- The task appears to require backend/auth/database before the frontend MVP is done.
- A dependency needs to be added but the reason is unclear.
- Official LeetCode URLs would need to be guessed or regenerated without validation.
