# AGENTS.md

## Project

This is a LeetCode pattern tracker for Swati's LeetCode pattern sheet.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Table
- Vercel deployment

## Product Goal

Help users track LeetCode questions grouped by coding pattern.
Every question title must link to the official LeetCode problem URL.

## MVP Rules

- Build frontend-first.
- Use static local data first.
- Store progress in `localStorage` first.
- Do not add Supabase, auth, Prisma, or a backend until the frontend MVP is complete.
- Keep components small and reusable.
- Prefer readable code over clever abstractions.
- Do not add new dependencies without explaining why.

## Pages

- `/` dashboard
- `/questions` searchable/filterable problem table
- `/patterns` grouped pattern overview
- `/review` later, only after basic tracking works

## Data Model

- Use `swati_patterns_data.ts` as the initial static data source.
- Preserve official LeetCode URLs.
- Do not create fake LeetCode links.
- Do not silently change the data model without explaining why.

## Quality Checks

Before finishing any task in the scaffolded app, run:

```bash
npm run lint
npm run build
```

Fix TypeScript, lint, and build errors before stopping.

If the Next.js app has not been scaffolded yet, do not add CI that depends on `package.json`.

## Learning Mode

After every task, explain:

1. What files changed
2. Why the change was made
3. What frontend concept to learn from it
4. What to review before the next task

## Git Workflow

- Keep `main` stable.
- Use one branch per task.
- Prefer small, reviewable pull requests.
- Use Conventional Commits, for example `feat(questions): add searchable table`.
- Do not rewrite the whole app in one task.
- Do not commit generated or local environment files.

## Do Not Do

- Do not build the full app in one pass.
- Do not add unnecessary dependencies.
- Do not add backend/database/auth before the frontend MVP.
- Do not modify the Swati data files unless the task explicitly requires it.

