# Portfolio Polish

Use this after the app is useful and deployed.

## PR: Portfolio Presentation

### Goal

Make the project clear and impressive for a SWE portfolio.

### Context

The frontend MVP is deployed, core workflows work, and production readiness is complete.

### Branch Name

```bash
docs/portfolio-polish
```

### Files Allowed To Change

- `README.md`
- `docs/**`
- Screenshot assets under an agreed docs or public folder
- `src/app/**` only if metadata or screenshot readiness needs a tiny fix

### Files Not Allowed To Change

- Swati data files.
- Progress storage logic.
- Product behavior.
- Backend/auth/database files unless the app already has full-stack features.
- `.github/workflows/**`

### Constraints

- Keep claims honest.
- Include demo link.
- Include screenshots.
- Include features.
- Include tech stack.
- Include data source.
- Include local setup.
- Include architecture.
- Include roadmap.
- Include what was learned.
- Include future improvements and known limitations.
- Do not add new product features.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b docs/portfolio-polish
```

### Copy/Paste Codex Prompt

```txt
Goal:
Polish the LeetCode Pattern Tracker README and portfolio documentation.

Context:
The frontend MVP is useful and deployed. This is documentation/presentation work only.

Branch:
docs/portfolio-polish

Files allowed:
README.md, docs/**, screenshot assets under an agreed docs or public folder, and src/app/** only for tiny metadata or screenshot readiness fixes.

Files not allowed:
Swati data files, progress storage logic, product behavior, backend/auth/database files unless already part of the app, and .github/workflows/**.

Constraints:
Keep claims honest. Include demo link, screenshots, features, tech stack, data source, local setup, architecture, roadmap, what I learned, future improvements, and known limitations. Do not add features.

Done criteria:
README is portfolio-ready, screenshots are referenced, setup instructions work, and npm run lint/build pass if package.json exists.

Stop conditions:
Stop if screenshots are unavailable, the deployed URL is unknown, or documentation would require claiming unfinished features.
```

### Recommended README Sections

```md
# LeetCode Pattern Tracker

## Demo
## Features
## Tech Stack
## Screenshots
## Data Source
## Local Setup
## Architecture
## Roadmap
## What I Learned
## Limitations
## Future Improvements
```

### Done Criteria

- README tells the project story clearly.
- Demo link is included or marked as pending.
- Screenshots are included.
- Architecture is understandable.
- Limitations are honest.
- `npm run lint` passes if package scripts exist.
- `npm run build` passes if package scripts exist.

### Manual Verification Commands

```bash
git status
git diff
npm run lint
npm run build
```

### Commit Message

```bash
docs: polish portfolio readme
```

### What I Should Learn

- Communicating engineering work.
- Product storytelling.
- Honest scope framing.
- How screenshots and architecture notes improve portfolio projects.

### Stop Conditions

Stop and report if the app is not deployed, screenshots cannot be captured, or the README would need to describe unfinished features as complete.
