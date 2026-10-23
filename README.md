# Ariq Arko Portfolio

A dark portfolio for a Dhaka-based content creator and community builder. Built with Next.js 16.4.2 App Router, React 19.3, TypeScript, Tailwind CSS v4, and customized shadcn/Radix components.

## Setup

Requirements: Node.js **20.9 or newer** (the installed Next.js package's minimum), npm, and registry access for the first install. The October 2026 audit used Node 26.0.0 and npm 11.12.1; the repository does not pin a runtime version.

From the parent `Ariq Arko Portfolio` workspace:

```sh
cd ariq-arko-portfolio
npm ci
npm run dev
```

If already inside the repository, skip the `cd` command. Open the Local URL printed by Next.js, normally `http://localhost:3000`. To choose another port:

```sh
npm run dev -- --port 3001
```

No environment variables, database, API keys, or external services are needed. Fonts, images, PDFs, and portfolio data are local. The contact form opens a `mailto:` draft in the visitor's email application; the visitor sends it. The website does not deliver or store messages.

Use `npm ci` for a reproducible install from `package-lock.json`. Use `npm install <package>` only when intentionally changing dependencies, and commit the updated lockfile.

## Commands

Run these inside `ariq-arko-portfolio/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with Turbopack |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript without emitting JavaScript |
| `npm run build` | Build production output and generate route types |
| `npm start` | Serve an existing production build |
| `npm audit` | Check dependencies against npm advisories; requires network access |

Production preview:

```sh
npm run lint
npm run build
npx tsc --noEmit
npm start
```

There is no automated test suite or CI workflow yet. For manual verification, check search and result links, mobile navigation and Escape, gallery thumbnails, contact validation, clipboard feedback, PDF downloads, and résumé print preview.

## File map

| Location | Responsibility |
| --- | --- |
| `app/page.tsx` | Homepage, portrait, toolkit |
| `app/layout.tsx` | Fonts, shared header, default metadata |
| `app/[section]/page.tsx` | About, experience, work listing, awards, testimonials, contact |
| `app/work/[slug]/page.tsx` | Individual project pages |
| `app/resume/page.tsx` | Printable online résumé |
| `app/globals.css` | Theme tokens, base styles, animations, print and reduced-motion rules |
| `lib/portfolio-data.json` | Shared experience, projects, awards, certifications, events, participations, milestones |
| `lib/portfolio.ts` | Data exports, contact details, navigation, page metadata, search index |
| `lib/portfolio-styles.ts` | Semantic class names expanded into Tailwind utilities by `portfolioClass()` |
| `components/` | Page sections and client interactions |
| `components/ui/` | Customized shadcn/Radix primitives; configuration in `components.json` |
| `public/images/`, `public/documents/` | Portraits, logos, certificate media, original PDFs |
| `public/licenses/` | Local font licenses |
| `.agents/skills/` | Project-specific skills for content, UI, and verification |

The Git repository is this directory. The sibling `../visual-checks/` folder contains historical screenshots and comparison results; it is outside this repository and is not needed to run the app.

## Routes

| URL | Behavior |
| --- | --- |
| `/` | Homepage |
| `/about`, `/experience`, `/work`, `/awards` | Main portfolio sections |
| `/contact` | Contact details and email-draft form |
| `/resume` | Current online résumé with print/download controls |
| `/testimonials` | Empty state until real references are supplied |
| `/skills` | Redirects to `/about#skills` |
| `/work/freeland`, `/work/carnival`, `/work/dakkhinno`, `/work/duckpeon` | Project details |

Unknown sections and projects render the custom not-found screen. With the current streaming setup, missing URLs can return HTTP 200 with `noindex`; `/skills` can redirect through the streamed response instead of a 3xx header. Check the rendered outcome as well as the status code.

## Editing content and design

- Update shared records in `lib/portfolio-data.json`; keep stable record IDs and project keys because search links and project URLs depend on them. Preserve the existing field shapes.
- Skills/toolkit content lives in `components/about-skills.tsx` and `app/page.tsx`. Education and introductory copy also appear in the section and résumé pages.
- Follow the source decisions in `CONTENT-AUDIT.md`: supplied corrections take precedence over the original résumé, Freeland's certificate establishes September 2026, unknown years stay omitted, and languages remain Bangla / English / Hindi unless new instructions change them.
- The original résumé PDF is an archive and may differ from the online résumé. Use the résumé page's print action for current content.
- Experience galleries and project pages retain labeled placeholders until real media is supplied. Preserve aspect ratios and meaningful alt text when replacing them. Keep font licenses and logo source notes with their assets.
- The theme uses onyx `#080F0F`, purple `#AA00FF`, lime `#C6FF00`, and porcelain `#FDFFFC`. Gravitas One is the display face; Poppins is the body face; Neonderthaw is available for handwriting.
- Inspect `portfolioClass()` before editing semantic styles: many generated utilities are important (`!`), so ordinary utility overrides may not win. The homepage primarily uses inline Tailwind utilities.

## Agent skills

Read `AGENTS.md`. Skills are stored locally and can be invoked as `$portfolio-content`, `$portfolio-ui`, and `$portfolio-checks`. Each skill has a `SKILL.md` and UI metadata under `agents/openai.yaml`; no global installation is required. If a session has not discovered a new skill yet, start a new session or read its file directly.

## Build notes

`next.config.ts` enables Cache Components, partial prefetching, and experimental agent feedback. Tailwind v4 compiles through `@tailwindcss/turbopack`; there is no PostCSS configuration. Use the documented Turbopack scripts unless deliberately changing the CSS build pipeline.

- If a port is occupied, choose another port using `--port`.
- `npm start` requires a successful `npm run build` first.
- If generated route types are absent, run the build before the standalone TypeScript check.
- If stale `.next` output causes errors, stop the project server, move `.next` aside, and rebuild. Never edit generated output or clear it while another process uses it.
- A Turbopack error mentioning `binding to a port` / `Operation not permitted` can come from a restricted execution environment. Allow local worker ports; changing application source is not the fix. During this audit, a fresh build after moving the failed cache aside passed.

See `PROJECT-AUDIT.md` for the latest project-wide review and remaining work. Deployment configuration and a production domain are not supplied; a host must support this Next.js runtime and build configuration.
