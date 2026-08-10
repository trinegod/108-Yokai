# Repository guidance

## Identity

- Product title: **ASHIGARA — The Living Archive**.
- Intended repository identity: `108Yokai`. The currently open local folder is named `108 YOKAI`; do not rename it without owner approval.
- `108 Yōkai` is a future collection identity, never a claim about a fixed folklore canon.
- Keep all work local. Do not publish, deploy, create a remote, or change remote configuration without explicit owner approval.

## Locked threshold rules

- The supplied desktop and mobile masters are the visual authority for their respective breakpoints.
- Kintarō remains empty-handed, planted, and subtly alive; never fuse him to the axe.
- The full-height axe remains a separate, stationary interaction layer. Preserve its scale, shallow burial, crater, and angle.
- Preserve the Hōju silhouette, palette, internal material, and water/flame/ink/calligraphic behavior.
- Mobile is independently composed from the portrait master. Never center-crop the desktop master for phones.
- Never repaint, recolor, crop, deform, or generatively improve source masters. Preserve originals in `source-art/` and generate derivatives into `public/assets/`.

## Content and cultural integrity

- Keep tradition, variants, and original ASHIGARA adaptation visibly separate.
- Every published factual record needs real source IDs. Label legendary, traditional, approximate, and historical locations accurately.
- Do not invent Japanese spellings, translations, dates, regional claims, quotations, research depth, or rights.
- Draft records are excluded from the production index.
- New records, sources, places, chronicles, locales, and assets must be added through the content/manifest layer rather than view rewrites.

## Interaction and accessibility

- Entry works with keyboard, pointer, and touch; prevent double activation.
- Never autoplay audio. Audio begins only after a deliberate gesture, has a visible toggle, and stores preference locally.
- Honor `prefers-reduced-motion`; remove parallax, idle motion, and camera push while keeping complete navigation and feedback.
- Maintain WCAG 2.2 AA-oriented focus, contrast, semantics, target size, and non-color cues.
- Canvas/GPU effects are enhancement only; all content and navigation must work without them.

## Performance and validation

- Threshold loads only its responsive poster and small local code; archive/atlas/chronicle assets stay route-scoped.
- Cap visual effects and device-pixel assumptions. Prefer compositing over adding a 3D dependency unless measurements justify it.
- Required checks before handoff: `npm run lint`, `npm run typecheck`, `npm run test:content`, `npm run build`, `npm test`.
- Inspect `/`, `/archive`, `/atlas`, `/chronicles`, and `/about` at real desktop and phone sizes. Capture only real screenshots.
- Documentation and README claims must match implemented behavior and measured results.

