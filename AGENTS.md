# Project instructions

BE SHORT AND CONCISE.

- Work from this directory; the parent workspace is not the Git repository.
- Read `README.md` for setup and file ownership, and `CONTENT-AUDIT.md` before changing biographical claims. `PROJECT-AUDIT.md` records findings, not automatic authorization to implement them.
- Use the relevant local skill:
  - Content, records, résumé, assets: [portfolio-content](.agents/skills/portfolio-content/SKILL.md).
  - Layout, styling, components, interactions: [portfolio-ui](.agents/skills/portfolio-ui/SKILL.md).
  - Audits, builds, routes, regression checks: [portfolio-checks](.agents/skills/portfolio-checks/SKILL.md).
- Run checks appropriate to the change. Report actual results and any unverified behavior. Keep the npm lockfile in sync when dependencies change.
- Preserve supplied facts, archived PDFs, font licenses, and logo attribution. Contact currently prepares an email draft; do not claim delivery.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
