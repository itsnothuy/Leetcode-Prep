# Finish Scaffold And Add CI

This file covers two separate PRs. Do not combine them.

## PR A: Finish Scaffold

### Goal

Finish or verify the Next.js scaffold only.

### Context

Scaffold was merged into `origin/main` at `7eeab79`. Use this PR only if a local checkout or future fork does not yet contain the scaffold.

### Branch Name

```bash
chore/scaffold-next-app
```

### Files Allowed To Change

- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `eslint.config.mjs`
- `next.config.ts`
- `postcss.config.mjs`
- `src/app/**`
- `.gitignore`

### Files Not Allowed To Change

- `README.md`
- `AGENTS.md`
- `.github/**`
- `swati_*`
- `docs/agent-prompts/**`

### Constraints

- Use Next.js App Router, TypeScript, Tailwind CSS, ESLint, `src` directory, and npm.
- Do not implement product features.
- Do not add localStorage, data modeling, auth, backend, charts, or CI.
- Preserve existing docs and Swati export files.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b chore/scaffold-next-app
npm run lint
npm run build
npm run dev
```

### Copy/Paste Codex Prompt

```txt
Goal:
Finish or verify the Next.js scaffold for the LeetCode Pattern Tracker.

Context:
This repo already has README.md, AGENTS.md, .gitignore, .github/pull_request_template.md, and Swati data exports. Scaffold may already exist depending on branch state.

Branch:
chore/scaffold-next-app

Files allowed:
package.json, package-lock.json, tsconfig.json, eslint.config.mjs, next.config.ts, postcss.config.mjs, src/app/**, .gitignore.

Files not allowed:
README.md, AGENTS.md, .github/**, swati_*, docs/agent-prompts/**.

Constraints:
Use Next.js App Router, TypeScript, Tailwind CSS, ESLint, src directory, and npm. Do not implement app shell navigation, questions table, localStorage, backend, auth, charts, or CI.

Done criteria:
package.json exists. package-lock.json exists. src/app exists. npm run lint passes. npm run build passes. Existing docs and data files are preserved.

Stop conditions:
Stop if the repo is dirty before starting, the branch is not chore/scaffold-next-app, package generation would overwrite existing docs/data, or lint/build fails for a reason that is not obvious.
```

### Done Criteria

- `package.json` exists.
- `package-lock.json` exists.
- `src/app` exists.
- `npm run lint` passes.
- `npm run build` passes.
- Existing docs and Swati data are preserved.

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
chore: scaffold next app
```

### What I Should Learn

- What `create-next-app` scaffolds.
- How App Router uses `src/app/layout.tsx` and `src/app/page.tsx`.
- Why build tooling must land before product features.

### Stop Conditions

Stop and report if scaffold files are missing after generation, docs/data would be overwritten, or lint/build fails unexpectedly.

## PR B: Add CI

### Goal

Add GitHub Actions CI that proves every PR still lints and builds.

### Context

Scaffold must already be merged. This PR adds workflow configuration only.

### Branch Name

```bash
chore/add-ci
```

### Files Allowed To Change

- `.github/workflows/ci.yml`

### Files Not Allowed To Change

- `src/**`
- `package.json`
- `package-lock.json`
- `swati_*`
- `docs/agent-prompts/**`
- `README.md`

### Constraints

- Use Node 20.
- Use `npm ci`.
- Run `npm run lint`.
- Run `npm run build`.
- Trigger on `pull_request` and pushes to `main`.
- Do not modify app code.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b chore/add-ci
```

### Copy/Paste Codex Prompt

```txt
Goal:
Add GitHub Actions CI for the scaffolded Next.js project.

Context:
The Next.js scaffold is merged. package.json and package-lock.json exist.

Branch:
chore/add-ci

Files allowed:
.github/workflows/ci.yml only.

Files not allowed:
src/**, package.json, package-lock.json, swati_*, docs/agent-prompts/**, README.md.

Constraints:
Use Node 20. Use npm ci. Run npm run lint and npm run build. Trigger on pull_request and push to main. Do not modify app code.

Done criteria:
.github/workflows/ci.yml exists. The workflow runs lint and build. No app files changed.

Stop conditions:
Stop if package.json or package-lock.json is missing, if the branch is not chore/add-ci, or if CI would require changing app code.
```

### Done Criteria

- `.github/workflows/ci.yml` exists.
- Workflow runs on `pull_request`.
- Workflow runs on `push` to `main`.
- Workflow uses Node 20, `npm ci`, `npm run lint`, and `npm run build`.
- No app code is changed.

### Manual Verification Commands

```bash
git status
git diff -- .github/workflows/ci.yml
npm run lint
npm run build
```

### Commit Message

```bash
chore: add github actions ci
```

### What I Should Learn

- Why CI protects `main`.
- Why `npm ci` is preferred in CI.
- How PR checks support review discipline.

### Stop Conditions

Stop and report if scaffold is not merged, npm scripts are missing, or CI cannot be added without changing app code.
