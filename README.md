# Ariq Arko Portfolio

A dark-only portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and customized shadcn/ui components.

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Next.js. `npm run build` creates a production build; `npm start` serves it.

## Design

- Onyx `#080F0F`, purple `#AA00FF`, lime `#C6FF00`, and porcelain `#FDFFFC`.
- Gravitas One for display type, Poppins for body text, Neonderthaw available for handwriting.
- Landing page contains only the shared navbar and the four ARIQ columns.
- Purple Contact button has a rotating conic-gradient border and restrained glow. Reduced motion shows a static border.
- No light theme or theme toggle.

## Pages and content

`/about`, `/experience`, `/skills`, `/work`, `/research`, `/awards`, `/testimonials`, `/contact`, and `/resume` are available alongside four individual project pages under `/work/`.

Edit CV-backed experience, awards, and projects in `lib/portfolio-data.json`. Page titles, descriptions, navigation, and search entries are in `lib/portfolio.ts`. Research and testimonials use empty states until approved content is available.

The portrait and original résumé are local files under `public/images/` and `public/documents/`. Experience and project images currently use the labeled `PhotoPlaceholder` component. Replace individual placeholders with `next/image` when real media is supplied, retaining their aspect ratio and meaningful alt text.

## Interactions

- Site search works across pages, projects, and experience; open it with the search button or Cmd/Ctrl K.
- Responsive navigation uses an accessible dialog, supports Escape, and restores focus.
- Contact validates required fields and prepares a mailto draft. Visitors send the draft in their own email app. No message is stored or sent by this website, and no email provider credentials are configured.
- Résumé download, email copy, back-to-top, a scroll progress indicator, loading state, and black-and-white print styles are included.
- shadcn configuration is in `components.json`; reusable UI primitives are in `components/ui/`.
