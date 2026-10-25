# Media quality update

The star uses a transparent animated WebP made from the supplied video. This keeps the same ten-second rotation loop without depending on browser video autoplay or video compositing. A still WebP is used for reduced motion. The original MP4 files are retained.

The purple background uses a cleaned source image and a newly rendered twelve-second loop at 30 fps. Desktop output is 1920 by 1080 at CRF 16; the smaller mobile output is 1280 by 720 at CRF 18. Both use H.264 with fast start. A matching first-frame poster is used while loading and for reduced motion. The source image cleanup improves smoothness; it does not recover original photographic detail.

The cleaned source was created using the built-in image-generation tool and saved as `public/images/home-purple-texture-hq.png`. The tool returned a 941 by 1672 image. Render the videos with `scripts/render-satin-hq.py`. The original image and video are preserved.

Image edit prompt:

> Edit target: the supplied dark purple abstract satin background. Improve resolution and smoothness only. Preserve the exact large fold shapes, diagonal purple ribbons, dark negative spaces, black/deep violet palette, and original portrait 9:16 composition. Produce a high-resolution 2160x3840 version suitable as the source for an animated website background. Reconstruct clean smooth silky gradients and subtle surface definition so it looks crisp when animated and enlarged; remove JPEG blocks, grain, noise, muddy artifacts and banding. Keep the image dark and restrained so white website text stays legible. Do not add objects, stars, text, logos, patterns, new folds, dramatic lighting, or bright colors. No cropping or reframing. It should look like a faithful clean high-resolution restoration of the reference, not a redesign.
