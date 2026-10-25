# Ariq Arko Portfolio

A single-page portfolio for university applications, built with Next.js, TypeScript, Tailwind CSS, and customized shadcn/ui components.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. Development uses Webpack and the official Tailwind PostCSS integration for Windows compatibility.

For the static preview:

```sh
npm run build
npm start
```

The build exports the website to `out/`. The preview runs at `http://localhost:4173` and supports video byte ranges.

## One-page structure

The landing page contains the introduction, selected achievements, About and skills, Experience, Recent Work, Awards, and Contact. About me includes the résumé popup and download. Navigation and search target `/#section` anchors. Project details appear only after View project is chosen. View résumé opens the actual PDF in an accessible popup on the main page, and Download PDF saves it. Old page URLs forward to their matching section.

The presentation prioritizes verified roles, dates, achievements, and outcomes. Important numerical evidence is emphasized. Repeated introductory text and empty photo placeholders are omitted.

## Design

The site uses a dark purple palette, Gravitas One for the identity, Sora for body text and bold Barlow Condensed for main section titles, and IBM Plex Mono navigation. Inter and Space Grotesk are prohibited. Hover text stays stationary while arrow icons rotate in place. Repeated records use spacing and columns instead of divider lines. The original portrait animation and star placement are retained. Curved chapter separators and one-time heading reveals provide restrained motion. Reduced motion uses still media, static curves, and immediately visible headings. The foundation brief is recorded in `docs/design-foundation.md`.

## Content and components

- `lib/portfolio-data.json`: experience, awards, projects, events, and certifications.
- `lib/portfolio.ts`: navigation, section introductions, contact details, and search entries.
- `components/portfolio-section.tsx`: the main content sections.
- `components/project-showcase.tsx`: selected work and inline case details.
- `components/resume-viewer.tsx`: the actual résumé PDF popup used in About me.
- `components/single-page-navigation.tsx`: expands details when following a project anchor.
- `public/images/` and `public/media/`: local photos, artwork, and animations.
- `docs/media-quality.md`: background generation prompt and media encoding details.

## Interactions

Search opens with Ctrl K or Cmd K. Only the navigation stays sticky, with a small moving scroll-progress marker; the framed identity scrolls away. Mobile navigation has an expandable menu. Image galleries support keyboard selection. A floating arrow icon returns to the top after the introduction. Contact validates the required fields and prepares an email draft for the visitor to send. The website does not store or send messages.

The résumé popup uses high-resolution pages rendered directly from the original PDF, with zoom and scrolling. The source PDF remains downloadable. After replacing the PDF, regenerate previews using `scripts/render-resume.py` with Python, pypdfium2, and Pillow.
