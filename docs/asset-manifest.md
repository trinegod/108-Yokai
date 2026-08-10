# Asset manifest

Machine-readable source: [`content/assets.json`](../content/assets.json)

All originals live in `source-art/`. Optimized runtime derivatives live in `public/assets/`. The processing script never writes into `source-art/`.

| ID | Canonical source | Type | Dimensions / frames | Alpha | Runtime use | Approval |
|---|---|---|---|---|---|---|
| `threshold-desktop` | `ashigara-threshold-desktop-master.png` | Background master | 1672 × 941, single composition | No | Desktop threshold poster and compositing authority | Locked |
| `threshold-mobile` | `ashigara-threshold-mobile-reference.png` | Background master | 941 × 1672, single composition | No | Mobile threshold poster and breakpoint authority | Locked reference |
| `hoju-concept` | `hoju-concept-master.png` | Relic illustration | 941 × 1672, single portrait | No | Identity authority and process plate | Locked |
| `hoju-state-reference` | `hoju-32bit-state-sheet.png` | State reference | 1312 × 1199, visual 4 × 3 layout | No | Reference only; no frame extraction | Locked reference |
| `kintaro-sprite-reference` | `kintaro-sprite-reference.png` | Directional reference | 1448 × 1086, four figures | No | Reference only; no animation extraction | Approved reference |
| `kintaro-character` | `kintaro-character-master.png` | Character illustration | 941 × 1672, single portrait | No | Identity authority and process plate | Identity reference |

## Source integrity

| Canonical source | SHA-256 |
|---|---|
| `ashigara-threshold-desktop-master.png` | `dd3c78374f3d64e1ee6ff411e396d21fdca3737c33932e7b6d52b87d1ed1deb8` |
| `ashigara-threshold-mobile-reference.png` | `9f512f7f2fceb5910fd592f1e08261e4d29d49ac719ce74d15d9b97e90ad3892` |
| `hoju-concept-master.png` | `398f978941087aead4060f40e2ec29de66b926f37871f33a067d4fe41548e4c8` |
| `hoju-32bit-state-sheet.png` | `1b4f7e7eb0260f493e3e142438ed5c45e3232a632fd69a8fe5012cc64a708b69` |
| `kintaro-sprite-reference.png` | `816ae69e2f8f50f0d9765c646dc8e75cdba9c0ea8fd1989e868dba82533ec18a` |
| `kintaro-character-master.png` | `3db03477e5f032e4ca6fffd2ab16d91e141d2f37187361a8c9b4fa8d3891f097` |

## Runtime derivatives

- Desktop threshold: 960, 1440, and 1672-pixel AVIF/WebP.
- Mobile threshold: 640 and 941-pixel AVIF/WebP.
- Hōju concept: 480 and 720-pixel AVIF/WebP.
- Hōju state reference: 656 and 1312-pixel AVIF/WebP; documentation/reference only.
- Kintarō identity: 480 and 720-pixel AVIF/WebP.
- Kintarō directional reference: 724 and 1448-pixel AVIF/WebP; documentation/reference only.
- Social preview: 1200 × 630 JPEG crop from the approved desktop threshold.
- Favicon: 96 × 96 PNG derivative from the approved Hōju concept.

Regenerate with `npm run assets:build`.

## Rights status

The files were supplied by the project owner for this local Phase One build. A final public-facing rights statement and publication/license terms are not yet provided. No third-party museum imagery is bundled; the archive stores links and metadata only.

## Asset backlog

1. Layer-separated desktop and mobile threshold art: sky, mountain/Fuji, forest, path/water, foreground trees/ledge, Kintarō, axe/crater, Hōju core, and energy planes.
2. Transparent 6–8 frame empty-handed three-quarter-back Kintarō idle sheet, with held-frame timing, pivot, display scale, garment-response state, rare upward gaze, and reduced-motion frame.
3. Transparent, evenly packed Hōju production planes or frames with explicit timing and owner approval for extraction.
4. Separate full-height planted axe and crater matte matching both threshold masters.
5. Optional owner-approved ambient loop. The current axe impact is original procedural synthesis and requires no bundled audio asset.
6. Production art for non-Kintarō/Hōju archive records. Current geometric sigils are controlled placeholders.

