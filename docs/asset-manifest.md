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
| `kintaro-powerup-desktop` | `kintaro/desktop-powerup/` | Activation sequence | 9 separate 1280 × 720 frames | Cyan source matte; derived alpha | Desktop entry power-up | Approved working sequence |

## Source integrity

| Canonical source | SHA-256 |
|---|---|
| `ashigara-threshold-desktop-master.png` | `dd3c78374f3d64e1ee6ff411e396d21fdca3737c33932e7b6d52b87d1ed1deb8` |
| `ashigara-threshold-mobile-reference.png` | `9f512f7f2fceb5910fd592f1e08261e4d29d49ac719ce74d15d9b97e90ad3892` |
| `hoju-concept-master.png` | `398f978941087aead4060f40e2ec29de66b926f37871f33a067d4fe41548e4c8` |
| `hoju-32bit-state-sheet.png` | `1b4f7e7eb0260f493e3e142438ed5c45e3232a632fd69a8fe5012cc64a708b69` |
| `kintaro-sprite-reference.png` | `816ae69e2f8f50f0d9765c646dc8e75cdba9c0ea8fd1989e868dba82533ec18a` |
| `kintaro-character-master.png` | `3db03477e5f032e4ca6fffd2ab16d91e141d2f37187361a8c9b4fa8d3891f097` |
| `kintaro-powerup-desktop-00.jpg` | `b54f7fc7bb2045fd5a9cbdccfd34a65d28634b07ac438c4d50be31e4cbadd5b0` |
| `kintaro-powerup-desktop-01.jpg` | `f76fcd5a4122d1f5d517e24bf65f45a8a0287a2c8751f7886c814aec45375f83` |
| `kintaro-powerup-desktop-02.jpg` | `191b23d3cc94b89d5e16c063394c8c23d2d1936cb13a048786743df3e4944e63` |
| `kintaro-powerup-desktop-03.jpg` | `782aa60d74515b3dba1cad97ff2b704aaa88299ffd5f153e03367a38a762b1be` |
| `kintaro-powerup-desktop-04.jpg` | `6d54a583bd3d344c5d4b67a76ee86f9b69c471f2a80e9a10e045d58c913142ae` |
| `kintaro-powerup-desktop-05.jpg` | `5899b5d21c732ccdc3b86e3af6590c5fbef257659baf227a8a952fd17281de0d` |
| `kintaro-powerup-desktop-06.jpg` | `8dd5268e7a3c59e4726926b5dda870206a04d2e4954fbe2c104b2b6fa9aa33f5` |
| `kintaro-powerup-desktop-07.jpg` | `3eb18d5ecc8d011b6c714516abe391a2b4547bb1050a7520634363602825077f` |
| `kintaro-powerup-desktop-08-surge.jpg` | `bc1ea7e6b9f74d2692a3e43cddda13ae436f5886037334d5f77c36b3c0c6af3e` |

## Runtime derivatives

- Desktop threshold: 960, 1440, and 1672-pixel AVIF/WebP.
- Mobile threshold: 640 and 941-pixel AVIF/WebP.
- Hōju concept: 480 and 720-pixel AVIF/WebP.
- Hōju state reference: 656 and 1312-pixel AVIF/WebP; documentation/reference only.
- Kintarō identity: 480 and 720-pixel AVIF/WebP.
- Kintarō directional reference: 724 and 1448-pixel AVIF/WebP; documentation/reference only.
- Kintarō desktop power-up: nine shared-crop alpha WebP frames, 50.8–58.8 KB each, plus generated sequence metadata. Frame 08 is a brief optional maximum-surge accent.
- Social preview: 1200 × 630 JPEG crop from the approved desktop threshold.
- Favicon: 96 × 96 PNG derivative from the approved Hōju concept.

Regenerate with `npm run assets:build`.

## Rights status

The files were supplied by the project owner for this local Phase One build. A final public-facing rights statement and publication/license terms are not yet provided. No third-party museum imagery is bundled; the archive stores links and metadata only.

## Asset backlog

1. Layer-separated desktop and mobile threshold art: sky, mountain/Fuji, forest, path/water, foreground trees/ledge, Kintarō, axe/crater, Hōju core, and energy planes.
2. Independent mobile Kintarō activation sequence preserving the final portrait master, subtle upward gaze, planted stance, and breakpoint-specific registration.
3. Transparent, evenly packed Hōju production planes or frames with explicit timing and owner approval for extraction.
4. Separate full-height planted axe and crater matte matching both threshold masters.
5. Optional owner-approved ambient loop. The current axe impact is original procedural synthesis and requires no bundled audio asset.
6. Production art for non-Kintarō/Hōju archive records. Current geometric sigils are controlled placeholders.
