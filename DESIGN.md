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
    fontFamily: "Archivo Black, Arial, sans-serif"
  body:
    fontFamily: "DM Sans, sans-serif"
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
    reason: Shared components remain canonical; gallery and player behavior is documented below.
---

# Ariq Arko Portfolio

## Overview

This is a brand and content portfolio, not a dashboard. Its primary reader is a university admissions reviewer scanning film, student leadership, community work, and verified achievements. English is the interface language. The subject is a filmmaker and student leader based in Dhaka.

The current user-requested type trial is a film title card with broad Archivo Black lettering, calmer DM Sans text, and a restrained violet accent. [Ochi](https://ochi.design/) informed the use of condensed display type and scale. The [Awwwards Longfellow typography reference](https://www.awwwards.com/inspiration/typography-longfellow) informed the exploration of large titles. These are directional references, not copied layouts or assets.

The user's foundation brief and subsequent decisions are maintained in [docs/design-foundation.md](docs/design-foundation.md). Preserve the purple fabric, framed identity, rotating star, supplied photography, single-page structure, and factual content.

## Colors

The moving violet fabric remains visible. Main chapter titles use solid pale violet, distinct from white body headings. Do not use gradient lettering, outline-only text, bright rectangular title panels, or extra decorative highlights.

Runtime tokens remain canonical (Model B). This file records their accepted roles and rationale rather than generating a competing theme.

## Typography

Main chapters use Archivo Black, uppercase, with a line height of 1.04. The font is loaded at its real 400 weight; its black drawing supplies the visual weight without synthetic bold. Container-based sizing accommodates its broader letterforms, including Recognition on narrow phones. Long Experience titles use a smaller responsive size to balance their photograph. Titles may wrap naturally; never crop words to force a line.

DM Sans is the complementary Google font for body text, individual records, and smaller subsection selectors. Work category and record-group headings also use Archivo Black. The preceding Barlow Condensed and Sora pairing remains available in the font assets as an earlier exploration. Gravitas One is reserved for the framed ARIQ ARKO identity. IBM Plex Mono remains navigation lettering. No Inter or Space Grotesk. No decorative serif italics. The preceding Fraunces treatment is an explored alternative, not the active chapter style.

## Layout

Retain the existing page gutters and content grid. Keep chapter headings separate from project titles through family, weight, size, and color. Do not add filler text or enlarge blank vertical gaps to create emphasis. Preserve the compact sticky mobile menu and the scrolling title/star masthead.

## Elevation & Depth

The fabric provides depth. Text may retain its quiet black legibility shadow; it must not acquire a glowing halo. Keep glass limited to navigation. Do not add card or panel treatments around chapter headings.

## Shapes

Existing controls use mostly square edges with a 2px radius. Chapter curves stay thin and quiet. Their animation must remain curved through the whole loop. No numbered badges or repeated divider rules.

## Components

The shared `.section-title-text` class owns every main chapter title, including About, Experience, Work, Recognition, and Contact. `PageIntro` and custom openings reuse it. Secondary records and project labels use DM Sans; shared section and category headings use Archivo Black.

The existing word reveal plays once on entry, never on hover. Text stays available without JavaScript. Reduced-motion readers see immediately visible titles and static curves. Preserve semantic headings, unclipped letterforms, anchor destinations, accessible focus, and the existing résumé popup behavior.

Navigation links and work subsection labels reuse Eyecandy’s centre-out underline timing: 300ms with cubic-bezier(.77,0,.175,1). The line belongs to the text span, including each wrapped line, rather than the button width or reserved arrow space. Text stays stationary. Keyboard focus receives the same cue, touch keeps its selected state, and reduced motion shows the end state without animation. Runtime owners are `.hover-target` and `.hover-label` in app/globals.css.

Navbar arrows are visible at the page top and hidden in the scrolled sticky state. Reserve their space to keep the navigation aligned; the complete links remain clickable in both states. Returning to the top restores the arrows. Center the Get in touch text over the reserved arrow space while scrolled. The shared contact-orbit style reads --contact-label-size and --contact-inline-padding; use 18px labels on desktop and responsive 13–15px labels on phones. At 360px and below the contact button shows text only to preserve its centered label and avoid crowding. Do not add competing important font-size rules.

The mobile header is pitch black at the top and while sticky. Its shared directory-inner uses a wrapping flex row with justify-content: space-between and align-items: center. The logo and contact slots have equal flex bases, keeping the 72px Menu trigger at the exact viewport center. Main and social navigation each fill a separate row when expanded. Use symmetric 14–20px horizontal padding and retain a 44px minimum touch target. The mobile menu uses visible Menu/Close labels and a turning chevron rather than an unexplained X. Match the aa. wordmark with DM Sans 600; scale the menu label from 20 to 22px with restrained tight tracking and readable bright violet. Keep a 44px touch target, an accessible Open/Close navigation label, and the expanded state. Expanded links use 15px type and 48px touch targets. Escape closes the menu and restores focus to its toggle. This supersedes the earlier icon-only direction for older mobile readers.

The aa. wordmark is a Refresh page button. The separate floating arrow owns back-to-top navigation.

The contact message field starts at one content line, with its bottom rule directly beneath the placeholder. Grow and shrink it with entered text, wrapped lines, font loading, and viewport width. Keep all text visible without an inner scrollbar or manual resize handle; retain the native label, focus treatment, and validation.

The What I excel at and My Stack headings use larger pale-violet Archivo Black at 30–50px. The work chapter is named Recent work. The floating back-to-top button uses the circular upward chevron from the user reference. Omit the small email-app instruction beside Prepare email.

The contact title fills the available width with larger Archivo Black lettering; the navbar contact button also uses a larger label. Work categories use centered pale-violet Archivo Black at 30–64px, separate from DM Sans subsection selectors. Remove the Beyond the everyday block and its search entries from About me.

Experience galleries show certificates before supporting photos. The DRMC Science Club gallery opens with Ariq's Joint Secretary certificate, rendered sharply from the supplied original PDF without cropping its borders or signature area.

The DAKKHINNO experience entry includes the supplied Certificate of Appreciation for Ariq Arko as Founding President. Serve the original PNG in the existing certificate gallery with object-contain so its full border and signatures remain visible.

Keep camera rocker travel shallow enough that its printed face stays above the housing while held. The transparent hit targets have no native button paint, active shadow, or tap highlight. Preserve the visible keyboard focus ring.

Work uses the supplied Pentax K-1, with its articulated monitor folded flush and personal films playing inside its rear LCD. Keep restrained glass reflection, angle-dependent screen brightness, and small actual-playback indicators. The physical wheel presses inward on click without a square highlight. Clear external arrows switch films immediately; do not slide or fade between clips. Preload the model and four silent previews on opening the site, and show the rendered camera poster immediately while WebGL warms up. Never display Loading camera text. Pause offscreen media and preserve a direct video fallback.

The camera stays centered during 360° drag rotation and eases back to its starting rear view when released. Panning and wheel zoom are disabled. Keep keyboard rotation and Home to reset the view, without a visible rotation toolbar. Selecting a vertical film turns the whole camera 90°, while the footage remains upright inside the display. Fit the model through rotation without clipping, with the closer user-requested framing. Keep solid body and barrel surfaces opaque; only the optical lens and LCD glass are transparent. Preserve lossless 2K color textures, anisotropic filtering, and crisp high-density rendering. A held hardware button remains depressed and springs back when released, with actual isolated-key depth movement, a slight mechanical tilt, and matching normal rotation. Use a warm key, cool fill, quiet violet rim, and a soft physical shadow. Replace blurry rear-control print with vector-authored labels mapped to the original button components; preserve geometry and avoid painted click shadows. Keep the startup poster matched to current materials and lighting. The closer framing uses a 1.09 fit margin and a matching 1.07 poster scale. A separate model parent adds a gentle mouse-driven tilt, recenters on pointer exit, and stays still for reduced motion; touch and keyboard retain direct rotation and tilt. Reduced motion removes automatic roll/return easing. Clicking the camera LCD, or using its keyboard watch action, opens the shared accessible dialog, preserving aspect ratio and scroll position. The visible Watch film button, rotation instructions/reset button, current-film title, thumbnail selector, and standalone credit block are removed. Model attribution lives in a small i disclosure beside the camera, including source, author, license, and adaptation notice. The disclosure also holds preview pause/play, dismisses on outside click or Escape, and has a 44px target around its 18px icon. Do not duplicate the credit in the footer. External camera arrows use the supplied solid concave-chevron silhouette. The camera time display uses DM Sans 600 at a larger texture size. Film popups have screen-reader titles without a visible title bar; the video fills the recovered space and Close overlays the upper corner. The five categories and pending mappings remain in [docs/work-showcase-brief.md](docs/work-showcase-brief.md).

Work galleries follow the camera vertically: Clothing Brand, Documentaries, Team Introduction Video, Club Promotional Projects, and Miscellaneous. Do not add an overarching Projects heading. Keep organization/subsection names above moving footage. Use an open, square-edged grid that preserves landscape and portrait proportions, with a full-width landscape tile above a compact portrait row on phones. Wrap larger collections into balanced rows rather than shrinking every film into one row; keep single-film galleries centered at a bounded height. Category headings are centered. A cover-flow selector keeps the selected subsection centered in front; its neighbors recede to the sides through depth, scale, and opacity. Use clear previous/next controls, with native tabs and arrow-key selection. Long names wrap within the selected slot. Hover changes color without moving words. Keep selectors keyboard accessible.

The finished gallery publishes only actual supplied films: 81 mapped project films, including all 13 DHEU clips. Pending subsection names remain in the approved configuration but are hidden until their real media arrives. Do not reuse personal-film samples as commissioned work. The centralized work player owns the accessible dialog and preview pause state. Previews loop muted only near the viewport, stop while offscreen or while a film is open, respect reduced motion, and can be paused together. The full player preserves the source aspect ratio, allows audio, and restores focus and scroll on close. Runtime owners: `components/work-film-player.tsx`, `components/work-project-galleries.tsx`, `lib/work-media.ts`, `lib/project-media.json`, and `app/work-gallery.css`. 10MS and Carats are separate Miscellaneous choices. Source/license attribution lives in the camera i disclosure. The standalone Pause previews toolbar is removed; its control remains inside that disclosure.

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
- Keep the three-way title comparison as research evidence. The current trial uses Archivo Black and DM Sans for the film title card.
