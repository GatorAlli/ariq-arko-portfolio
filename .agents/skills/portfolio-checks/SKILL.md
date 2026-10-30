---
name: portfolio-checks
description: "Audit or verify Ariq Arko's portfolio builds, dependencies, routes, assets, and user interactions. Use for project health reviews and regression checks in this repository."
---

# Portfolio Checks

Resolve repository paths from this file's directory with `../../..`. Read `AGENTS.md`, `README.md`, and the relevant installed Next.js docs. Treat `PROJECT-AUDIT.md` as dated evidence; rerun checks before calling a finding current.

## Baseline

Inspect `git status --short` first. For a broad audit, run `npm run lint`, `npm run build`, `npx tsc --noEmit`, and `npm audit`. Run the standalone type check after the build so generated route types exist. An npm advisory result is time-sensitive and is not proof that all code is secure.

Do not run development and production builds against the same `.next` directory at once. If Turbopack fails with a local-port permission error, distinguish the environment restriction from a source defect. If needed, stop only servers started for this task, preserve stale generated output by moving it aside, and rebuild with appropriate execution permissions. Do not edit configuration merely to conceal a failed check.

## Production behavior

Start an isolated preview with `npm start -- --hostname 127.0.0.1 --port <available-port>` after a successful build. Stop that process when finished unless the user wants it left running.

- Verify `/`, `/about`, `/experience`, `/work`, `/awards`, `/testimonials`, `/contact`, `/resume`, and each project slug from `lib/portfolio-data.json`.
- Verify `/skills` reaches `/about#skills`, an unknown section and project show the custom missing-page screen, and both PDFs under `public/documents/` return PDF content.
- Current Cache Components/Suspense behavior can return HTTP 200 for streamed not-found pages with `noindex`, and stream a redirect without a 3xx header. Assert rendered behavior and metadata as well as status. Consult the installed `not-found` and `redirect` docs before calling this a regression.
- Check real record search and result navigation, no-results feedback, mobile menu/Escape/focus, gallery selection, contact empty/invalid fields and first-error focus, copy-email feedback, and affected downloads. Do not send messages during an audit.
- For layout work, inspect desktop and mobile overflow and image loading. For print/motion work, explicitly verify print preview/reduced motion. Historical screenshots in `../visual-checks/` do not prove current behavior.
- Validate stable record IDs, unique project slugs, search fragment targets, and local asset references. Follow the source decisions in `CONTENT-AUDIT.md`; do not invent facts to fill gaps.

## Report

Prioritize reproducible findings with file/line references, user impact, and a concrete next step. Separate bugs, improvements, intentional empty states, and environment limitations. Include commands/results and untested areas. An audit request alone does not require implementing every recommendation. Keep the response concise and link a detailed report when useful.
