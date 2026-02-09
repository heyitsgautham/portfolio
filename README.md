<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Audiowide&size=40&pause=10&color=00D9FF&center=true&vCenter=true&width=800&lines=Portfolio+Website" alt="Typing SVG" />
</div>

A minimal portfolio and component registry to showcase my work as a Design Engineer.

Check out the live site: [gk.dev](https://gk.dev)

## Overview

### Stack

- Next.js 15
- Tailwind CSS v4
- shadcn/ui

### Featured

- Clean & modern design
- Light/Dark themes
- vCard integration
- SEO optimized ([JSON-LD schema](https://json-ld.org), sitemap, robots)
- AI-ready with [/llms.txt](https://llmstxt.org)
- Spam-protected email
- Installable as PWA

### Registry

- Easily build and distribute reusable components, hooks, and pages using a custom registry powered by the [shadcn CLI](https://ui.shadcn.com/docs/cli).
- Each entry is well-documented and includes live previews & code snippets.

## Development

Please refer to the [Development Guide](./DEVELOPMENT.md) for more details.

## Customization

This project is designed to be easily customizable. You are free to use this code as you see fit!

**To make this your own, you'll need to edit the following files:**

1.  **Site Configuration**: `src/config/site.ts`
    *   Update `SITE_INFO` with your name, URL, and description.
    *   Update `GITHUB_USERNAME` and `SOURCE_CODE_GITHUB_REPO`.

2.  **User Data**: `src/features/profile/data/user.ts`
    *   Update your name, email, avatar, and bio.
    *   Customize the `flipSentences` for the hero section.

3.  **Social Links**: `src/features/profile/data/social-links.ts`
    *   Add your own social media profiles.

4.  **Experience & Projects**:
    *   Edit `src/features/profile/components/experiences.tsx` (or extract data to a separate file).
    *   Edit `src/features/profile/components/projects.tsx` (or extract data to a separate file).

5.  **Tech Stack**: `src/features/profile/components/tech-stack.tsx`
    *   Update the icons and technologies you use.

6.  **GitHub Contributions**: `src/features/profile/data/github-contributions.ts`
    *   Ensure `GITHUB_USERNAME` in `src/config/site.ts` is correct to fetch your graph.

## License & Acknowledgments

Licensed under the [MIT license](./LICENSE).

**You are free to use this code as you see fit.** Please just remember to **remove all my personal information** (resume, email, phone, etc.) before publishing your own version.

### Inspiration

This project was inspired by and built upon the amazing work of:

*   [Chánh Đại](https://chanhdai.com) - Original template and design inspiration.
*   [Ramx](https://ramx.in) - Design inspiration for the dark mode aesthetic.

If you find this project useful, please consider giving it a star! ⭐️
