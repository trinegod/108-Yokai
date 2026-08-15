# Performance budget

## Intent

The Gate 01 threshold should render a lightweight responsive poster immediately, then add shallow DOM/CSS dimensional treatment. Gate 01 intentionally ships no Three.js, React Three Fiber, WebGL, WebGPU, model, or post-processing dependency. The preserved LEFT / RIGHT study includes an optional dependency-free native WebGL rain layer. The current MART¥RS Gate 02 direction uses CSS compositing only.

## Quality ladder

- Tier A: responsive poster, shallow parallax, shoulder-only Kintarō breathing, continuously orbiting layered Hōju phase/glow, mist, motes, transition, and optional procedural sound.
- Tier B: reduced visual effects under reduced-motion preference or future capability heuristics.
- Tier C: static responsive poster with entry, audio preference, and full navigation.
- Tier D: semantic DOM content and five usable routes even if visual effects or audio APIs are unavailable.
- Gate 02 Tier A: responsive environment, split typography, capped pointer separation, native rain, animated texture, directional controls, and gesture-only sound.
- Gate 02 Tier B: static responsive environment and typography with complete direction, sound, and return controls when reduced motion is requested or WebGL is unavailable.
- MART¥RS Tier A: uncropped responsive desktop art, generated image masthead with a strong static blur bloom, one rare fluorescent failure, static grain, and gesture-only sound.
- MART¥RS Tier B: static breakpoint-specific art and crisp image wordmark with complete sound and return controls.

## Targets

- Route-split non-threshold interaction code.
- Do not load archive record art from the threshold.
- Responsive AVIF first with WebP fallback.
- No layout shift from image dimensions or external fonts.
- No audible autoplay.
- Pause/removal of nonessential motion under `prefers-reduced-motion`.
- No GPU requirement for Gate 01 or for Gate 02 content/navigation; Gate 02 rain may use a capped optional GPU canvas.
- MART¥RS uses no GPU canvas. Phones request the independent portrait derivative rather than the 16:9 desktop art.
- Record actual local build artifacts; do not claim Core Web Vitals without field or Lighthouse evidence.

## Measured local artifacts — 2026-08-11

Measurements are from the successful production build on Node.js 24.18.0. They are artifact sizes, not field-transfer or Core Web Vitals claims.

| Artifact | Raw | Gzip |
|---|---:|---:|
| Threshold route component | 11,724 B | 3,053 B |
| Archive index component | 15,198 B | 3,993 B |
| Archive navigation component | 1,861 B | 772 B |
| Global CSS | 69,291 B | 13,507 B |

| Responsive visual | File size |
|---|---:|
| Desktop actorless threshold, 1440px AVIF | 152,774 B |
| Desktop actorless threshold, 1440px WebP fallback | 229,374 B |
| Mobile actorless threshold, 941px AVIF | 173,916 B |
| Mobile actorless threshold, 941px WebP fallback | 259,964 B |
| Social preview JPEG | 198,336 B |

## Measured Gate 02 artifacts — 2026-08-13

These are local source and generated-file sizes, not network-transfer or runtime-performance claims. The audio file is never preloaded and is fetched only after a deliberate visitor gesture.

| Artifact | Raw | Gzip |
|---|---:|---:|
| LEFT / RIGHT route component | 8,144 B | 2,337 B |
| Native rain component | 6,187 B | 2,151 B |
| Global CSS after Gate 02 | 131,327 B | 24,729 B |

| Responsive visual / audio | File size |
|---|---:|
| LEFT / RIGHT environment, 1920px AVIF | 70,153 B |
| LEFT / RIGHT environment, 1920px WebP fallback | 133,786 B |
| LEFT / RIGHT environment, 2560px AVIF | 99,217 B |
| LEFT / RIGHT environment, 2560px WebP fallback | 198,660 B |
| Gesture-only 30-second WAV loop | 5,760,044 B |

Additional measured totals:

- Preserved source masters: approximately 16.0 MiB on disk.
- Versioned actorless working plates: approximately 4.2 MiB on disk.
- All optimized public art derivatives: approximately 7.1 MiB on disk; they are not all loaded on one route.
- Complete production output: approximately 10.3 MiB on disk.
- The production build stages reported approximately 4.6 seconds of aggregate transform/render time in the final local validation pass.

## Measured MART¥RS artifacts — 2026-08-14

These are local raw/generated-file sizes, not field-transfer or Core Web Vitals claims. The WAV uses `preload="none"` and is requested only after a deliberate visitor gesture.

| Artifact | Raw | Gzip |
|---|---:|---:|
| MART¥RS route component | 8,232 B | 2,296 B |
| Global CSS after MART¥RS | 144,511 B | 26,680 B |

| Responsive visual / audio | File size |
|---|---:|
| MART¥RS environment, 1920px AVIF | 150,138 B |
| MART¥RS environment, 1920px WebP fallback | 246,002 B |
| MART¥RS environment, 2560px AVIF | 192,981 B |
| MART¥RS environment, 2560px WebP fallback | 329,746 B |
| MART¥RS mobile environment, 720px AVIF | 58,539 B |
| MART¥RS mobile environment, 720px WebP fallback | 96,086 B |
| MART¥RS mobile environment, 1440px AVIF | 122,395 B |
| MART¥RS image wordmark, 1200px lossless WebP | 66,448 B |
| MART¥RS image wordmark, 1200px PNG fallback | 90,817 B |
| Gesture-only 28.656708-second WAV master | 5,502,132 B |
| Gesture-only 56.113417-second seamless WAV derivative | 10,773,820 B |

## Evidence not yet collected

- Lighthouse scores.
- Core Web Vitals field data.
- Representative mid-range Android trace, memory, and energy profile.
- Real network waterfall under throttling.

Those belong to the release-hardening performance pass. No scores are inferred or invented here.
