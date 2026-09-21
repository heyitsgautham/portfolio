# Portfolio audit, 21 September 2026

End to end review of gauthamkrishna.dev, the live deploy and the uncommitted working tree.

## Summary

The live site is six months behind.
It still says "AI Engineer | Ex-Presidio" and never mentions Lokam, Vapi, or Twilio.
The uncommitted working tree fixes the headline, but the resume PDF, the nav, the dead links, and the story underneath are still the student version.
The bones are good and the fixes are cheap.

## How this was checked

- Read every data file and component under `src/features/profile` and `src/app`.
- Diffed the working tree against `origin/main` (last deploy commit `bc82bb4`, 9 Sep 2026).
- Opened the live site at 1440px desktop, 390px mobile, and light mode.
- Opened the local dev server to see the uncommitted Lokam version.
- Ran Lighthouse on mobile against the live homepage.
- Curl-checked every route, every GitHub link in projects and timeline, and the response headers on both hostnames.

## Broken

- The "About" nav link goes to `/#about`, but the About panel is never rendered on the homepage. The first nav item does nothing.
- 5 of 17 GitHub links return 404: `agentic-rag-ma`, `earthquake-analysis`, `multi-label`, `predictive-maintenance`, `social-pulse`. Two are on the timeline and one is a featured Presidio project.
- 13 of 15 certificates link to `#`, so "View Certificate" scrolls to the top of the page.
- The Hack Hustle timeline entry is a teammate's LinkedIn post pasted in. It lists "Nijeesh NJ, Gautham Krishna, and Kishore B" as teammates, naming the site owner as his own teammate. `public/images/timeline_context.txt` is the source.
- Canonical URL, `og:url`, and sitemap all use the apex domain, but Vercel 307-redirects the apex to `www`. Every canonical tag points at a redirect.
- `/components` is in the sitemap and renders an empty page. `src/content` is empty. The shadcn registry under `/r`, `src/registry`, and the docs routes is the template author's work shipping on this domain.
- The OG image is a 735x489 stock-style "GK" monogram declared as 1200x630. Shared links show a generic logo with no name and no role. The unused `/og/simple` route already renders a title image.
- On a 390px phone the name wraps to "Gautham Krishna / S" and the verified badge floats alone at the far right. The pixel-logo cover takes the first 300px, so the name sits near the fold.
- The contribution graph tooltip says "1 contributions".

## Stale

| Where | Says | Should say |
|---|---|---|
| Live hero, bio, meta description | AI Engineer, Ex-Presidio | Software Engineer at Lokam.ai |
| Resume PDF (dated 9 Feb 2026) | Presidio only, no Lokam | Lokam as the first entry |
| Education, SEC | 6th semester | 7th |
| Timeline, Presidio | Sep 15 to Oct 31, 2025 | Ends 12 Nov, matching `employment.ts` |
| Certifications, "Presidio Certificate" | Issued Jan 2024 | Nov 2025, and it is an internship letter, not a certification |
| Sticky-Net | Jan 2026 to Present | An end date |
| `llms.txt` | "my work as an AI Engineer" | Same line already changed in `llms-full.txt` |
| Lokam experience card | Grey dot, no logo | A logo, like Presidio has |

Repo clutter not visible on the site.

- `.env` at the repo root belongs to SafeSight AI, a different project.
- `lokam-id.png` at the root and `public/lanyard/card.glb` (2.5MB) are untracked and referenced nowhere.
- `public/images/companies/lpu-nss-logo.webp` (382KB) and `skinseoul-logo.webp` are template leftovers.
- `public/images/avatar.webp` is 995x1280 and 990KB. The vcard route embeds a JPEG of it, so the `.vcf` download is 186KB.

## The story

The site tells the story of a student who did a good internship.
The owner is a full-time engineer who owns the conversation layer of a funded voice AI product with paying dealerships.
Nothing on the site says that in a way a founder or hiring manager would remember.

- The flip sentences still lead with "SIH '25 Finalist" and end with "Full-Stack AI Developer". Lokam should be the first and only headline. SIH stays in the timeline.
- The new tagline "Building AI systems that talk, call, and ship" is clever but generic. "I own the voice and SMS layer at Lokam.ai, an outbound agent that calls every unsold showroom visitor within 24 hours" is duller and more memorable.
- There are no Lokam numbers. Rooftops live, rooftops onboarded personally, calls per week. Confirm with Lokam what is shareable. One real number beats every "99.9% uptime" on the project pages.
- The Presidio card is 12 lines with four sub-projects. The Lokam card is 3 bullets. The emphasis is inverted.
- Project pages carry claims like "89% better accuracy" and "67% increase in diverse candidate shortlists" on a two-month internship project. One number that looks invented discounts the whole page. Keep the defensible numbers, cut the rest.
- 15 projects is too many, and all 3 featured ones are from autumn 2025. Cut to the 6 to 8 that are public and interview-worthy.
- The About copy opens with "I don't just study AI; I build with it." Rewrite it plain, then render the section.
- The self-awarded blue verified tick and the pulsing green "online" dot are template theatre. Drop both.

## Cuts

Delete the registry system.

- `src/registry` except `flip-sentences.tsx`, which the hero uses
- `src/__registry__`
- `src/app/(app)/(docs)`
- `public/r`
- The `registry:build` and `registry:internal:build` scripts, and `pnpm registry:build` from `build`
- Dependencies that only serve it: `@ncdai/react-wheel-picker`, `shadcn`, `fumadocs-core`, `next-mdx-remote`, the rehype and remark plugins, `puppeteer-core` and `capture.mts`

Delete the clutter files listed under Stale.

## Lighthouse, mobile, live homepage

| Category | Score |
|---|---|
| Accessibility | 88 |
| Best practices | 100 |
| SEO | 100 |

Accessibility misses, all cheap.

- No `<main>` landmark.
- Tech-stack icon links have no accessible name.
- Project tag touch targets are too small.
- SVGs with `role="img"` have no alt.
- The old hero pills fail contrast (already removed in the working tree).

## Order of work

1. Ship the uncommitted Lokam rewrite after fixing the About link, the Hack Hustle copy, and the canonical domain.
2. Regenerate the resume PDF with Lokam first.
3. Do the cuts: registry, dead projects, dead certificate links, clutter files.
4. Fix the mobile hero and the OG image.
5. Add the Lokam numbers once confirmed shareable.

## Open decisions

1. Ship the Lokam rewrite first, or do the cuts in the same pass. Recommendation is ship first.
2. Build the lanyard 3D card or delete `public/lanyard` and `lokam-id.png`.
3. Which Lokam numbers are public.
4. Whether the Handshake AI and Snorkel agent work can appear publicly, given the contract terms.
5. Updated resume PDF, or generate one from the site data.
