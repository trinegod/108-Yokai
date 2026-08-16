# Architectural decisions

## ADR-001 — preserve the open repository

The current workspace was already an empty Git repository named `108 YOKAI`. The owner prohibited renaming an open repository without approval. Work stays at the existing root; intended future repository identity remains `108Yokai`.

## ADR-002 — Vinext/React/TypeScript capability path

The project uses the supplied Vinext starter structure, React 19, TypeScript, Vite, and Cloudflare-compatible worker output. It keeps the framework’s Sites plugin and avoids adding a CMS, database, authentication, analytics, global state library, or 3D dependency.

## ADR-003 — interactive 2.5D DOM/CSS over generic WebGL

The supplied threshold art is already a finished opaque composite, and the clean transparent Hōju/Kintarō production layers do not yet exist. Feathered Hōju compositing, pointer/touch/focus response, a core-light layer, and front/rear CSS transform planes provide the planned shallow dimensional behavior without turning the relic into generic CGI. The site ships no GPU dependency and accessibility remains independent from visual effects. A future isolated GPU relic remains optional and requires approved production assets plus profiling evidence.

## ADR-004 — art-directed responsive masters

The threshold uses `<picture>` source selection: the portrait master below 700px and the wide master above it. This prevents a center-cropped desktop composition from replacing the final mobile gaze and hierarchy.

## ADR-005 — nondestructive source pipeline

All six source PNGs are copied to canonical names in `source-art/` and hashed. `scripts/process-assets.mjs` creates AVIF/WebP/JPEG/PNG derivatives only in `public/`. The script never overwrites a source master.

## ADR-006 — still-based actor treatment is explicit

The provided Kintarō turnaround is an opaque multi-figure reference, not a 6–8 frame empty-handed threshold idle. The threshold therefore keeps the approved full figure completely static and applies minute horizontal expansion only to a separately feathered shoulder/upper-torso overlay. The legs, feet, ledge, and background never receive the breathing transform. Documentation labels the true idle sheet as backlog rather than claiming fabricated animation frames.

The typed `content/threshold-scene.ts` manifest exposes that status to the implementation: one approved still proxy is active, the target remains 6–8 discrete frames at 6–10 displayed frames per second, and reduced motion pins the approved still.

## ADR-007 — original procedural entry audio

The optional entry cue is synthesized after a deliberate gesture with Web Audio. It combines a short square-wave impact and filtered noise with a restrained ascending game-start strobe and an approximately one-second tonal tail. The preference is stored locally, no third-party audio asset is used, and silence is the default complete state.

## ADR-008 — URL-addressable record chambers

Archive details use `?record=slug`. Opening and closing records updates browser history; Escape closes and returns focus to the triggering card. The server-rendered archive remains readable without a selected record.

## ADR-009 — structured local content before CMS

Fourteen Phase One records, sources, places, chronicles, assets, and bilingual locale data live in versioned JSON. TypeScript defines the contract and Node tests validate references and provisional Japanese coverage. A CMS can replace storage later without rewriting routes.

## ADR-010 — publication only with authorization

The app remained local until the owner explicitly authorized a public preview and GitHub repository on 2026-08-10. `.openai/hosting.json` retains null D1/R2 declarations. No analytics service, CMS, database, authentication system, or custom production domain was added.

## ADR-011 — ASHIGARA is Gate 01

`108 Yōkai` is the planned umbrella collection and future portal identity; it is not a claim about a fixed folklore canon. ASHIGARA remains the product title and becomes Gate 01. Its threshold and four internal content routes stay cohesive, while later gates will be sibling experiences reached from a future global portal rather than nested inside ASHIGARA's navigation.

## ADR-012 — LEFT / RIGHT is an isolated Gate 02 atmospheric study

Gate 02 is implemented at `/left-right` as a sibling experience, not as a reskin of ASHIGARA. Its current proof is intentionally narrow: one preserved environment, an asymmetric split-title system, selectable directional tension, restrained pointer separation, rain, and optional sound. No archive schema or invented subject matter is attached before the owner chooses the gate's purpose. The supplied wide master is authoritative for the local desktop study; the phone treatment is clearly documented as temporary until an independent portrait authority arrives.

## ADR-013 — native rain enhancement and gesture-only source audio

LEFT / RIGHT uses a small route-local WebGL shader for transparent rain. It has no 3D library, model, physics engine, or semantic responsibility; device-pixel ratio is capped, animation pauses when hidden, and reduced motion removes the canvas. If context creation fails, the artwork, typographic object, controls, sound, and navigation remain complete.

