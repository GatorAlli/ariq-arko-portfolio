---
version: alpha
name: Ariq Arko Portfolio
description: A violet film portfolio with bold chapter titles and clear evidence for university admissions readers.
colors:
  background: "#020104"
  primary: "#aa00ff"
  chapter: "#e7beff"
  foreground: "#fdfffc"
  muted: "#bdb4cc"
typography:
  chapter:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
  body:
    fontFamily: "Sora, sans-serif"
  identity:
    fontFamily: "Gravitas One, Georgia, serif"
  navigation:
    fontFamily: "IBM Plex Mono, monospace"
rounded:
  DEFAULT: "2px"
omitted:
  - section: spacing
    reason: Existing responsive spacing remains canonical in app/globals.css and lib/portfolio-styles.ts.
  - section: components
    reason: Existing shared components and their behavior are retained; this change reshapes chapter titles only.
---

# Ariq Arko Portfolio

## Overview

This is a brand and content portfolio, not a dashboard. Its primary reader is a university admissions reviewer scanning film, student leadership, community work, and verified achievements. English is the interface language. The subject is a filmmaker and student leader based in Dhaka.

The visual reference is a film title card: tall, bold lettering with a restrained violet accent. [Ochi](https://ochi.design/) informed the use of condensed display type and scale. The [Awwwards Longfellow typography reference](https://www.awwwards.com/inspiration/typography-longfellow) informed the exploration of large titles. These are directional references, not copied layouts or assets.

The user's foundation brief and subsequent decisions are maintained in [docs/design-foundation.md](docs/design-foundation.md). Preserve the purple fabric, framed identity, rotating star, supplied photography, single-page structure, and factual content.

## Colors

The moving violet fabric remains visible. Main chapter titles use solid pale violet, distinct from white body headings. Do not use gradient lettering, outline-only text, bright rectangular title panels, or extra decorative highlights.

Runtime tokens remain canonical (Model B). This file records their accepted roles and rationale rather than generating a competing theme.

## Typography

Main chapters use Barlow Condensed 700, uppercase, with a line height of 0.98. Their tall letterforms and greater scale distinguish a new chapter without adding labels or numbers. Long Experience titles use a smaller responsive size to balance their photograph. Mobile titles may wrap naturally; never crop words to force a line.

Sora remains the readable body and secondary-heading family. Gravitas One is reserved for the framed ARIQ ARKO identity. IBM Plex Mono remains navigation lettering. No Inter or Space Grotesk. No decorative serif italics. The preceding Fraunces treatment is an explored alternative, not the active chapter style.

## Layout

Retain the existing page gutters and content grid. Keep chapter headings separate from project titles through family, weight, size, and color. Do not add filler text or enlarge blank vertical gaps to create emphasis. Preserve the compact sticky mobile menu and the scrolling title/star masthead.

## Elevation & Depth

The fabric provides depth. Text may retain its quiet black legibility shadow; it must not acquire a glowing halo. Keep glass limited to navigation. Do not add card or panel treatments around chapter headings.

## Shapes

Existing controls use mostly square edges with a 2px radius. Chapter curves stay thin and quiet. Their animation must remain curved through the whole loop. No numbered badges or repeated divider rules.

## Components

The shared `.section-title-text` class owns every main chapter title, including About, Experience, Work, Recognition, and Contact. `PageIntro` and custom openings reuse it. Secondary records and project headings retain their established Sora treatment.

The existing word reveal plays once on entry, never on hover. Text stays available without JavaScript. Reduced-motion readers see immediately visible titles and static curves. Preserve semantic headings, unclipped letterforms, anchor destinations, accessible focus, and the existing résumé popup behavior.

Navbar arrows are visible at the page top and hidden in the scrolled sticky state. Reserve their space to keep the navigation aligned; the complete links remain clickable in both states. Returning to the top restores the arrows.

| Role | Canonical runtime owner | Consumer |
| --- | --- | --- |
| Chapter font | `app/layout.tsx`: local font `--font-chapter` | `.section-title-text` |
| Chapter ink | `app/globals.css`: `--chapter-ink` | `.section-title-text` |
| Chapter scale | `app/globals.css`: `--chapter-size`, mobile and Experience overrides | Main chapter openings |
| Body font | `app/layout.tsx`: `--font-body` | Body copy, secondary headings |
| Existing spacing | `app/globals.css`, `lib/portfolio-styles.ts` | Existing page and content groups |

## Do's and Don'ts

- Spend visual emphasis on main chapter titles; keep the content below calm.
- Check 320px phone layouts, longer titles, reveal completion, and sticky-header offsets.
- Do not reintroduce section numbers, side descriptions, role kickers, caption counters, or a separate résumé section.
- Keep the three-way title comparison as research evidence. The applied direction is the condensed film title card.
