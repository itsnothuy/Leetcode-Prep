# LeetCode Pattern Tracker

A frontend-first tracker for Swati's LeetCode pattern sheet.

The app helps users browse LeetCode questions by coding pattern, open the
official problem links, track local progress, and review questions that need
another pass.

## Demo

Production URL: _Add the Vercel deployment URL after production deploy._

## Features

- Dashboard summary for total, solved, attempted, and need-review questions.
- Searchable and filterable questions table.
- Official LeetCode links for every problem title.
- Local progress tracking with `localStorage`.
- Pattern overview with solved and total counts.
- Review queue for attempted, need-review, and low-confidence questions.

## Current Data

This repo currently includes the extracted Swati pattern dataset:

- `swati_patterns_data.ts` - TypeScript data source for a future Next.js/React app
- `swati_leetcode_patterns_questions.json` - JSON data export
- `swati_leetcode_patterns_questions.csv` - CSV table export
- `swati_leetcode_patterns_questions.md` - Markdown list with LeetCode links

Dataset summary:

- 94 patterns
- 438 pattern-question entries
- 413 unique LeetCode questions

The app imports frontend-ready typed data from `src/data` while preserving the
original root export files.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- Vercel deployment

Future upgrades may add shadcn/ui, TanStack Table, Supabase auth, and cloud
sync, but the current MVP intentionally stays frontend-first.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run quality checks:

```bash
npm run lint
npm run build
```

Run the production build locally:

```bash
npm run build
npm run start
```

## Deployment

This project is designed for Vercel.

- Import the GitHub repository into Vercel.
- Use `main` as the production branch.
- Keep pull-request preview deployments enabled.
- No environment variables are required for the current static-data and
  `localStorage` MVP.
- Add the final production URL to the Demo section after deployment.

## Architecture

- `src/app` contains App Router routes.
- `src/components` contains reusable UI and feature components.
- `src/data` exposes typed Swati pattern and problem data.
- `src/hooks` contains client-side state hooks.
- `src/lib` contains display, progress, and data utilities.
- `src/types` contains shared TypeScript models.

Static Swati data and user progress are intentionally separate. The dataset is
imported from typed modules, while user progress is stored locally in the
browser.

## Suggested Build Sequence

Completed:

1. Scaffold the Next.js app with TypeScript and Tailwind.
2. Add GitHub Actions CI.
3. Add the app shell and navigation.
4. Organize Swati data into typed frontend modules.
5. Render the `/questions` table from static data.
6. Add search, filters, and sorting.
7. Add local progress tracking with `localStorage`.
8. Add pattern progress cards.
9. Add dashboard summary metrics.
10. Add the review queue.
11. Polish the UI.

Next:

1. Connect or confirm Vercel production deployment.
2. Add the production URL to this README.
3. Optionally add notes, stats, screenshots, or full-stack sync later.

Do not add Supabase, auth, accounts, charts, or a spaced repetition system until
the frontend MVP has been used enough to justify the extra complexity.
