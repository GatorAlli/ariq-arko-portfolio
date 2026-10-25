<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

## Typography preferences

- Never use Inter or Space Grotesk in this project, including font imports and fallback stacks.
- Use bold uppercase Barlow Condensed in pale violet for main chapter titles, following the user-requested stronger title exploration. Use Sora for body text and secondary headings. Preserve Gravitas One for the framed identity and IBM Plex Mono for navigation. Never clip descenders during heading reveals.

## Copy preferences

- Avoid em dashes in visible website copy. Prefer a full stop, comma, colon, or parentheses. If an em dash is specifically necessary, use no more than one per sentence.

## Portfolio direction

- Keep the portfolio on one main page. Navigation and search must target its section anchors; old page URLs should forward to the matching section.
- Prioritize a university admissions reader: show verified achievements, roles, dates, and outcomes clearly, and avoid repeated copy or empty media placeholders.
- Keep hover text stationary. Do not translate words upward or sideways. Use restrained color changes and in-place arrow-icon rotations instead of navigation underlines.
- On desktop, keep the gap from the wordmark to Explore equal to the gap from the final social link to Get in touch.
- Use large unnumbered section headings with clear, direct titles. Omit the short descriptions to their right and keep the fabric background continuous. Reduce decorative dividers and box outlines; separate repeated records with typography, spacing, and balanced columns.
- Back to top is a floating arrow icon with an accessible label and no visible text. It appears after scrolling beyond the introduction.
- Keep only navigation sticky. The framed name and star scroll away normally. Show reading progress with a small moving violet marker and short trail. Mobile navigation uses a compact expandable menu.
- Keep navbar arrows visible at the top, hide them while scrolled, and restore them on return to the top. Reserve their space so links do not shift; keep every link clickable in both states.
- Résumé access belongs in About me, with View résumé opening a zoomable popup of the original PDF pages and Download PDF saving the source. Do not add a separate Résumé section.
- Avoid decorative numbered category kickers such as "01 · Creative" in skills, projects, and section headers. Use meaningful headings directly.
- The user's `message (1).txt` is the foundation brief. See `docs/design-foundation.md` for its portfolio-specific requirements. Use restrained animated curves and clearly distinct chapter openings, with a static reduced-motion alternative.
