# Camera-led Recent Work replacement

User request: 29 October 2026. The supplied annotated camera layout is the new direction for Work. Preserve the existing portfolio aesthetic and foundation brief.

## Confirmed structure

- Remove the previous project subjects and their visible project details from Recent Work. Keep Experience, achievements, and certificates elsewhere intact.
- Lead with personal projects shown as playable videos inside the screen of a camera. The user will supply the 3D camera model.
- Place the remaining projects below the camera with deliberate spacing and no additional overarching Projects heading.
- Category order: Clothing Brand, Documentaries, Team Introduction Video, Club Promotional Projects, Miscellaneous.
- All five categories appear vertically, one below another. Do not replace them with a single category-switching gallery.
- Categories will have subsections supplied by the user. The annotated reference describes a selected subsection brought forward, adjacent choices faded behind, and smooth transitions when changing the selection.
- Video sources will arrive through Drive links or uploaded files. Do not create invented projects, fake media, empty video cards, or use unrelated existing certificates as project covers.

## Confirmed playback interaction

- Reference: [Eyecandy](https://eyecannndy.com/), supplied by the user for its moving preview gallery. Adopt its preview-led feel within the existing violet portfolio identity.
- Video previews autoplay muted and loop inline while visible. Pause offscreen previews and background previews while the viewer is open. Respect reduced motion and provide a usable play affordance when autoplay is unavailable.
- Clicking any preview opens a large, near-fullscreen video dialog on the current page, following the existing View résumé popup pattern. Do not navigate to another page or require browser fullscreen.
- The expanded player exposes playback, sound, seek, and optional fullscreen controls. Preserve the original video aspect ratio without cropping the full player.
- Reuse the accessible shared Dialog primitive: close button, Escape, focus containment/restoration, and return to the same page position. Closing stops the expanded video's audio/playback.

## Awaiting assets

- Video-to-subsection mapping and preferred order for the remaining five project categories. The camera model, source folders, and four approved personal films are already supplied.

## Camera media selection

Source: the user's Personal Reels Drive folder. Download only KELLA.MOV, NEPAL.mp4, Readers.mp4, and Study.mp4. Use folder order until the user supplies a preferred order. Preserve source names for titles, with filename extensions removed.

Exclude Draft 2.MP4, for hg final cg.mp4, man recording finalest.mp4, meow finalest.mp4, mom final.mp4, plane intro final.mp4, scuba boat final.mp4, and Sitting final.mp4. The user's final correction excludes both Draft 2 and meow.

The original local camera folder contains camera.obj, camera.blend1, and PBR textures. It has been superseded by the user's downloaded pentax_k-1_dslr.glb. Preserve both original downloads.

## Remaining project subsections

- Clothing Brand: Freeland, TOCO, VIBGYOR, 4VALVES, DHEU.
- Documentaries: Admission Documentary, Nafew’s Documentary, Tech Autocrats. The approved source filenames are Admission Documentary.mp4, Nafew's DOC Final.mp4, and Tech Autocrats DOCU.mp4, from the original Documentaries subfolder. Publish each under its matching subsection.
- Team Introduction Video: Aerolite, BengalSub, Aqua Sentinel.
- Club Promotional Projects: DRMCSC, GSC, DITC, DICC, DRMCMUNA.
- Miscellaneous: Pathao, Xforce, WRG, Tech Autocrats, DCIMCH.

The user requests abbreviations on screen, not expanded club/institution names. DCIMCH refers to Dhaka Central Hospital in their clarification. They will guide the video mapping for these subsections.

Main source folder: https://drive.google.com/drive/folders/1EqBMbWMukife7CYonSememu30UJtnZfo

Documentaries source folder: https://drive.google.com/drive/folders/1tdnGHv9uH4pLZ9jFsOjhBV8qJmFUgbGO

Exclude Aqua Sentinel.mp4 and Team Intro BengalSub D2.mp4 from Documentaries. Keep the requested team-introduction subsections separate.

Research confirmed Freeland on freeland.com.bd, VIBGYOR on vibgyorclothing.com, DHEU on saralifestyle.com, BengalSub through its official LinkedIn account, Tech Autocrats on techautocrats.com, and Pathao on pathao.com. Do not map similarly named businesses to a project without evidence. The user corrected the subsection name to TOCO. Its source folder is TOCO BD in the original Drive link.

## Current implementation

The current model is PENTAX K-1 DSLR by tuma_youzyo/T_Y, supplied as GLB from Sketchfab under CC BY 4.0. `scripts/prepare-pentax-model.mjs` restores the bind pose to fold the monitor back, bakes static geometry, preserves UVs, and normalizes the axes. Following the sharpness revision, 2K base-color textures use lossless PNG with restrained edge sharpening; other maps remain optimized. The original 11.2 MB file becomes about 5.6 MB. Body/barrel/hood materials are opaque, fixing the original export's inappropriate alpha blending. Only optical glass retains transparency. Texture anisotropy and higher-density rendering improve oblique detail. Measured display, wheel, and bounds are in `lib/camera-model.json`. Attribution and changes appear in the small i disclosure beside the camera.

The camera stays centered and supports 360° orbit dragging, keyboard rotation, and Reset camera view. It eases back to its initial rear view on release, per the user's latest revision. Panning and wheel zoom are disabled. A vertical film rolls the entire camera 90°; inverse screen rotation keeps footage upright. Bounds fitting keeps all viewpoints inside the viewport. Framing is slightly closer than the first Pentax pass. Physical buttons depress on pointer/key down, remain pressed while held, and spring back on release, by moving only the isolated physical key components, with a slight rocker tilt and matching normals. No square hover/click overlay. Large arrows remain available. Clip switching is immediate, using preloaded elements. Do not restore LCD slide transitions.

The LCD uses subtle physical glass reflection, angle-dependent brightness, and small pause/play, battery, and actual preview-time indicators. Do not add fake recording lights, noisy scanlines, or effects that obscure footage. A brighter warm key, cool fill, restrained violet rim, neutral room reflections, and a soft shadow integrate the model with the fabric background. Keep black rubber and white print distinct without washing out body detail.

Previews are short silent web copies; the popup plays each complete film with audio and native controls. The model and all four preview files preload on site entry. `public/images/pentax-camera-poster.webp` is a transparent render shown immediately while the renderer initializes; no Loading camera text. Playback pauses offscreen, when the page is hidden, or while the viewer is open. A direct video fallback remains available if WebGL fails. The five groups use the approved category/subsection mappings below. Subsections awaiting the user's remaining assets retain explicitly labelled personal-film samples.

Rear-control labels are rebuilt from vector-authored lettering and symbols on 14 original button components, using a dedicated 1024px atlas with 256px per key. Their rubber material replaces the blurry baked legends; the source geometry remains intact at 17,740 triangles. Only the left/right keys carry press weights. Never restore a radial housing deformation or a painted dark spot. Desktop rendering uses 2x pixel density; mobile retains its capped density. LCD indicators render at 1024px. Regenerate the transparent startup poster when materials or lighting change.

## Category gallery implementation

The user authorized example videos to begin the five vertical sections. `lib/work-media.ts` owns the category/subsection mapping and falls back to the four approved personal clips where assets are pending, explicitly marked as sample footage. There is no additional Projects heading. The open grid preserves original aspect ratios; on phones landscape films span the width and portrait films form compact centered rows. Selectors support click, arrow keys, Home, and End, with a centered active name and smaller, faded choices receding to each side. Category headings are centered, and visible previous/next arrows provide an alternative to clicking names. Hover never translates text.

A shared WorkFilmProvider owns one same-page full-film dialog and global preview controls. Camera and gallery playback pause while it is open; full playback has native audio/seek controls. Offscreen gallery media pauses and defers loading until near the viewport. Reduced motion starts previews paused, with an explicit Play previews option. Source video errors leave the poster and full-film action available.

Per the screenshot removal request, the visible camera Watch film CTA, drag/reset toolbar, current film name, mute/pause row, four-thumbnail selector, and credits disclosure below the camera are removed. The LCD remains clickable, keyboard watch access remains, and source/license attribution is available in the camera i disclosure.

## Approved project-media batches

The user supplied the shared GFX/VFX folder and explicitly mapped 4VALVES to Clothing Brand; DICC, DITC, and GSC to Club Promotional Projects; and Pathao, Music Video, GRIC, and SIFT to Miscellaneous. Exclude Shopping Bag Motions, Designs, and individual Maldives postcard clips inside Personal Reels. Only FINAL DRAFT Rounded.mp4 is approved for 4VALVES; do not import FINAL DRAFT.mp4.

The next batch maps both 10MS WA D3 and WA D4, plus the other 10MS files, to Miscellaneous / 10MS. The second folder is Carats Necklace D2.mp4; the user confirmed a separate Miscellaneous / Carats subsection. Aerolite, BengalSub, and Aqua Sentinel belong to Team Introduction Video. The supplied avoid rafa.mp4 file is explicitly mapped to Clothing Brand / VIBGYOR. DCIMCH overview belongs to Miscellaneous / DCIMCH. These mappings take precedence over filenames or the source folder where a file also appears.

Approved source files are tracked in scripts/project-video-batch.json. Keep downloaded originals in the ignored .media-source/projects directory. scripts/download-project-videos.py downloads only this reviewed manifest; scripts/prepare-project-videos.py creates lightweight muted previews, posters, and browser-ready full films, publishing completed records atomically to lib/project-media.json. Preserve the source aspect ratio and audio in the full player. Keep each published file under the repository size limit. Do not publish partial downloads or encoding intermediates. Unassigned subsections continue to use the explicitly permitted sample footage until the user supplies their remaining files.

The latest correction replaces TOGO with TOCO in Clothing Brand. Use toco draft 3.mp4 from the original TOCO BD folder, mapped as TOCO film.

The user supplied four local Operation Diplomacy films for Club Promotional Projects / DRMCMUNA: Agent Initiated (Episode 1), Consensus Begins (Episode 2), The Double Game, and Last Directive, in that order. The local wrg.mp4 belongs to Miscellaneous / WRG. Copy originals into ignored storage without modifying the user’s Downloads files.

The rocker press uses shallow inward travel and tilt so the printed key face never sinks behind the housing. Keep pointer targets transparent in every active state; do not add a dark dot or radial shadow to imply a press.

The user confirmed the original Documentaries subfolder for all three documentary subsections, retaining the Aqua Sentinel and BengalSub exclusions. The local Fl Ed1 D2.mp4 and Fl Ed 2 D2 (1).mp4 belong to Clothing Brand / Freeland, in that order. Xforce Booth Ed D4.mp4 belongs to Miscellaneous / Xforce. Preserve all original Downloads files.

DRMCSC now includes the local 1st Reel D2.mp4, Reel 2 final.mp4, Reel 3.mp4, Reel 4 Final.mp4, Reel 5.mp4, Exhibition Deadline Extended.mp4, Wall Mag Teaser.mp4, 16th Robotics Teaser.mp4, Emotional SC.mp4, and Post Fest Final.mp4. All belong to Club Promotional Projects / DRMCSC. Present Reels 1 through 5 first, then the exhibition promotion, wall magazine teaser, robotics teaser, Emotional SC, and the post-festival film. Keep the original Downloads files untouched.

The 13 supplied DHEU films are now mapped to Clothing Brand / DHEU in the user's supplied order. All have actual silent previews, posters, and complete films. This replaces the DHEU sample footage. The catalog contains 81 published project films. Local source files with missing dots before mp4 are identified by content and stored with a correct .mp4 extension; Downloads originals remain untouched.

Final publication replaces the earlier sample-fallback behavior. Show only subsections with supplied films, retaining pending names in configuration for later imports. Miscellaneous / Tech Autocrats remains pending and hidden; its separate Documentary film is unchanged. Remove the sample-footage explanation from the public gallery.

Latest presentation changes: use Recent work as the chapter title; use concave solid chevrons for camera switching and a circular upward chevron for back to top. Model attribution and preview motion controls now live in the camera i disclosure instead of a footer or standalone toolbar. Increase framing slightly, add subtle fine-pointer model tilt with a static reduced-motion alternative, and render the actual playback time in clearer DM Sans. Film dialogs retain accessible names but remove visible titles and the empty title-bar space.
