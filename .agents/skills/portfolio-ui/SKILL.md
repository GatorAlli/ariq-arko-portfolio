---
name: portfolio-ui
description: "Edit Ariq Arko's portfolio layouts, Tailwind styling, shadcn components, galleries, search, navigation, or contact interactions. Use for interface work in this repository."
---

# Portfolio UI

Resolve repository paths from this file's directory with `../../..`. Read `AGENTS.md` and the relevant installed Next.js guide under `node_modules/next/dist/docs/` before application code changes. Run commands from the repository root.

## Styling and architecture

- `app/globals.css` owns color/font tokens, base rules, keyframes, print styling, and reduced motion. Keep the existing dark theme unless the user requests a design change.
- `lib/portfolio-styles.ts` maps semantic classes to literal Tailwind utilities. `portfolioClass()` keeps the original names and expands mappings; selectors rely on those original names. Many utilities use `!`, so inspect specificity before adding overrides. Do not mechanically remove those markers or move rules between cascade layers.
- The homepage uses inline Tailwind utilities and its own portrait crop. Legacy `hero-portrait` styles use a different scale and are not a drop-in replacement. Keep the portrait's transparency, aspect ratio, and crop when changing optimization or effects.
- `components/ui/` contains customized shadcn/Radix primitives. Inspect `components.json` and the local component before regenerating it; generated defaults can erase project styling.
- Most page content is rendered on the server. Search/menu, contact, galleries, and page actions use client components. Avoid expanding client boundaries unnecessarily; importing `lib/portfolio.ts` or the whole style map into a client component can add substantial payload.
- Tailwind v4 uses `@tailwindcss/turbopack` through `next.config.ts`. There is no PostCSS configuration; preserve this compilation path unless intentionally replacing it.

## Interaction invariants

- Keep the skip link and one `main` landmark with `id="main-content"`. Keep unique record/section IDs used by search fragments.
- Preserve Radix focus management, accessible dialog titles, Escape handling, form labels, error associations, and keyboard navigation. Search has a global Cmd/Ctrl K shortcut; check its interaction with an already-open mobile menu.
- Contact validates locally and builds an encoded `mailto:` URL. Keep confirmation wording about a prepared draft, not a sent message. Exercise validation without sending an email.
- Retain reduced-motion behavior for the portrait, Contact border, and gallery transitions, plus print rules for `/resume`.

## Verification

Run `npm run lint`, `npm run build`, and `npx tsc --noEmit` after application changes. Check affected pages at desktop and narrow widths, plus the relevant breakpoints: 599/600, 767/768, 900/901, and 1100/1101 when changing responsive rules. Check overflow, focus visibility, actual image loading, and the interaction changed. Use print preview for print changes and a reduced-motion setting for animation changes. Do not treat a successful compile as visual verification.
