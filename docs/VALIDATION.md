# Validation record

Validation dates: 2026-08-11, 2026-08-13, and 2026-08-14

## Automated checks

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with zero warnings/errors |
| `npm run test:content` | Passed, 4/4 |
| `npm test` | Passed, 20/20, including a fresh production build |
| `npm run build` | Passed; all eight app routes emitted |
| `npm audit --omit=dev --audit-level=high` | Passed; zero production dependency vulnerabilities reported |

The full dependency tree audit initially reported 17 vulnerabilities. A non-breaking `npm audit fix` reduced that to 11 (1 low, 10 high), all in the Vinext/Vite/Cloudflare development and build toolchain. The remaining suggested fixes require breaking/out-of-range changes; they were not force-applied. Re-evaluate the bundled Sites stack before publication.

## Illustrated archive and bilingual interface

- Eight owner-supplied JPEG portraits are preserved byte-for-byte in `source-art/archive/`; SHA-256 verification matched the four new uploaded originals, and the repeated Raikō upload matched his preserved master exactly.
- Separate 360 and source-width AVIF/WebP portrait derivatives were generated under `public/assets/portraits/`.
- The archive now renders 14 source-linked records, including the expanded Raikō retainer constellation and separate child Kintarō and adult Sakata no Kintoki records.
- Ten records have approved project art. Records without approved art retain controlled geometric sigils.
- Record art is visibly labelled as an original ASHIGARA character study and not historical evidence.
- English and provisional Japanese coverage resolves every published record, place, chronicle, route heading, control, and accessibility description. The Japanese interface is labelled `仮訳` and remains subject to fluent editorial review.
- The language choice persisted when navigating from `/archive` to `/about`; the document `lang` changed to `ja` and the Japanese heading rendered after navigation.
- Japanese mode renders `足柄` as the primary threshold wordmark with `ASHIGARA` retained as a romanized cue. The cookie-backed server locale now matches the first client render on direct links; a fresh Japanese record tab produced no hydration warning or browser error.
- Illustrated record chambers use independent card, desktop-detail, and phone-detail focal positions. Watanabe no Tsuna, Usui Sadamitsu, Urabe no Suetake, and Sakata no Kintoki were checked at both target viewports with their faces visible and no source-image modification; the earlier illustrated chambers retain their approved framing.
- Desktop checks at 1440 × 900 and phone checks at 390 × 844 found no horizontal overflow or failed images across `/`, `/archive`, `/atlas`, `/chronicles`, and `/about`.
- The Yamauba record chamber fit both viewports without horizontal overflow. The phone close target measured approximately 84 × 45 pixels.
- Mobile text-action targets in the footer, chronicle, and About status panels were increased to a 44-pixel minimum height after the first responsive inspection.
- The browser console contained only Vite connection and React development notices; no warning or error was emitted during the tested route flow.
- Real captures from the running local site were saved for the rebuilt archive, Yamauba chamber, and threshold. The successful production build was validated separately by `npm run build` and `npm test`.

## Gate 01 identity and archive-shell refinement

- The rejected full-figure Kintarō replacement was removed from runtime code and the previous approved threshold behavior restored.
- The nine supplied experimental JPEG frames remain preserved under `source-art/` with an explicit rejected-integration note; they are not claimed as a production website sequence.
- Desktop and mobile render the compact centered `GATE 01 / ASHIGARA / THE LIVING ARCHIVE` lockup without changing either locked composition master.
- Internal pages expose one explicit `Gate 01` return control, four content-route navigation items, and a responsive four-column phone navigation grid.
- The header Gate 01 and ASHIGARA return links force a fresh threshold document load instead of depending on client-side route state.
- The archive route introduction uses a restrained shared surface treatment and visible Gate 01 context; factual content and route structure are unchanged.
- TypeScript, ESLint, content integrity, the production build, thirteen Node tests, and all five server-rendered routes passed after the refinement.
- New desktop and phone screenshots document the illustrated-archive pass; the owner explicitly authorized its public preview publication on 2026-08-11.

## Browser checks completed

Production preview, 1440 × 900 viewport:

