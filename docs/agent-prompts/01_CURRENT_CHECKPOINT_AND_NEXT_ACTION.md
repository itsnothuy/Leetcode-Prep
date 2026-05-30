# Current Checkpoint And Next Action

Open this file at the start of every new Codex session.

## First Inspect The Repo

Run these commands from the repo root:

```bash
git status --short --branch
git branch --show-current
git log --oneline --decorate -5
ls
find . -maxdepth 3 -type f | sort | sed 's#^\./##'
test -f package.json && echo "package.json exists" || echo "package.json missing"
test -d docs/agent-prompts && echo "docs/agent-prompts exists" || echo "docs/agent-prompts missing"
test -d src/app && echo "src/app exists" || echo "src/app missing"
```

## Actual Checkpoint Recorded On This Docs Slice

- Local `main` was stale before this docs task.
- `origin/main` contains scaffold merge commit `7eeab79`.
- Scaffold is merged upstream.
- After pulling `origin/main`, `package.json` and `src/app` exist.
- The current actual next implementation slice is `chore/add-ci`.

## Decision Tree

If `package.json` or `src/app` is missing:

- You are probably on stale local `main`.
- Run `git checkout main` and `git pull origin main`.
- Re-check status before doing anything else.

If scaffold is not merged:

- Finish `chore/scaffold-next-app` first.
- Do not add CI or product features.

If scaffold is merged and CI is missing:

- Start `chore/add-ci`.
- Add only `.github/workflows/ci.yml`.

If scaffold and CI are both merged:

- Start `feat/app-shell`.

## Do Not Start Yet

Do not build these until their prerequisite prompts are complete:

- Product navigation before scaffold and CI.
- Data model before app shell.
- Questions table before typed data.
- Filters before the static table.
- `localStorage` progress before table/filter basics.
- Patterns/dashboard/review before progress exists.
- Notes/stats/full-stack before the frontend MVP is useful.

## Stop Conditions

Stop and report if:

- The repo is dirty before starting.
- The current branch is not the expected branch.
- `package.json` is missing after pulling scaffold.
- `src/app` is missing after pulling scaffold.
- Swati data files are missing.
- The requested next task conflicts with the build order above.
