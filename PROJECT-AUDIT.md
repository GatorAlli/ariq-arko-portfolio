# Project audit — 24 October 2026

Reviewed all tracked application source, UI primitives, JSON data, configuration, dependency manifests, documentation, and the asset inventory. Also reviewed the sibling visual-check archive as historical evidence. Application code and dependencies were not changed during this audit.

No critical or high-priority defect was identified in the reviewed scope. Build, lint, TypeScript, main routes, downloads, search, and contact validation passed. The main remaining improvement is reducing first-load payload.

## Findings

Priorities: P2 = worthwhile performance improvement; P3 = maintenance or product polish.

### P2 — Homepage downloads the full portrait PNG

**Evidence:** `app/page.tsx:38` explicitly sets `unoptimized` on the priority portrait. `public/images/ariq-arko-cutout.png` is **1,336,071 bytes**. Every viewport receives the original image rather than an appropriately sized optimized variant.

**Impact:** More than 1.3 MB of image transfer on the homepage before accounting for other resources, particularly costly on mobile connections.

**Next step:** Test Next.js image optimization or supply smaller transparent variants, with accurate `sizes`. Compare the current crop and edge quality before switching. No measured Core Web Vitals regression is claimed; this finding is based on the asset and rendered implementation.

### P3 — Shared style/data modules enter the client bundle

**Evidence:** `components/site-header.tsx:3` imports the entire dynamic style mapping, and line 12 imports navigation/search from `lib/portfolio.ts`. Other client components also import these shared modules. The production build contains legacy `hero-portrait-monochrome` styling in a client chunk of **80,018 uncompressed bytes**; this is the size of the containing chunk, not the isolated cost of the map.

**Impact:** Server-only and retired styling remains available to client code; the header also needs the full derived search index. This increases payload and couples unrelated content to shared interactions.

**Next step:** Measure compressed bundle cost, then split shared/client style subsets or move appropriate static styling into CSS. Separate contact constants and search data if measurement justifies it. Search itself intentionally needs its searchable text; preserve search coverage.

### P3 — Search can stack over an open mobile menu

**Evidence:** `components/site-header.tsx:16–18, 27–36` maintains independent menu/search states. At 390 px, opening navigation and pressing Cmd/Ctrl K leaves **two open dialog elements**. Closing search returns to the still-open menu.

**Impact:** Two overlays and two dismissal steps for what appears to be a switch between navigation tools. The underlying dialog is hidden from the accessibility tree while search is active; no focus-trap failure was observed.

**Next step:** Close the menu when opening search, or use mutually exclusive dialog state. Recheck Escape and focus restoration. This is a polish issue rather than a demonstrated accessibility blocker.

### P3 — Regression checks are manual

**Evidence:** `package.json:5–10` defines only dev, build, start, and lint. No test suite or `.github/workflows/` configuration is tracked.

**Impact:** Search fragments, contact validation, project routes, and downloads can regress without an automated check before merge/deployment.

**Next step:** Add CI for install/lint/build/type checking and a small browser smoke suite covering those user-visible flows. Prefer meaningful behavior checks over snapshots of implementation details.

### P3 — Production discovery/sharing metadata is incomplete

**Evidence:** `app/layout.tsx:15–18` defines title and description only. There is no sitemap, robots route, canonical URL, `metadataBase`, or explicit social preview. `/sitemap.xml` and `/robots.txt` currently resolve to streamed HTML not-found responses with `noindex`.

**Impact:** No curated sitemap or predictable social preview is provided. Missing robots configuration does not by itself block indexing, and ordinary HTML links remain crawlable.

**Next step:** Once the real production domain is supplied, configure canonical/social metadata and publish a sitemap and robots response. Do not invent a production hostname.

### P3 — Runtime selection is not reproducible

**Evidence:** `package.json` has no `engines`/`packageManager` field and the repository has no runtime-version file. Next.js declares Node `>=20.9.0`; this audit ran on Node 26.0.0/npm 11.12.1.