- Threshold renders the locked wide composition with full axe, Kintarō, Hōju, title, entry control, sound toggle, and `PRESS TO ASCEND`.
- The title/archive lockup clears the axe, the two entry labels form one lower-center command, the creator credit stays unobtrusive, and the compact sound control does not cover a principal subject.
- Sound-enabled entry exposed `aria-pressed=true` and `data-ascending=true`, ran the energy sequence, and routed once to `/archive` after the approximately one-second start cue and transition.
- Kintarō's full-figure layer reports no animation and no transform; only the separate feathered shoulder overlay owns the breathing loop. The legs, feet, ledge, and surrounding pixels remain planted.
- The Hōju keeps its `hojuHover` animation running when its focus/touch state is active. The visible relic has one moving masked master layer and the removed `HŌJU · RELIC FOCUS` text does not appear in the DOM.
- The entry overlay covers the full viewport with opacity only and no scaled rectangular bounds. The experimental Kintarō aura and spark nodes are absent from both the component and stylesheet.
- Rebuilt production preview logs contained no warnings/errors for the tested threshold/archive flow.
- Archive renders 14 records, grid/list controls, entity filter, and tolerant Japanese-name search.
- Search for `宝珠` returned the Hōju record.
- Oni filter returned two records after the search was cleared.
- Kintarō record opened at `/archive?record=kintaro`.
- Record dialog moved focus to Close, Escape dismissed the dialog, URL returned to `/archive`, and focus returned to the Kintarō card.
- Desktop screenshots were captured from the running production build.

Production preview, 390 × 844 viewport:

- Threshold selected the independent 941 × 1672 portrait master and rendered at exactly 390 × 844 with no horizontal or vertical overflow.
- Kintarō's approved upward mobile gaze, separately planted full axe, Hōju, mountain, title, sound control, and entry action remained visible.
- The Hōju control responded to touch/click and reported its pressed state accessibly.
- Mobile uses a dedicated shoulder-only Kintarō loop with approximately two-percent peak horizontal expansion and a smooth eight-point Hōju orbit with linear segment timing; the sound control stays above the entry command, clear of the title and relic.
- The creator credit occupies the extreme upper-left safe area at phone size and remains clear of the centered title.
- The centered ASHIGARA / THE LIVING ARCHIVE lockup remained clear at the top, the Hōju hovered lower around the mountain peak, and the compact `ENTER ASHIGARA` border stayed centered.
- During entry, no Kintarō aura or character glow is rendered. The mobile skip control computes to `display: none`, and the sound-control bounds remain fixed above the entry region.
- The mobile full-frame fade reached 0.947 opacity across the exact 390 × 844 viewport before routing, with no transform or rectangular edge.
- A real idle phone screenshot was captured from the final production build.
- The first archive phone capture exposed a clipped final navigation label. After changing the mobile header to a five-column grid with smaller centered labels, the final capture showed all five labels—Threshold, Archive, Atlas, Chronicles, and About—with no overflow.

## Route/server checks

The production worker returned successful server-rendered HTML for:

- `/`
- `/archive`
- `/atlas`
- `/chronicles`
- `/about`

Tests verify route-specific content and absence of starter/codex-preview artifacts.

## Browser-session recovery

An earlier controlled tab was replaced by the browser's own connection-error page after a preview port briefly refused its first connection. A fresh controlled tab was opened normally, the final production preview was loaded, and the previously blocked threshold and archive-header acceptance items were completed. The final tested flow produced no browser console errors.

## Additional release validation

- Add phone QA at approximately 430 × 932.
- Inspect tablet portrait/landscape.
- Test VoiceOver and at least one non-WebKit screen reader/browser pair.
- Run Lighthouse and a mid-range Android trace under a representative mobile network.
- Re-audit the development toolchain after compatible Vinext/Sites dependency updates.
- Confirm final domain metadata and security headers.

## Gate 02 local study — 2026-08-13

- The owner-supplied 3840 × 2160 PNG and 32-second stereo WAV were copied to canonical `source-art/left-right/` paths without modification; SHA-256 values are recorded in the asset manifest.
- Separate 720, 1280, 1920, and 2560-pixel AVIF/WebP environment derivatives were generated. The 1920-pixel AVIF is 70,153 bytes and its WebP fallback is 133,786 bytes.
- A separate 30-second WAV loop was generated with a two-second crossfade. It uses `preload="none"`, remains silent on initial load, and starts only after the visible Sound control is pressed.
- Native WebGL rain initialized successfully in the controlled browser. The canvas is decorative, device-pixel ratio is capped at 1.5, and the route remains usable without it.
- At 1440 × 900 and 390 × 844, `/left-right` rendered with no horizontal overflow. A 375 × 667 phone check also kept the title and controls within the viewport.
- Pointer movement, explicit Left/Right selection, motion toggle, sound fade-in/fade-out, portal return, and keyboard-visible controls were exercised in the running local site.
- Reduced-motion logic removes rain, pointer separation, and animated texture without removing any control or navigation path.
- `/`, `/archive`, `/atlas`, `/chronicles`, `/about`, `/portal-lab`, and `/left-right` were rechecked at 1440 × 900 and 390 × 844 with no horizontal overflow.
- Real browser screenshots were saved as `artifacts/screenshots/left-right-desktop-1440x900.png` and `artifacts/screenshots/left-right-mobile-390x844.png`.
- The phone presentation remains a temporary CSS composition from the supplied desktop artwork; no dedicated mobile master is claimed.

