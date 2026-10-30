# Landing portrait variants

The colour cutout is `ariq-arko-cutout.png`. Original photographs and the upscaled version are retained alongside it.

The current homepage portrait uses inline Tailwind classes in `app/page.tsx`, including a scale of `1.4` and a top-centered transform origin. To make it monochrome, add `grayscale contrast-[1.08]` to the existing image classes, retaining its crop and transform classes.

The older `hero-portrait` and `hero-portrait-monochrome` mappings remain in `lib/portfolio-styles.ts`. The older crop uses a scale of `1.8`; applying both mappings to the current homepage would change its framing.
