# Performance budget

## Intent

The threshold should render a lightweight responsive poster immediately, then add shallow DOM/CSS dimensional treatment. Phase One intentionally ships no Three.js, React Three Fiber, WebGL, WebGPU, model, or post-processing dependency.

## Quality ladder

- Tier A: responsive poster, shallow parallax, continuous Kintarō breathing, entry-only aura/embers, layered Hōju phase/glow, mist, motes, transition, and optional procedural sound.
- Tier B: reduced visual effects under reduced-motion preference or future capability heuristics.
- Tier C: static responsive poster with entry, audio preference, and full navigation.
- Tier D: semantic DOM content and five usable routes even if visual effects or audio APIs are unavailable.

## Targets

- Route-split non-threshold interaction code.
- Do not load archive record art from the threshold.
- Responsive AVIF first with WebP fallback.
- No layout shift from image dimensions or external fonts.
- No audible autoplay.
- Pause/removal of nonessential motion under `prefers-reduced-motion`.
- No GPU requirement.
- Record actual local build artifacts; do not claim Core Web Vitals without field or Lighthouse evidence.

## Measured local artifacts — 2026-08-10

Measurements are from the successful production build on Node.js 24.18.0. They are artifact sizes, not field-transfer or Core Web Vitals claims.

| Artifact | Raw | Gzip |
|---|---:|---:|
| Threshold route component | 8,938 B | 2,933 B |
| Archive index component | 29,504 B | 8,700 B |
| Archive navigation component | 1,314 B | 600 B |
| Shared framework chunk | 190,152 B | 59,106 B |
| Shared application/runtime chunk | 169,627 B | 49,102 B |
| Global CSS | 52,439 B | 12,259 B |

| Responsive visual | File size |
|---|---:|
| Desktop threshold, 1440px AVIF | 152,774 B |
| Desktop threshold, 1440px WebP fallback | 229,374 B |
| Mobile threshold, 941px AVIF | 173,916 B |
| Mobile threshold, 941px WebP fallback | 259,964 B |
| Social preview JPEG | 198,336 B |

Additional measured totals:

- Preserved source masters: 14 MB on disk.
- All optimized public art derivatives: 4.2 MB on disk; they are not all loaded on one route.
- Complete production output: 6.9 MB on disk.
- Production build stages completed in roughly four seconds in the local workspace during the final implementation pass.

## Evidence not yet collected

- Lighthouse scores.
- Core Web Vitals field data.
- Representative mid-range Android trace, memory, and energy profile.
- Real network waterfall under throttling.

Those belong to the release-hardening performance pass. No scores are inferred or invented here.
