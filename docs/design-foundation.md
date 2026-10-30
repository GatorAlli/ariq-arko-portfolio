# Portfolio design foundation

The user's `C:/Users/nadid/Downloads/message (1).txt` is the foundation brief. Its reusable design requirements apply to this portfolio. The unrelated order-management example at the end is reference material, not a portfolio feature request.

- One cohesive, responsive portfolio for university admissions readers.
- Clear factual achievements, roles, dates, and outcomes. Remove filler and duplicate summaries.
- Strong hierarchy, consistent alignment, controlled text widths, intentional spacing.
- Premium typography without Inter or Space Grotesk. No serif italics as decorative accent words.
- Preserve the violet fabric background, framed identity, star, and supplied photography.
- Avoid generic cards, glass content panels, grain, excessive borders, gradients on headline text, or rounded highlights.
- No text translating on hover, navigation sweep underlines, scroll-fading sections, or cursor-following lines.
- Use quiet curved chapter transitions, larger unnumbered section titles over the uninterrupted fabric background so section boundaries are clear.
- Motion is restrained and decorative. Reduced-motion readers get static chapter curves and a static star.
- Headings reveal their words once as they enter the viewport, following the user's later request. Content sections never fade as a whole; hover text stays still.
- Navigation and search use anchors on the main page. Legacy URLs forward to the relevant anchor.
- Main chapter headers have no numbers or right-hand supporting descriptions. Project details stay out of the project list until the reader chooses View project.
- No visible photo captions or photo counters. Keep descriptive alternative text and accessible gallery controls.
- Work images carry a prominent organization/event name above the image. Omit the small date caption underneath; dates remain in the detailed evidence.
- A subtle background shade follows the active chapter: lighter in the introduction, darker for evidence-heavy experience, recognition, résumé, and contact. Preserve fabric motion without competing with text.
- No role kicker above the hero heading. Use an 8/16/24/32/48 spacing rhythm; do not stack padding on top of an existing content gap.
- The current user-requested trial uses uppercase Archivo Black 400 in solid pale violet for main chapter and category titles, paired with DM Sans for body text and smaller subsection selectors. Barlow Condensed and Sora are retained as earlier font explorations. The earlier Fraunces/Sora pairing remains recorded as a study, not the current chapter style. Keep Gravitas One only for the identity and IBM Plex Mono for navigation.
- Icon-only floating back-to-top control, prominent résumé access, accessible forms and focus states.
- Only the navigation stays sticky; the title and star scroll away. Its progress animation is a small violet marker with a short trail. Mobile navigation collapses into a compact menu.
- About me contains View résumé, opening the actual PDF inside an accessible popup on the same page, alongside Download PDF. There is no separate Résumé section. Download PDF saves it. No arrow decorations, explanatory résumé strapline, or duplicated online text résumé.
- Review narrow mobile widths, wrapping, cropping, spacing, overflow, and working anchor navigation before delivery.

## References reviewed

- [Awwwards personal collection](https://www.awwwards.com/websites/?text=personal)
- [Nahiyan Khan](https://nahiyan.codes/): deliberate typography and asymmetrical content grouping.
- [Ray Corral](https://raycorral.com/): strong image scale and unmistakable changes in composition between sections.
- [Self Aware](https://selfaware.studio/), via [Awwwards](https://www.awwwards.com/sites/self-aware): high contrast, deliberate type scale, and one focused accent.
- [Giats](https://giats.me/), via [Awwwards](https://www.awwwards.com/sites/https-giats-me): consistent type family, differentiated weights, and image-led project pacing.
- [Awwwards typography collection](https://www.awwwards.com/awwwards/collections/typography-in-web-design/): examples reviewed for editorial hierarchy and motion.
- [Fontpair](https://fontpair.co/): Fraunces and Sora paired in the Fieldnote brand kit. Fonts are served locally from the official Google Fonts sources with their OFL licenses.

These inform hierarchy and pacing. Their content and visual assets are not copied.

## Stronger section-title exploration

Compared a condensed film title card, a larger two-line Fraunces editorial treatment, and a bold two-line Sora treatment. The film title card provides the strongest separation from body copy and connects to Ariq's filmmaking work. Applied it consistently to About, Experience, Work, Recognition, and Contact, while preserving the framed Gravitas identity.

Runtime mapping: `app/layout.tsx` owns the self-hosted Archivo Black font through `--font-chapter`; `app/globals.css` owns `--chapter-ink`, `--chapter-size`, and `.section-title-text`. `PageIntro` and the custom chapter openings reuse this same class and existing reveal behavior. No badges, numbers, outline-only text, gradient lettering, panels, or extra copy.

References: [Ochi](https://ochi.design/) for bold condensed type and scale; [Awwwards / Longfellow](https://www.awwwards.com/inspiration/typography-longfellow) for large display typography. These are directional references; no assets or page layouts are copied.
