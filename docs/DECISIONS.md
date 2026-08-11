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

All six source PNG masters and nine desktop activation JPEGs are copied to canonical names in `source-art/` and hashed. `scripts/process-assets.mjs` creates AVIF/WebP/JPEG/PNG derivatives only in `public/`. The script never overwrites a source master or working source frame.

## ADR-006 — idle and activation use separate asset truth

The provided Kintarō turnaround is an opaque multi-figure reference, not a threshold idle atlas. The resting threshold therefore keeps the approved full figure completely static and applies minute horizontal expansion only to a separately feathered shoulder/upper-torso overlay. The legs, feet, ledge, and background never receive the breathing transform.

The owner subsequently directed and approved a separate nine-frame desktop activation sequence. Its received cyan-matte JPEG sources remain unchanged, while the derivative pipeline produces registered alpha WebP frames for the deliberate ENTER ASHIGARA action only. Mobile retains the approved still treatment until an independent portrait sequence is supplied. Reduced motion never plays the activation frames.

## ADR-007 — original procedural entry audio

The optional entry cue is synthesized after a deliberate gesture with Web Audio. It combines a short square-wave impact and filtered noise with a restrained ascending game-start strobe and an approximately one-second tonal tail. The preference is stored locally, no third-party audio asset is used, and silence is the default complete state.

## ADR-008 — URL-addressable record chambers

Archive details use `?record=slug`. Opening and closing records updates browser history; Escape closes and returns focus to the triggering card. The server-rendered archive remains readable without a selected record.

## ADR-009 — structured local content before CMS

Ten Phase One records, sources, places, chronicles, assets, and locale status live in versioned JSON. TypeScript defines the contract and Node tests validate references. A CMS can replace storage later without rewriting routes.

## ADR-010 — publication only with authorization

The app remained local until the owner explicitly authorized a public preview and GitHub repository on 2026-08-10. `.openai/hosting.json` retains null D1/R2 declarations. No analytics service, CMS, database, authentication system, or custom production domain was added.

## ADR-011 — reversible aura and layered entry sound

The desktop power-up aura is a restrained CSS contour/wisp/spark enhancement behind Kintarō, never painted into the character frames. The previous no-aura threshold remains recoverable at commit `c030c04`, and the effect can be removed without regenerating or altering artwork. The optional sound path preserves the existing impact/start cue and adds a later, quieter procedural 8-bit vocal-like burst at the bent-arm peak; both remain gesture-triggered, controlled by one visible preference, and silent by default.