**Impact:** Developers and hosting environments may choose different runtimes despite sharing a dependency lockfile.

**Next step:** Choose a supported runtime with the deployment owner and align a version file, package metadata, and hosting configuration. The README now documents the current minimum and audit environment.

## Review dimensions

| Dimension | Assessment |
| --- | --- |
| Security | Good within inspected scope: no API/database/authentication surface, no source-level secrets found in reviewed files, React-rendered content, encoded email draft, and zero npm advisories reported. This is not a penetration test. |
| Performance | Needs improvement: full-size priority portrait and broad client imports. Local fonts and mostly prerendered content are strengths. |
| Correctness | Core checks passed: known routes, search result navigation, gallery/data references, validation, and PDF responses. Streaming response behavior is documented below. |
| Maintainability | Shared records and reusable UI are strengths. Setup/agent guidance is now documented; CI, behavior tests, and runtime pinning remain absent. |

## Verification performed

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run build` | Passed; 17 generated pages, static/partial prerendering |
| `npx tsc --noEmit` (installed compiler) | Passed |
| `npm audit --json` | Zero reported vulnerabilities across the locked dependency tree |
| Main pages and four project pages | All 12 returned HTTP 200 HTML |
| Original résumé and Freeland certificate | Both returned HTTP 200 with `application/pdf` |
| Unknown section/project | Streamed missing-page response with `noindex` |
| `/skills` | Browser reached `/about#skills` |
| Search | “Oxford” returned the correct award; selecting it navigated to `/awards#oxford-mun` |
| Contact | Empty submission exposed all four field errors and focused the name input |
| Experience gallery | Freeland photo/certificate selection updated the pressed thumbnail state |
| Mobile layouts | At 390 × 844, home/about/experience/work/contact/résumé showed no horizontal document overflow or failed loaded images |
| Mobile menu/search | Both opened; keyboard shortcut reproduced the stacked-dialog finding |
| Data/assets | Record IDs and project slugs checked for duplicates; expected record fragments and local certificate references checked |
| Agent skills | All three passed the skill-creator validator; UI metadata parsed successfully |
| Final documentation diff | Whitespace check passed |

The first build failed because sandboxed Turbopack workers could not bind a local port. After enabling the required execution permissions and moving the failed generated cache aside, a fresh build passed. This was an execution-environment issue, not an application defect. A clean dependency reinstall was not performed; checks used the existing installed dependencies and lockfile.

## Expected behavior and content gaps

- Missing URLs can return HTTP 200 after streaming starts; Next.js injects `noindex`. `/skills` can carry its redirect in streamed HTML. These match the installed framework's documented behavior and were not counted as regressions. Monitoring must inspect the rendered result/content type rather than assuming all 200 responses are valid pages.
- Contact prepares a local email draft. No server delivery is implemented or promised. No email was sent during verification.
- Project/event media and testimonials remain honest placeholders pending supplied material.
- The original résumé PDF intentionally differs from current online records. Source decisions remain in `CONTENT-AUDIT.md`.
- Historical `../visual-checks/tailwind/` screenshots predate current content and include a retired research route. They are not current acceptance tests.

## Documentation and skills added

- Expanded `README.md` with prerequisites, repeatable installation, production preview, file/route map, content ownership, and troubleshooting.
- Extended `AGENTS.md` while preserving the framework-generated rules.
- Added local `portfolio-content`, `portfolio-ui`, and `portfolio-checks` skills with UI metadata.
- Corrected portrait-variant guidance that would have changed the current crop when applying a monochrome effect.

## Limits

No deployment, external biographical verification, email delivery, full screen-reader audit, print rendering, reduced-motion emulation, exhaustive browser/device matrix, or Core Web Vitals measurement was performed. Font licenses and logo attribution files were inventoried; legal ownership was not independently verified. Existing audit/history documents were preserved.
