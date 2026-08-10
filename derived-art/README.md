# Derived threshold art

These files are versioned working derivatives, not replacements for the six canonical owner-supplied masters in `source-art/`.

## Actorless clean plates

- `clean-plates/ashigara-threshold-desktop-actorless-v1.png`
- `clean-plates/ashigara-threshold-mobile-actorless-v1.png`

They were produced on 2026-08-10 with the built-in OpenAI image-editing workflow in two constrained passes:

1. Remove only the Hōju and reconstruct the sky, clouds, mountain, mist, and forest behind it.
2. Remove only Kintarō and reconstruct the forest/ledge behind him while retaining the independently planted axe.

Both prompts required the original framing, Mount Ashigara composition, palette, lighting, planted axe, crater/ledge, and all unrelated elements to remain as faithful as possible, with no new objects, text, logo, or watermark. The mobile prompt additionally locked Kintarō's source pose and upward gaze before removal.

The site draws the visible Kintarō and Hōju from the approved masters as masked moving layers over these plates. This prevents a static baked-in copy from appearing behind the animated copy. `scripts/process-assets.mjs` normalizes dimensions and creates the production AVIF/WebP files nondestructively.

These are AI-assisted inpainted working plates, not claimed source-authored separation mattes. Future source-approved transparent layers can replace them without changing the threshold component or archive routes.
