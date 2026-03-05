# Portfolio Landing Page 17 - Next.js, TypeScript, TailwindCSS Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)

A full-featured **developer portfolio and blog** built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. It showcases a modern, content-first architecture: MDX blog and changelog via **Velite**, optional **Supabase** for views/reactions and community wall, and a rich set of reusable UI components. Use it as a learning reference, a template for your own portfolio, or a starting point to study Next.js, MDX, and server/client patterns.

- **Live Demo:** [https://portfolio-ui-17.vercel.app/](https://portfolio-ui-17.vercel.app/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack & Keywords](#tech-stack--keywords)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Routes & Pages](#routes--pages)
- [API Endpoints](#api-endpoints)
- [Backend & Data](#backend--data)
- [Key Components & Reuse](#key-components--reuse)
- [Content (Blog & Changelog)](#content-blog--changelog)
- [Scripts & Tooling](#scripts--tooling)
- [Conclusion](#conclusion)
- [License](#license)

---

## Project Overview

**Portfolio UI 17** is a production-ready portfolio site with:

- **Blog** – MDX articles with categories, table of contents, reading time, view counts, and reactions
- **Changelog** – Versioned product/site updates in MDX
- **About** – Bio, resume, bento-style sections (currently playing, reading, stats, connections)
- **Links** – Link-in-bio style page with profile and featured articles
- **Toolbox** – Hardware/software stack
- **Speaking** – Talks, videos, and “invite me to speak” CTA
- **Projects** – Showcase grid with images and links
- **Stats** – Aggregated metrics: blog stats, engagement, GitHub, optional Lighthouse scores
- **Community Wall** – User-generated messages (Supabase)
- **Connections** – Network/people grid (static or API-backed)

The app is **demo-friendly**: it runs and builds without any environment variables. Optional env vars unlock Supabase (auth, community wall, article views/reactions), Spotify “Now Playing,” GitHub stats, newsletter (Loops), and PageSpeed (Lighthouse) insights.

---

## Tech Stack & Keywords

| Layer            | Technology                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| **Framework**    | Next.js 15 (App Router)                                                    |
| **Language**     | TypeScript 5.9                                                             |
| **UI**           | React 18.3, Tailwind CSS 3.4, Framer Motion, Headless UI                   |
| **Content**      | Velite (MDX), rehype-raw                                                   |
| **Backend / DB** | Supabase (optional): Auth, tables for views, reactions, community messages |
| **APIs**         | Next.js Route Handlers (`/api/og`), OAuth callback (`/auth/callback`)      |
| **Fonts**        | Geist (Sans & Mono)                                                        |

**Keywords:** portfolio, blog, MDX, Next.js, React, TypeScript, Tailwind CSS, Supabase, Velite, server components, App Router, SEO, Open Graph, sitemap, robots.txt, view counter, article reactions, community wall, link previews, OG image generation.

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** (or pnpm / yarn)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/arnobt78/portfolio-ui-17.git
cd portfolio-ui-17

# Install dependencies
npm install

# Development (with hot reload)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs with no `.env` required; optional features need env vars (see below).

### Build & Production

```bash
# Production build (includes Velite content generation)
npm run build

# Start production server
npm start
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Configuration is optional. The app works as a **static/demo** site without any env; adding variables enables specific features.

### Setup

1. Copy the example file:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill only the keys you need.

### Reference

| Variable                    | Required                 | Purpose                                                           |
| --------------------------- | ------------------------ | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`  | For Supabase features    | Supabase project URL                                              |
| `NEXT_PUBLIC_SUPABASE_ANON` | For Supabase features    | Supabase anonymous (public) key                                   |
| `SUPABASE_SERVICE_ROLE_KEY` | For server-side Supabase | Service role key (views, reactions, community wall)               |
| `LOOPS_API_KEY`             | Newsletter               | Loops.so API key for newsletter signup                            |
| `SPOTIFY_CLIENT_ID`         | Currently Playing        | Spotify app client ID                                             |
| `SPOTIFY_CLIENT_SECRET`     | Currently Playing        | Spotify app client secret                                         |
| `SPOTIFY_REFRESH_TOKEN`     | Currently Playing        | OAuth refresh token for “Now Playing”                             |
| `GITHUB_TOKEN`              | Stats page               | GitHub personal access token (repo + read:user for contributions) |
| `PAGESPEED_API_KEY`         | Stats page               | Google PageSpeed Insights API key (higher quota)                  |
| `POSTGRES_URL`              | Unused in active code    | Reserved for direct Postgres (e.g. custom analytics)              |

### How to Get Them

- **Supabase:** [supabase.com](https://supabase.com) → New Project → Settings → API: use Project URL and `anon` key; for server actions use `service_role` (keep secret).
- **Loops:** [loops.so](https://loops.so) → API key in dashboard.
- **Spotify:** [Spotify for Developers](https://developer.spotify.com) → create app → Client ID/Secret; use a refresh token from OAuth flow for “Now Playing.”
- **GitHub:** GitHub → Settings → Developer settings → Personal access tokens → scope `repo` and `read:user` for stats/contributions.
- **PageSpeed:** [Google Cloud Console](https://console.cloud.google.com) → enable PageSpeed Insights API → create key.

---

## Project Structure

```bash
portfolio-ui-17/
├── app/                    # Next.js App Router
│   ├── api/                # Route handlers
│   │   └── og/             # Dynamic OG image generation
│   ├── auth/
│   │   └── callback/       # OAuth callback (e.g. Supabase)
│   ├── blog/               # Blog list, category, [slug]
│   ├── changelog/          # Changelog list & entries
│   ├── community-wall/    # Community messages (Supabase)
│   ├── components/         # Shared UI components
│   │   └── stats/         # Stats-page cards and charts
│   ├── data/               # Static config (siteMetadata, toolbox)
│   ├── db/                 # Server actions & data (Supabase, Spotify)
│   ├── hooks/              # React hooks
│   ├── lib/                # Utils, Supabase clients, stats, TOC, link-previews
│   ├── layout.tsx          # Root layout & metadata
│   ├── page.tsx            # Home
│   ├── robots.ts           # robots.txt
│   ├── sitemap.ts          # sitemap.xml
│   ├── about/
│   ├── connections/
│   ├── links/
│   ├── projects/
│   ├── speaking/
│   ├── stats/
│   └── toolbox/
├── content/                # Source content (Velite reads this)
│   ├── blog/               # *.mdx → blog posts
│   └── changelog/          # *.mdx → changelog entries
├── public/                 # Static assets, OG image, previews
├── scripts/                # generate-link-previews, fix-previews
├── velite.config.ts        # Velite schema & MDX config
├── middleware.ts            # Supabase session + 410 for gone URLs
└── .env.example            # Env template
```

---

## Routes & Pages

| Route                       | Type          | Description                                                  |
| --------------------------- | ------------- | ------------------------------------------------------------ |
| `/`                         | Static        | Home: bentos, featured posts, CTA                            |
| `/about`                    | Static        | About, resume, bentos (playing, reading, stats, connections) |
| `/blog`                     | Static        | Blog index, category filter                                  |
| `/blog/[slug]`              | Dynamic       | Single post: MDX, TOC, view counter, reactions               |
| `/blog/category/[category]` | Dynamic       | Posts by category                                            |
| `/changelog`                | Static        | Changelog list (MDX)                                         |
| `/links`                    | Static        | Link-in-bio + featured articles                              |
| `/toolbox`                  | Static        | Hardware/software stack                                      |
| `/speaking`                 | Static        | Talks, videos, invite CTA                                    |
| `/projects`                 | Static        | Project cards with images/links                              |
| `/stats`                    | Dynamic (ISR) | Aggregated stats (build-time, server, GitHub, Lighthouse)    |
| `/community-wall`           | Dynamic       | Community messages (Supabase)                                |
| `/connections`              | Static        | Connections/people grid                                      |
| `/api/og`                   | API           | Dynamic Open Graph image (query: title, summary, image)      |
| `/auth/callback`            | API           | OAuth callback (e.g. Supabase sign-in)                       |
| `/sitemap.xml`              | Generated     | Sitemap from siteUrl + blog slugs                            |
| `/robots.txt`               | Generated     | Allow/disallow rules + sitemap URL                           |

---

## API Endpoints

### `GET /api/og`

Generates an **Open Graph image** for social sharing.

**Query parameters:**

- `title` – Text overlay (default: `"Blog Post"`)
- `summary` – Optional subtitle
- `image` – Filename of blog image in `public/blog/` (e.g. `my-post.jpg`)

**Example:**

```
/api/og?title=My%20Post&summary=Short%20summary&image=my-post.jpg
```

Used by blog post metadata and social cards. Implemented with `next/og` `ImageResponse` and optional overlay from `public/`.

---

### `GET /auth/callback`

Handles **OAuth callback** (e.g. Supabase Auth). Exchanges `code` for session and redirects. Query params: `code`, optional `next` (redirect path). Requires `NEXT_PUBLIC_SUPABASE_*` and `SUPABASE_SERVICE_ROLE_KEY` if you use Supabase Auth.

---

## Backend & Data

### Content (Velite)

- **Source:** `content/blog/*.mdx` and `content/changelog/*.mdx`
- **Build:** Velite runs at `next build`, outputs to `.velite/` and copies assets to `public/static/`
- **Usage:** Import from `#site/content` (e.g. `posts`, `changelogItems`). No runtime CMS; content is fixed at build time.

### Supabase (Optional)

When env is set, the app uses Supabase for:

- **Auth** – Middleware and `/auth/callback` for session; Community Wall and optional “sign in with GitHub”
- **Tables (conceptual):**
  - `article_views` – slug, view_count (for view counter)
  - `article_reactions` – article_slug, reaction_type, count (like, heart, celebrate, insightful)
  - `messages` – community wall messages

Server-side access uses `createSupabaseAdminClient()` (service role). Client components use `getSupabaseBrowserClient()` or server components use `createSupabaseServerClient()`.

### Stats Data Sources

- **Build-time:** From Velite content only (word count, categories, changelog count) – no env needed.
- **Server stats:** From Supabase (`article_views`, `article_reactions`) – needs Supabase env.
- **GitHub:** GitHub API (repo stats, contribution graph) – needs `GITHUB_TOKEN`.
- **Lighthouse:** PageSpeed Insights API – optional `PAGESPEED_API_KEY` for higher quota.

---

## Key Components & Reuse

### Layout & Structure

- **`GridWrapper`** – Consistent max-width and border styling for sections. Reuse in any page for alignment.

```tsx
import { GridWrapper } from "@/app/components/GridWrapper";

<GridWrapper>
  <h1>Section title</h1>
  {children}
</GridWrapper>;
```

- **`Navbar` / `Footer`** – Site-wide navigation and footer; driven by `siteMetadata` and routes.

---

### Buttons & Links

- **`Button`** – Variants: `primary`, `secondary`, `outline`. Supports `href` (renders as link) or button.

```tsx
import { Button } from "@/app/components/Button";

<Button href="/blog">View Blog</Button>
<Button variant="outline" onClick={handleClick}>Click me</Button>
```

- **`Link`** – Internal Next.js `Link` with shared styling.

---

### Content & MDX

- **`MDXContent`** – Renders Velite-compiled MDX `code` with custom components (headings, code blocks, callouts, etc.). Use wherever you have a post or changelog entry’s `code` string.

```tsx
import { MDXContent } from "@/app/components/mdx";

<MDXContent code={post.code} />;
```

- **`TableOfContents`** – Renders from post `headings` (from Velite TOC extraction). Pass `headings` and optional active-id state.

---

### Cards & Bentos

- **`BentoCard`** – Generic bento-style card container.
- **`FeaturedBlogCard`** – Blog card with image, title, summary, link.
- **`StatCard`** – Label + value for stats dashboard.
- **`ChangelogBento`**, **`SpeakingBento`**, **`StatsBento`**, **`ToolboxBento`**, **`ConnectionsBento`**, **`CommunityWallBento`**, **`AboutMeBento`**, **`CurrentlyPlayingBento`**, **`CurrentlyReadingBento`**, **`CalendarBento`** – Section-specific bentos for home/about; reuse or adapt for your own sections.

---

### Stats Page

Components under `app/components/stats/`: **StatsPageHeader**, **StatsSectionHeader**, **StatCard**, **TopArticlesCard**, **ReactionBreakdown**, **CategoryBarChart**, **GitHubStatsCard**, **ContributionGraphCard**, **LighthouseScoreCard**, **SiteViewsCard**, **CommunityMessagesCard**, **ChangelogUpdatesCard**, **DaysSinceRevamp**, **CoffeeCupsCard**, **MostViewedArticleCard**. Compose them in `app/stats/page.tsx`; each expects specific data shapes (see `app/lib/stats/types.ts` and the stats page).

---

### Link Previews

- **`LinkPreview`** – Wraps a link and shows a popover with screenshot (from manifest), favicon, and domain. Used in MDX via custom link component. Manifest is generated by `scripts/generate-link-previews.ts` and stored in `public/previews/manifest.json`.

Reuse: use the same manifest format and `LinkPreview` (or `LinkPreviewPopover` / `LinkPreviewImage`) in any page that renders external links.

---

### Reusing in Other Projects

1. **Copy components** from `app/components/` (and any `app/lib/` or `app/data/` they depend on).
2. **Tailwind:** Ensure your project uses Tailwind and the same (or compatible) theme (e.g. `border-border-primary`, `text-text-primary`). Adjust class names if your design tokens differ.
3. **Content:** For blog/changelog, adopt Velite: same `velite.config.ts` pattern and `#site/content` imports; adjust schema if you add/remove fields.
4. **Env:** If you reuse Supabase/Spotify/GitHub/Loops/PageSpeed, replicate the same env vars and server actions (e.g. `app/db/actions.ts`, `app/lib/stats/*`).

---

## Content (Blog & Changelog)

### Blog

- **Location:** `content/blog/*.mdx`
- **Frontmatter (example):**

```yaml
title: Your Post Title
publishedAt: 2025-01-15
summary: Short description for cards and SEO.
imageName: your-image.jpg
categories: [Next.js, Tailwind]
draft: false
canonicalUrl: https://yoursite.com/blog/your-slug # optional
audioFile: your-slug.mp3 # optional
```

- Slug is derived from filename (e.g. `my-post.mdx` → `/blog/my-post`). Use `s.mdx()` in Velite so body becomes `code`; custom components (links, code blocks, callouts) are defined in `app/components/mdx.tsx`.

### Changelog

- **Location:** `content/changelog/*.mdx`
- **Frontmatter:** `title`, `publishedAt`, optional `imageName`, `draft`. Same MDX pipeline as blog; list is sorted by date and rendered on `/changelog`.

---

## Scripts & Tooling

| Script                      | Purpose                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `npm run dev`               | Start Next.js dev server                                                                                        |
| `npm run build`             | Production build (runs Velite then Next.js)                                                                     |
| `npm start`                 | Start production server                                                                                         |
| `npm run lint`              | Run ESLint on `.js,.jsx,.ts,.tsx`                                                                               |
| `npm run generate-previews` | Extract external links from content, capture screenshots with Playwright, write `public/previews/manifest.json` |
| `npm run fix-previews`      | Retry failed preview captures (see script for details)                                                          |

**Link previews:** Run `generate-previews` when you add or change external links in MDX. Script uses `app/lib/link-previews/types.ts` and outputs to `public/previews/`. Excluded domains (e.g. social networks) are listed in the script.

---

## Conclusion

This repository is a **full reference** for a Next.js 15 portfolio and blog: App Router, TypeScript, Tailwind, Velite (MDX), optional Supabase, and a rich set of UI and stats components. Use the structure, env pattern, and components as a learning resource or as a base for your own site. Customize `app/data/siteMetadata.ts`, content in `content/`, and optional backends via environment variables.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
