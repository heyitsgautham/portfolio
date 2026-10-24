# Changelog

All notable changes to this project are listed here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [2.1.0] - 2026-10-25

No visible change to the site.
This release adds tests, CI and docs around the existing code.

### Added

- Vitest suite with React Testing Library, run by `pnpm test`, with coverage thresholds under `pnpm test:coverage`.
- Tests for the `cn`, URL, string and clipboard helpers, the MDX plugins, the content loader, the client hooks, the contribution graph, the contact form, the GitHub contributions fetcher, and the project data.
- GitHub Actions CI that runs lint, the format check, the typecheck, tests with coverage, the production build, `pnpm audit` and a gitleaks secret scan.
- Dependabot updates for npm packages and GitHub Actions.
- `.env.example`, a Dockerfile and `docker-compose.yml`, CONTRIBUTING.md and a rewritten README.
- Zod validation of `APP_URL` and `REGISTRY_URL` in `src/config/env.ts`.

### Changed

- Project data moved from one 891-line `projects.ts` into one module per project under `src/features/profile/data/projects/`.
- The contribution graph's date helpers moved into `contribution-graph-utils.ts`.
- `scripts/apply-project-colors.mjs` reads the per-project files.

### Security

- Upgraded `next` from 15.5.12 to 15.5.28, which clears three critical and several high advisories.

## [2.0.3] and earlier

Earlier versions were not tagged.
See the git history before this release.

[2.1.0]: https://github.com/heyitsgautham/portfolio/releases/tag/v2.1.0
