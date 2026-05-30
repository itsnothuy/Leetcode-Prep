# LeetCode Pattern Tracker

A frontend-first tracker for Swati's LeetCode pattern sheet.

The goal is to help users study coding interview problems by pattern, track progress locally first, and later evolve into a deployed dashboard with optional auth and persistence.

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

## Planned Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Table
- Vercel deployment

## MVP Scope

The first useful version should stay small:

- Home dashboard shell
- Questions page
- Search questions
- Filter by pattern
- Click question title to open the official LeetCode URL
- Save progress in `localStorage`

Do not start with Supabase, auth, accounts, charts, or a spaced repetition system. Those come after the frontend MVP works.

## Suggested Build Sequence

1. Scaffold the Next.js app with TypeScript and Tailwind.
2. Move `swati_patterns_data.ts` into `src/data/`.
3. Render a readonly `/questions` table from the static data.
4. Add search and pattern filters.
5. Add local progress tracking with `localStorage`.
6. Add dashboard cards and basic progress stats.
7. Add review queue logic.
8. Deploy with Vercel.

## Local Development

The app has not been scaffolded yet. After scaffolding, document the actual commands here, likely:

```bash
npm install
npm run dev
npm run lint
npm run build
```

