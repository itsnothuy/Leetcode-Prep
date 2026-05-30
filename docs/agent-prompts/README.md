# Agent Prompts

This folder contains reusable Markdown prompts for future Codex sessions on the LeetCode Pattern Tracker.

These files are not product code. They are operating instructions that keep each branch small, reviewable, and aligned with the learning roadmap.

## Open This First

Start every new session with:

```txt
docs/agent-prompts/01_CURRENT_CHECKPOINT_AND_NEXT_ACTION.md
```

That file tells the future agent how to inspect the repo and decide the next valid slice.

## How To Use These Files

1. Open `01_CURRENT_CHECKPOINT_AND_NEXT_ACTION.md`.
2. Confirm the actual repo state.
3. Choose the next unfinished phase in order.
4. Open the matching phase file.
5. Copy only one PR prompt into Codex.
6. Review the diff.
7. Run `npm run lint` and `npm run build`.
8. Commit and open a PR.

## Planning Prompts Vs Implementation Prompts

Use a planning prompt when:

- The repo state is unclear.
- The next task has tradeoffs.
- A dependency might be needed.
- A data model change is being considered.

Use an implementation prompt when:

- The branch is clear.
- The allowed files are clear.
- Done criteria are clear.
- The task is one PR only.

## How To Keep Codex Constrained

Every implementation prompt should include:

- Goal.
- Context.
- Branch name.
- Files allowed to change.
- Files not allowed to change.
- Constraints.
- Done criteria.
- Manual verification commands.
- Commit message.
- What to learn.
- Stop conditions.

If a future prompt does not include these, improve the prompt before implementation.

## Current Roadmap Files

| File | Use |
| --- | --- |
| `00_MASTER_ROADMAP.md` | Overall product vision, stack, workflow, and phase order |
| `01_CURRENT_CHECKPOINT_AND_NEXT_ACTION.md` | First file to open each session |
| `02_FINISH_SCAFFOLD_AND_ADD_CI.md` | Scaffold verification and CI |
| `03_APP_SHELL_AND_DATA_MODEL.md` | Routes/navigation and typed data |
| `04_QUESTIONS_TABLE_AND_FILTERS.md` | Static table, search, filters, sorting |
| `05_LOCAL_PROGRESS_PATTERNS_DASHBOARD.md` | `localStorage`, patterns, dashboard |
| `06_REVIEW_POLISH_PRODUCTION.md` | Review queue, polish, production readiness |
| `07_OPTIONAL_NOTES_STATS_FULLSTACK.md` | Optional notes, stats, Supabase/auth/database |
| `08_PORTFOLIO_POLISH.md` | Final README and portfolio presentation |

## Updating These Prompts

Update prompt files when:

- A phase is completed and the next action changes.
- A design decision becomes settled.
- A new constraint is added to `AGENTS.md`.
- A file path or data model changes.
- A prompt caused scope creep and needs tighter boundaries.

Keep updates docs-only unless the branch explicitly says otherwise.

## Non-Negotiables

- Do not skip the build order.
- Do not modify Swati data unless the task explicitly requires it.
- Do not add backend/auth/database before the frontend MVP is useful.
- Do not guess official LeetCode URLs.
- Do not add dependencies without a clear reason.
- Do not end a feature task until `npm run lint` and `npm run build` pass.
