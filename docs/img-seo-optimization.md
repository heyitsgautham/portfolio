# Image Optimization & SEO Meta Tags — Implementation Plan

> **Goal**: Convert all non-favicon images to WebP, enable AVIF auto-negotiation, and close every SEO gap for perfect social sharing and search engine visibility.

---

## A. Image Optimization

### A1. Write a Conversion Script

Create `scripts/convert-images-to-webp.mjs` using `sharp` (already a dependency).

- **Scope**: Recursively convert all `.png` and `.jpeg`/`.jpg` files under `public/images/`.
- **Exclusions**: `public/favicon.ico`, `public/apple-touch-icon.png`, root-level favicon PNGs (`favicon-16x16.png`, `favicon-32x32.png`, etc.) — these must stay PNG for browser compatibility.
- **Quality settings**:
  - Photographic images (projects, timeline, certifications, education): quality 80
  - Icons (small, need crispness): quality 90
  - **Smart check**: Skip conversion when the WebP output is larger than the source file (common for tiny, already-optimized PNGs).
- **Output**: `.webp` files alongside originals, with a summary of bytes saved.

### A2. Update All Image References in Data Files

After conversion, update file extensions in:

| File | What changes |
|------|-------------|
| `src/features/profile/data/projects.ts` | Project `image` fields (`.png` → `.webp`) |
| `src/features/profile/data/certifications.ts` | Cert image paths |
| `src/features/profile/data/education.ts` | School logo paths |
| `src/features/profile/data/experiences.ts` | Verify (already `.webp`) |
| `src/features/profile/data/tech-stack.ts` | ~78 icon paths |
| Timeline data file(s) | Timeline image paths (`.jpeg` → `.webp`) |
| `src/app/og/` routes | If any reference static images |

**Safety net**: TypeScript strict mode + `pnpm check-types` + `pnpm build` will surface any broken paths immediately.

### A3. Delete Original PNG/JPEG Files

After verified build and visual inspection, remove old source files to reduce repository size.

### A4. Enable AVIF in `next.config.ts`

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  // ... existing config
}
```

This makes Next.js serve AVIF to supporting browsers (Chrome, Firefox), falling back to WebP for others. ~20% better compression than WebP alone.

**Trade-off**: AVIF has slower encoding, which increases cold build and first-request time per image. Acceptable since Next.js caches optimized images after first generation.

### A5. Clean Up `localPatterns`

Remove the redundant `/avatar.webp` entry from `localPatterns` since `/images/**` already covers it.

---

## B. SEO — Sitemap

### B1. Add Missing Routes to `src/app/sitemap.ts`

| Route | Priority | Change Frequency |
|-------|----------|-----------------|
| `/tech-stack` | 0.6 | monthly |
| `/certificates` | 0.6 | monthly |
| `/resume` | 0.6 | monthly |

**Not adding**: `/about` and `/contact` — those directories exist but contain no page files; adding them would cause 404s.

---

## C. SEO — OG & Twitter Metadata

### C1. Add Full `openGraph` and `twitter` Metadata

Pages currently missing OG/Twitter-specific fields (they only export `title` + `description`):

| Page | `openGraph.url` |
|------|----------------|
| `src/app/(app)/tech-stack/page.tsx` | `/tech-stack` |
| `src/app/(app)/certificates/page.tsx` | `/certificates` |
| `src/app/(app)/resume/page.tsx` | `/resume` |
| `src/app/(app)/(docs)/components/page.tsx` | `/components` |

Each gets:
```ts
openGraph: {
  title: '...',
  description: '...',
  url: '/<route>',
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: '...',
  description: '...',
},
```

**Note**: `metadataBase` is already set in root `layout.tsx`, so relative URLs resolve correctly.

---

## D. SEO — Canonical URLs

### D1. Add `alternates.canonical` to Every Page

```ts
alternates: { canonical: '/<route>' }
```

Apply to: `/tech-stack`, `/certificates`, `/resume`, `/components`, `/projects`, `/projects/[slug]`.

---

## E. SEO — JSON-LD Structured Data

### E1. `CollectionPage` Schema on `/projects`

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects',
  description: '...',
  url: 'https://gauthamkrishna.dev/projects',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://gauthamkrishna.dev/projects/${p.slug}`,
      name: p.title,
    })),
  },
};
```

Injected via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />` — following the existing pattern in root layout and component detail pages.

### E2. `CreativeWork` Schema on `/projects/[slug]`

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.summary,
  url: `https://gauthamkrishna.dev/projects/${project.slug}`,
  image: project.image,
  keywords: project.skills,
  dateCreated: project.period.start,
};
```

---

## F. Manifest & Robots Cleanup

### F1. Remove Broken Screenshot References from `src/app/manifest.ts`

The manifest references 4 WebP screenshots at `/images/screenshots/` that don't exist on disk. Remove the `screenshots` array entirely.

### F2. Tighten `robots.txt` Disallow Rules

Add disallow rules in `src/app/robots.ts`:
- `/og/` — OG preview/generation routes (utility, not content)
- `/vcard/` — vCard download endpoint

**Not disallowing `/r/`** — the component registry JSON is useful for discoverability and should remain indexable.

---

## Verification Checklist

- [ ] `pnpm check-types` — no type errors
- [ ] `pnpm build` — no broken image references, successful build
- [ ] `pnpm lint` — no import order or style issues
- [ ] Visual check: all images load correctly in dev server
- [ ] Network tab: confirm `content-type: image/avif` or `image/webp` served by Next.js
- [ ] Check `/sitemap.xml` includes new routes
- [ ] Check `/robots.txt` shows new disallow rules
- [ ] Test social sharing previews with:
  - [OpenGraph.xyz](https://www.opengraph.xyz/) — simulates rendering on X, Facebook, LinkedIn, etc.
  - [Metatags.io](https://metatags.io/) — live preview of OG/Twitter cards
  - Facebook Sharing Debugger: [developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
  - LinkedIn Post Inspector: [linkedin.com/post-inspector/](https://www.linkedin.com/post-inspector/)
  - ~~Twitter Card Validator~~ — **deprecated** (preview removed Aug 2022); use X Tweet Composer or the above tools instead
- [ ] Lighthouse audit on `/` and `/projects` — target 95+ Performance, 100 SEO

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Convert source files to WebP | Reduces repo size, eliminates cold-start optimization latency |
| Enable AVIF + WebP | ~20% better compression for modern browsers, with WebP fallback |
| Leave favicons as PNG | Required by browser/PWA specs |
| Skip WebP when output is larger | Small, already-optimized PNGs can actually grow when re-encoded |
| Remove manifest screenshots | Pragmatic — no real PWA use case yet; avoids broken references |
| Keep `/r/` indexable | Component registry discoverability is valuable |
| Use OpenGraph.xyz over Twitter Card Validator | Twitter's validator deprecated preview rendering in Aug 2022 |
