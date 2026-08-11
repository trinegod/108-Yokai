# Performance budget

## Intent

The threshold should render a lightweight responsive poster immediately, then add shallow DOM/CSS dimensional treatment. Phase One intentionally ships no Three.js, React Three Fiber, WebGL, WebGPU, model, or post-processing dependency.

## Quality ladder

- Tier A: responsive poster, shallow parallax, resting Kintarō breathing, a desktop-only nine-frame entry sequence, continuously orbiting layered Hōju phase/glow, mist, motes, transition, and optional procedural sound.
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
| Threshold route component | 15,959 B | 4,124 B |
| Archive index component | 29,504 B | 8,701 B |
| Archive navigation component | 1,314 B | 600 B |
| Shared framework chunk | 190,152 B | 59,106 B |
| Shared application/runtime chunk | 169,627 B | 49,102 B |
| Global CSS | 59,240 B | 12,080 B |

| Responsive visual | File size |
|---|---:|
| Desktop actorless threshold, 1440px AVIF | 103,723 B |
| Desktop actorless threshold, 1440px WebP fallback | 167,806 B |
| Mobile actorless threshold, 941px AVIF | 127,055 B |
| Mobile actorless threshold, 941px WebP fallback | 208,274 B |
| Social preview JPEG | 198,336 B |

| Desktop activation asset | File size |
|---|---:|
| Initial transparent WebP frame | 50,820 B |
| Nine transparent WebP frames | 498,538 B |
| Sequence manifest | 1,663 B |
| Complete activation sequence | 500,201 B |

The activation frames are local raster derivatives rather than a runtime 3D dependency. They preload after the threshold has mounted; mobile and reduced-motion entry do not render or play the sequence.

Additional measured totals:

- Preserved source masters and working activation frames: 15 MB on disk.
- Versioned actorless working plates: 4.2 MB on disk.
- All optimized public art derivatives: 5.9 MB on disk; they are not all loaded on one route.
- Complete production output: 8.8 MB on disk.
- The most recent production build completed successfully. Elapsed build time is not treated as a stable field-performance metric.

## Evidence not yet collected

- Lighthouse scores.
- Core Web Vitals field data.
- Representative mid-range Android trace, memory, and energy profile.
- Real network waterfall under throttling.

Those belong to the release-hardening performance pass. No scores are inferred or invented here.
