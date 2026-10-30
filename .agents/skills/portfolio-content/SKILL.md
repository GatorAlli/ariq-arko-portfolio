---
name: portfolio-content
description: "Update Ariq Arko's portfolio records, biography, resume, project descriptions, or supplied media while keeping pages and search consistent. Use for content changes in this repository."
---

# Portfolio Content

Resolve repository paths from this file's directory with `../../..`. Read the repository's `CONTENT-AUDIT.md` before changing factual claims.

## Content ownership

- `lib/portfolio-data.json` owns experience, awards, projects, certifications, events, participations, and milestones. `lib/portfolio.ts` exports them and builds navigation and search entries.
- `components/portfolio-records.tsx` renders shared record groups on section pages and `/resume`. Edit the data once rather than copying records into pages.
- `components/about-skills.tsx` owns capabilities, software groups, and languages. Homepage toolkit entries live in `app/page.tsx`.
- Education and introductory prose are embedded in `app/[section]/page.tsx` and `app/resume/page.tsx`; check both when changing those facts. Contact details live in `lib/portfolio.ts`.

## Source and link invariants

- Supplied corrections outrank the archived résumé. Freeland's certificate establishes September 2026 for one month. Leave unspecified years empty/omitted. Languages are Bangla, English, and Hindi; Japanese was excluded. New user instructions may supersede these decisions.
- Keep record `id` values stable and unique on each rendered page. They are search fragment targets. Project URLs use `key.toLowerCase()`; renaming a key changes public URLs. If a rename is requested, update callers and consider redirects for old links.
- Record groups require `id`, `title`, and `detail`; `year`, `issuer`, and `href` are optional. Preserve the current project and experience field shapes and any supplied certificate arrays.
- An experience certificate has `id`, `label`, and an `image` path relative to `public/`. The gallery anchor currently uses the first certificate's ID. Keep `/experience#freeland-certificate` working.
- The downloadable résumé is an original archive; do not silently overwrite it with edited claims. Keep the distinction from the current printable online résumé clear.
- Leave testimonials and media placeholders honest until replacements are supplied. Asset source notes are in `public/images/software/SOURCES.md`; font licenses are in `public/licenses/`.

## Verify the affected content

Run `npm run lint` and `npm run build` for data/component changes. Confirm changed records on their section page, `/resume` where applicable, and the search dialog. Follow search results to verify their URLs and fragment targets. Check image/PDF paths against actual files in `public/`. For documentation-only changes, check links and paths without rebuilding the app.
