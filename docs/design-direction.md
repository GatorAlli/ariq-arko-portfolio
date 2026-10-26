# Portfolio design direction

Apply the client's supplied foundation brief alongside the specific screenshot requests.

- Consistent navigation on all pages, including narrow phones.
- Controlled type sizes, line heights, paragraph widths and section rhythm.
- No Inter, decorative slashes, generic icon rows, glass cards, grain, scrolling fades, or cursor-following effects.
- Restrained full-width grey-to-mint navigation from the supplied reference, with legible dark text.
- The white name and purple selection frame belong in the dark two-column hero beside the original animated circle portrait.
- Keep the purple selection frame and static cursor; omit the cursor name label.
- Preserve accessible social links, search, résumé access and contact validation.
- Keep the footer removed as requested. Do not restore back-to-top or print controls from the generic brief.
- Do not import the unrelated Felix login, supplier, or order requirements.

Validated: production compilation and TypeScript; desktop and mobile preview; search opens, filters and closes; experience gallery selection; horizontal fit for About, Experience and Contact at 393px and Work at 768px. Landing navigation visually inspected at 320px.

## Additional reference

Reviewed https://www.slideshare.net/slideshow/businessacademic/239380492 (Basic Web Design Principles and Elements). Applied its relevant guidance on consistent visual language, aligned grids, balanced text and images, readable type and accessible navigation. Preserve the client's specific animation and composition requests.

Hero correction checked at 320px and 1920px: no horizontal overflow; full-width navigation background, shared content boundaries, framed white name beside the original animated portrait.

## Navigation and repetition cleanup

Use a dark navigation background and purple wordmark, divider and animated Get in touch CTA. Label social links Contact. Remove the location, résumé and visible search column; retain keyboard search. Keep the creator/community role only in the hero. Remove the portrait caption and the repeated Have a story in mind section from all pages.

## Latest masthead direction

Move the single framed ARIQ ARKO name to the full width of the navigation grid, following the MAYDA reference's scale. Keep the custom serif, purple selection frame and unlabeled cursor in the dark palette. The hero below retains the role line, story tagline and animated portrait without repeating the name.

Navbar links use locally bundled IBM Plex Mono, uppercase and compact, to approximate the reference lettering. The exact source font is unconfirmed. Keep Poppins for page copy and Gravitas One for the large name.

Use native internal anchors for reliable direct navigation in the static export; retain accessible button and dialog behavior.

## Width, scale and navigation refinement

Use fluid page containers with modest 20–48px gutters instead of a centered 1440px cap. Keep body copy line lengths controlled. Reduce the name to a 120px maximum and fit its frame to a 1020px maximum. Replace aa. with a vector A monogram. Navbar links gain a short underline reveal, slight horizontal movement and a pale-purple hover color; disable movement for reduced motion. Compact the early-school image and use a direct School years at DRMC caption.

Restore the original purple aa. wordmark. Add the supplied circular right-chevron icon to main navigation, social links and the Get in touch CTA using a CSS mask so it follows each link’s text and hover color.

Center the framed name above the full-width divider per the client’s annotated screenshot. Keep its frame at a 960px maximum and tighten the row gap and bottom padding.

## Homepage star media

Use the provided purple star-field image as a subdued homepage background, including the home header. Other pages keep their solid background. Place the supplied five-second rotating purple star video above the portrait’s right edge, looping muted and inline; pause for reduced-motion preferences or hidden documents. Preserve the original circle animation, restored aa. logo, circular navigation arrows and centered name.

Enlarge navbar links to 18px desktop, 16px tablet and 13px phone, keeping the monospaced style, proportional circular arrows and comfortable touch targets.

- Latest background replacement: use the supplied dark purple photographic texture across the homepage, with cover sizing and no tiling. Preserve the rotating star, larger navigation text, and original portrait animation.

- Star refinement: replace the cut-at-end clip with a 10-second forward/reverse loop using cosine timing, easing through each turnaround. Position the star in a dedicated space above the portrait, outside the entire morphing shape bounds, on desktop and mobile.

- Satin background motion: 12-second image-derived fluid displacement and shifting sheen, using periodic fields with identical first/final source frames. Locked framing; no pan or zoom. Website uses a muted 720p loop; separate 4K export is upscaled from the 1080p image-derived render. Static texture remains as fallback and for reduced motion.

- Header reference update: Explore and Contact links form pairs of two rows across the desktop header. Keep the logo at the left and animated contact button at the right. Reduce the centered name frame to 600px maximum and move the looping star to its upper-right corner. Phone links retain readable single columns with the navbar visible. Remove the old star space above the portrait.

- Latest scope: satin loop now mounts once in the shared root layout for every route, including resume and project pages. Transparent header and static fallback share the same site-wide background. Hide the video for reduced motion and printing. Remove both homepage hero buttons (View recent work and A little about me).

- Get in touch redesign: wide serif introduction, prominent direct email, clear phone/location details, and an editorial form with underlined inputs. Replace the dropdown with accessible native radio topic choices; keep validation and mail-draft behavior. Use the portfolio purple for the action. Small screens stack the contact details and form.
