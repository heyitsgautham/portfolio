# Copilot Instructions — gauthamkrishna.dev

## Project Overview

Next.js 15 portfolio site (App Router, RSC, Turbopack) for Gautham Krishna. Deployed on Vercel. Uses **pnpm** exclusively — never use npm/yarn. Dev server runs on port **1408**.

## Architecture

```
src/
├── app/              # Next.js App Router
│   ├── (app)/        # Main pages (layout with header/footer)
│   │   ├── (root)/   # Homepage — assembles profile sections
│   │   ├── (docs)/   # MDX documentation pages (component docs)
│   │   ├── projects/ # Project gallery + [slug] detail pages
│   │   └── ...       # about, certificates, contact, resume, tech-stack
│   ├── (llms)/       # Machine-readable content routes (llms.txt, *.md)
│   └── og/           # Dynamic Open Graph image generation
├── features/profile/ # Core profile feature (single feature module)
│   ├── data/         # All portfolio content as typed TS constants
│   ├── components/   # Section components (experiences, projects, etc.)
│   └── types/        # TypeScript types for profile data
├── registry/         # shadcn-compatible component registry (published to /r/)
├── components/       # Shared UI components (shadcn/ui in components/ui/)
├── config/           # Site config (site.ts) and registry config
├── lib/              # Utilities — cn(), fonts, MDX processing, rehype/remark plugins
└── hooks/            # Custom React hooks (use-sound, use-media-query, etc.)
```

### Key Architectural Decisions

- **All portfolio content lives in `src/features/profile/data/`** as typed TypeScript objects — not in a CMS or database. To update projects, experiences, education, etc., edit the corresponding `.ts` file.
- **Single feature module pattern**: `src/features/profile/` encapsulates all profile-related components, data, and types. New features should follow this pattern.
- **Component registry**: Custom shadcn-compatible components in `src/registry/` are built via `pnpm registry:build` and served from `public/r/`. The `packages/gk/` package is a CLI wrapper for installing them.
- **LLM-readable routes**: The `(llms)/` route group serves structured `.txt` and `.md` versions of portfolio data for AI consumption.

## Critical Commands

```bash
pnpm dev              # Start dev server (Turbopack, port 1408)
pnpm build            # Build (runs registry:build first, then next build)
pnpm check-types      # TypeScript type checking (strict mode)
pnpm lint             # ESLint
pnpm format:write     # Prettier formatting
pnpm registry:build   # Rebuild component registry (must run before build)
```

## Code Conventions

- **TypeScript strict mode** — no `any` types, use `type` imports (`import type { Foo }`).
- **ESLint enforces** `@typescript-eslint/consistent-type-imports` and `simple-import-sort` — imports must be sorted alphabetically by group.
- **Tailwind CSS v4** with CSS-variable-based theming in `src/styles/globals.css`. Use `cn()` from `@/lib/utils` for conditional class merging.
- **shadcn/ui** components live in `src/components/ui/`. Add new ones via `npx shadcn add <component>`.
- **Path alias**: `@/` maps to `src/`. Always use `@/` imports, never relative paths across module boundaries.
- **State management**: Jotai for global state, `next-themes` for theme, `swr` for data fetching.
- **Animation**: Use `motion` (Framer Motion) for animations — already a dependency.
- **Date formatting**: `dayjs` for display, `date-fns` available for complex operations.

## Data Patterns

### Adding/Editing a Project
Edit `src/features/profile/data/projects.ts`. Each project follows the `Project` type:
```ts
{
  id: "unique-id",         // Stable key
  slug: "url-safe-slug",   // Used for /projects/[slug]
  title: "...",
  period: { start: "MM.YYYY", end: "MM.YYYY" }, // omit end for "Present"
  skills: ["Tag1", "Tag2"],
  summary: "One-line for card",
  intro: "2-3 sentence overview",
  uniqueFeatures: ["..."],
  techStackDetail: [{ label: "Frontend", items: "React, Next.js" }],
  accentColor: "#hex",     // Extract via: node scripts/extract-project-colors.mjs
}
```
Corresponding detail markdown goes in `projects-description/<slug>.md` and summary in `proj-summary-description/<slug>.md`.

### Adding Profile Data
All data files export typed constants (e.g., `PROJECTS`, `EXPERIENCES`, `USER`, `EDUCATION`). Types are in `src/features/profile/types/`. Keep data and presentation separate.

## Component Registry

Components are defined in `src/registry/registry-components.ts` (and `registry-blocks.ts`, `registry-hook.ts`, `registry-lib.ts`). After adding/editing registry items:
1. Update the registry definition file
2. Run `pnpm registry:build` to regenerate `src/__registry__/` and `public/r/`
3. Never manually edit files in `src/__registry__/` — they are auto-generated

## File Naming

- Components: `kebab-case.tsx` (e.g., `profile-hero.tsx`)
- Data files: `kebab-case.ts` (e.g., `social-links.ts`)
- Hooks: `use-*.ts` pattern (e.g., `use-sound.ts`)
- Route handlers: `route.ts` inside route directories

## SEO & Metadata

- Every page should export a `metadata` object using Next.js Metadata API.
- JSON-LD structured data is added inline in page components (see `src/app/layout.tsx` for Person/WebSite schema).
- Sitemap: `src/app/sitemap.ts`, Robots: `src/app/robots.ts`, Manifest: `src/app/manifest.ts`.
- OG images are generated dynamically in `src/app/og/`.