The owner-supplied 32-second stereo WAV is preserved unchanged. A separate 30-second derivative crossfades its last two seconds into its beginning. The browser does not preload or autoplay it: playback starts only from the visible sound control, fades in and out, and remains optional.

## ADR-014 — MART¥RS becomes the current Gate 02 direction

MART¥RS supersedes LEFT / RIGHT in the portal index without deleting the earlier local route or its preserved source material. The current implementation lives at `/martyrs` as a sibling to ASHIGARA. Its visible title is a generated transparent image wordmark informed by the owner's blurred-futurist and modular Japanese-poster references. It reads `MART¥RS` without parentheses, uses a custom low-bar yen, and no longer shares the condensed 108 Yōkai type family. A strong static CSS-composited black blur bloom surrounds and falls slightly below the crisp image. The semantic heading retains the complete title. The abandoned sticker experiment remains preserved in `source-art/` but is not loaded by the route.

The owner-supplied 3840 × 2160 padded-room master is the desktop authority and the separately supplied 1440 × 3120 plate is the mobile authority. Neither is cropped, repainted, recolored, or generatively changed. Responsive `<picture>` sources select the portrait master below 700px and the wide master above it. The only animated atmosphere is a breakpoint-specific fluorescent failure around the eighth second of a 10.8-second cycle. Image-slice glitches, scene warping, type drift, and moving grain are intentionally absent. Reduced motion removes the flicker while retaining the static wordmark bloom.

The owner-approved 28.656708-second stereo WAV remains the preserved MART¥RS sonic reference. Runtime playback uses a 56.113417-second two-pass derivative with a 1.2-second circular crossfade so the browser's native loop restart is musically continuous rather than an audible stop. It uses `preload="none"`, never autoplays, and begins only from the visible sound button with guarded activation and a short fade. The preference is stored locally, but stored preference never bypasses the required gesture.

The masthead omits the redundant top-right `Gate 02` label while retaining the smaller `02 / FASHION EDITORIAL STUDY` proof line. The rare fluorescent failure runs by default and defers entirely to the operating system's reduced-motion preference, so it no longer needs a visible motion switch. Audio remains gesture-only behind one deliberately small editorial sound control; browser autoplay restrictions and the archive's accessibility threshold rule out hidden or automatic playback.

The remaining MART¥RS interface chrome is intentionally unboxed. The return link reads only `108Y` in solid black with one consistent typography, scale, weight, and spacing treatment; the speaker/mute control is an icon-only 44-pixel target without a visible border or panel. Both retain accessible names and keyboard focus treatment.

The mobile route omits the desktop editorial inset frame so the independent portrait artwork reaches the device edges. Because the 6:13 master and real phone viewports can differ by less than one CSS pixel, the owner approved a static 0.2% mobile-only bleed to cover any sub-pixel seam. This does not alter the canonical source file or change the subject composition perceptibly.

Gate 02 uses the owner-supplied no-target transparent industrial `02` sticker without code recoloring. The superseded yellow/red source remains archived, while small lossless derivatives of the black/bone/gray replacement use the same marker dimensions as Gate 01 on desktop and mobile.

The Portal Lab no longer renders Wall or Motion controls. Motion runs by default with no visible switch while the required reduced-motion preference still disables nonessential animation and pointer parallax. The gate index follows naturally below the hero under a large centered stack with `THE` above `BASEMENT.`

## ADR-015 — MART¥RS threshold becomes an editorial cover

The padded asylum room remains a fixed issue cover rather than becoming a vertical image feed. Three directly actionable cover lines are set into its open wall and link to `/martyrs/persona`, `/martyrs/unfinished`, and `/martyrs/below`. This preserves the original threshold composition while giving future features a repeatable content route instead of adding more full-screen wallpapers. On desktop, Persona and Below share the first row while Unfinished sits beneath Persona, reserving a fourth grid slot for the next editorial. Phones keep one stacked index and a fixed safe-area-aware sound control.

Each feature is a responsive magazine spread driven by the content layer. Persona and Below place their art on the left and Unfinished mirrors it on the right. All three use owner-supplied 2400 × 3000 desktop and mobile-labeled masters through breakpoint-specific `<picture>` sources. The six source files remain unchanged, and every runtime image is a nondestructive AVIF/WebP derivative with no crop or repaint.

The visual system pairs a high-contrast Didot/Bodoni-style serif with minimal monospaced folios. A one-time pair of opaque panels closes over the art and opens again on entry. The panels do not alter the image, do not loop, and are removed for reduced motion. The shared MART¥RS layout owns the gesture-only sound control so client navigation between the cover and editorials does not replace the audio element. Persona selects its own 30-second master while Unfinished and Below deliberately inherit the issue soundtrack until their individual audio masters are supplied.
