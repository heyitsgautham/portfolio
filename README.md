<div align="center">

# gauthamkrishna.dev

**AI Engineer · SIH '25 Finalist · IIT Madras**

[Live Site](https://gauthamkrishna.dev)

[![CI](https://github.com/heyitsgautham/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/heyitsgautham/portfolio/actions/workflows/ci.yml)

</div>

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

This repo is the source of my personal site.
It is a Next.js 15 App Router app with React 19, Tailwind CSS v4 and shadcn/ui.
Besides the profile pages, it serves a shadcn component registry at `/r`, plain-text pages for LLMs such as `/llms.txt`, Open Graph images, and a vCard.

## Requirements

| Tool | Version |
|---|---|
| Node.js | 18 or newer, CI uses 22 |
| pnpm | 10, pinned by `packageManager` in `package.json` |

Run `corepack enable` once and Node picks up the pinned pnpm for you.

## Getting Started

```bash
git clone https://github.com/heyitsgautham/portfolio.git
cd portfolio
pnpm install
pnpm dev
```

The dev server listens on http://localhost:1408.
No env vars are needed to run it.

## Environment variables

Copy `.env.example` to `.env.local` to override a default.
Every variable is optional.
`src/config/env.ts` validates `APP_URL` and `REGISTRY_URL` with Zod, so a value that is not an absolute URL stops the build with an error naming the variable.

| Variable | Read by | Default |
|---|---|---|
| `APP_URL` | `src/config/site.ts`, through `src/config/env.ts`, for canonical URLs, Open Graph tags, the sitemap and robots.txt | `https://gauthamkrishna.dev` |
| `NEXT_PUBLIC_CONTACT_FORM_URL` | The contact form, which POSTs submissions to this Google Apps Script URL | unset, so the form shows "Contact form is not configured" |
| `REGISTRY_URL` | `pnpm registry:build`, which writes it into the registry JSON | `https://gauthamkrishna.dev/r` |
| `URL` | `pnpm capture`, the screenshot script | `http://localhost:1408` |

To make the contact form send mail, deploy `scripts/google-apps-script.js` as a Google Apps Script web app and put its URL in `NEXT_PUBLIC_CONTACT_FORM_URL`.
The setup steps are in the comment at the top of that file.
Next.js inlines `NEXT_PUBLIC_*` values at build time, so rebuild after changing it.

## Testing

```bash
pnpm test            # run the suite once
pnpm test:watch      # rerun on file changes
pnpm test:coverage   # run with a v8 coverage report in coverage/
```

The suite uses Vitest with jsdom and React Testing Library.
Tests sit next to the code they cover as `*.test.ts` or `*.test.tsx`.
`pnpm test:coverage` fails if coverage of the tested modules drops below the thresholds in `vitest.config.ts`.

## Checks

```bash
pnpm lint            # ESLint with the Next.js, TypeScript and import-sort rules
pnpm format:check    # Prettier, with the Tailwind class sorter
pnpm registry:build  # generates src/__registry__, which check-types imports
pnpm check-types     # tsc --noEmit
```

On a fresh clone, run `pnpm registry:build` once before `pnpm check-types`, or `tsc` cannot find `@/__registry__/index`.
A Husky pre-commit hook runs the lint script.

## Build

```bash
pnpm build   # builds the registry, then runs next build
pnpm start   # serves the production build on port 3000
```

`pnpm build` fetches Google Fonts and the GitHub contributions API.
If the contributions API fails, the homepage graph falls back to `src/features/profile/data/github-contributions.fallback.json`.

## Docker

```bash
docker compose up --build
```

The compose file builds the production image and serves it on http://localhost:3000.
Pass `APP_URL` or `NEXT_PUBLIC_CONTACT_FORM_URL` in the shell to bake them into the build.
To run the image without compose, use `docker build -t portfolio .` and then `docker run --rm -p 3000:3000 portfolio`.

## Architecture

```
src/
├── app/                    Next.js App Router routes
│   ├── (app)/              site pages: home, projects, tech stack, certificates, resume, component docs
│   ├── (llms)/             plain-text routes such as llms.txt and projects.md
│   ├── og/                 Open Graph image routes
│   ├── vcard/              downloadable contact card
│   └── sitemap.ts, robots.ts, manifest.ts
├── features/profile/       everything about me
│   ├── data/               content as typed TypeScript: projects, experience, education, awards
│   ├── types/              the types those data files satisfy
│   ├── lib/                builders that turn that data into the llms.txt markdown
│   └── components/         the sections that render that data
├── components/             shared site components, with shadcn/ui primitives in ui/
├── registry/               source of the components published through the shadcn registry
├── lib/                    MDX plugins, content loading, fonts, the logger, the cn() helper
├── hooks/                  client hooks such as useMediaQuery and useControllableState
├── config/                 site metadata, navigation, registry base URL
└── scripts/                build-registry.mts and capture.mts
packages/gk/                a small CLI that wraps `shadcn add` for this registry
scripts/                    one-off maintenance scripts and the Apps Script contact handler
```

Profile content lives in `src/features/profile/data/` as typed objects, not in a CMS.
Changing a project or a job means editing one of those files.

The homepage, project pages and docs pages render at build time.
The homepage revalidates every hour so the GitHub contributions graph stays current.

`pnpm registry:build` turns `src/registry/` into `src/__registry__/` for the docs pages and `public/r/*.json` for `shadcn add`.
`src/__registry__/` is gitignored.
`public/r/` is committed and rewritten by every build, so commit any change the build makes there.

### Errors and logging

`src/lib/logger.ts` writes one JSON line per entry, with a level, scope, message, timestamp, context and serialized error.
Vercel's build and function logs keep those lines, so a search for a scope such as `"scope":"vcard"` finds every failure of that route.
Debug entries are dropped when `NODE_ENV` is `production`.

`src/app/(app)/error.tsx` catches a page that throws and keeps the header and footer around a retry screen.
`src/app/global-error.tsx` does the same when the root layout itself fails.
Both render `ErrorFallback`, which reports the error once through `reportError` in `src/lib/report-error.ts`.
The contact form reports failed submissions the same way before it shows its error toast.

### Why these dependencies

Most runtime dependencies are the usual Next.js, React, Radix and Tailwind set.
These are the less obvious ones and what each one backs.

| Package | Used by |
|---|---|
| `fumadocs-core` | table of contents on the component docs pages |
| `schema-dts` | types for the JSON-LD blocks on the home, project and docs pages |
| `vcard-creator` | the `/vcard` contact card download |
| `sharp` | converting the avatar to JPEG for the vCard photo |
| `react-pdf` | the in-page resume viewer at `/resume` |
| `libphonenumber-js` | formatting phone numbers in `src/utils/string.ts` |
| `@ncdai/react-wheel-picker` | the published wheel picker registry component |
| `jotai` | remembering the chosen package manager and install method across docs pages |
| `cmdk` | the command menu |
| `motion` | the hero, page transition and registry component animations |
| `dayjs` and `date-fns` | dates in the pages and in the contribution graph |

## Deployment

Vercel builds and deploys `main` on every push, using `vercel.json`.
GitHub Actions runs `.github/workflows/ci.yml` on every push and pull request.
It runs lint, the format check, the typecheck, tests with coverage, the production build, `pnpm audit` and a gitleaks secret scan.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)

---

<p align="center">Made with ❤️ - GK</p>