## MART¥RS Gate 02 direction — 2026-08-14

- The approved 3840 × 2160 PNG was copied to `source-art/martyrs/martyrs-desktop-master.png` without modification. Its recorded SHA-256 is `c4c66d58731f5687b0c1609976e5673c0151b9840a8520a85c1872c464539579`.
- The independently composed 1440 × 3120 mobile PNG was copied to `source-art/martyrs/martyrs-mobile-master.png` without modification. Its recorded SHA-256 is `5abc52bb6e3b3d50f0d03dd0cd8e09fcace7d063a121222021ce57fe4f9c4749`.
- The supplied 2048 × 2048 transparent `(S)` sticker was copied byte-for-byte to `source-art/martyrs/martyrs-s-sticker-upload.png`; its SHA-256 is `523305df49a2b0087fd7093c251563f7c856d90c3a0525b473047419c22d86f9`. The source file remains untouched. A separate 1254 × 1254 owner-directed restoration, SHA-256 `96eac3c3d6096c70afdd5783678a5b0b870604827232c04e4d2e32295b45ba1d`, completes the black S where the original composition reached and was cropped by its lower canvas edge.
- The two owner-supplied typography screenshots are preserved as style references under `source-art/martyrs/references/`; their SHA-256 values are `d923e64d72e27eeec86d23235a0b02ddb502a3eca38c504039528e6d8f3b9867` and `a803e0700fd027791e0e8cc2c7ea5d627b9159a53cf10a2c2e8d0b0a526ea874`. They are not runtime assets.
- The generated 1983 × 793 `MART¥RS` wordmark master is preserved byte-for-byte at `source-art/martyrs/martyrs-wordmark-generated-master.png`, SHA-256 `b3cf479865fd1ae71f607b27c9ffabc116495d1f5fc92feffa178d2d80061839`. Neutral-matte extraction produces a transparent 1944 × 253 archival PNG and 1200 × 156 PNG/WebP runtime derivatives.
- Separate 960, 1440, 1920, and 2560-pixel AVIF/WebP desktop derivatives were generated. The 1920-pixel AVIF is 150,138 bytes and its WebP fallback is 246,002 bytes.
- Separate 480, 720, 1080, and 1440-pixel AVIF/WebP mobile derivatives were generated. The 720-pixel AVIF is 58,539 bytes and its WebP fallback is 96,086 bytes.
- The approved 28.656708-second, stereo, 48 kHz, 16-bit PCM WAV was copied to both canonical source and runtime paths byte-for-byte. All copies match SHA-256 `179e2748a7219f56214c5807278f0d4c7b0ccdafb37df5cc5a5b3be0eb86db9b`.
- `/martyrs` returned HTTP 200 from the running local development server and exposed the complete `MART¥RS` heading, generated image masthead, visible Motion and Sound controls, and `preload="none"` audio source in rendered HTML.
- Contract tests verify that no autoplay attribute exists, playback is initiated only inside the visible sound control handler, the desktop sources are guarded by a 700px minimum-width media condition, and the mobile fallback cannot request the desktop art.
- Reduced-motion CSS removes fluorescent flicker and displaced image slices. The visible motion control can also disable the treatment independently.
- `npm run lint`, `npm run typecheck`, `npm run test:content`, `npm run build`, and `npm test` all passed. The complete suite reports 20/20 passing tests and emits eight routes including `/martyrs`.
- Browser acceptance at 1440 × 900 selected the 1440-pixel desktop AVIF; 390 × 844 and 430 × 932 selected the 480-pixel mobile AVIF. All three viewports reported zero horizontal and vertical overflow.
- At 390 × 844 the wordmark ended above the subject zone, the two controls remained inside the lower safe area, and the full independent portrait composition remained visible without substituting the desktop image.
- The current masthead removes the stacked rows, parentheses, sticker, and condensed coded type entirely. At 1440 × 900 the straight image spans x=92–711 and y=213–293, ending before the subject silhouette; at 390 × 844 its independently preserved mobile treatment spans x=15–379 and y=141–196. Both viewports load the 1200-pixel WebP, report zero overflow, and retain the complete accessible `MART¥RS` heading.
- The Sound control started the WAV after its click, advanced playback, and then faded to a paused state on the second click. The Motion control changed between `on` and `still`. No browser warning or error was recorded.
- Real screenshots are saved as `artifacts/screenshots/martyrs-desktop-1440x900.png`, `artifacts/screenshots/martyrs-mobile-390x844.png`, and `artifacts/screenshots/martyrs-mobile-fault-390x844.png`.
