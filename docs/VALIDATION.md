# Validation record

Validation date: 2026-08-10

## Automated checks

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with zero warnings/errors |
| `npm run test:content` | Passed, 3/3 |
| `node --test tests/*.test.mjs` | Passed, 10/10 |
| `npm run build` | Passed; all five app routes emitted |
| `npm audit --omit=dev --audit-level=high` | Passed; zero production dependency vulnerabilities reported |

The full dependency tree audit initially reported 17 vulnerabilities. A non-breaking `npm audit fix` reduced that to 11 (1 low, 10 high), all in the Vinext/Vite/Cloudflare development and build toolchain. The remaining suggested fixes require breaking/out-of-range changes; they were not force-applied. Re-evaluate the bundled Sites stack before publication.

## Local desktop activation pass

The newer Kintarō entry sequence passed the required automated checks on 2026-08-10:

- Nine separately preserved 1280 × 720 JPEG working frames resolve through the asset registry and nondestructive derivative pipeline.
- Nine transparent, despilled WebP derivatives share one crop and total 500,201 bytes including `sequence.json`.
- Desktop pointer/keyboard entry schedules one frame sequence, prevents double activation, and delays routing until the animation and full-frame fade complete.
- The optional procedural entry cue adds a low-volume desktop-only power vocal at the pose peak. It remains silent until a deliberate visitor gesture and respects the stored sound preference.
- Flame wisps and sparse sparks are code-driven, removable enhancement layers. They are absent from the mobile and reduced-motion paths.
- The Hōju, planted axe, environment plate, and Kintarō activation remain independent layers.
- All five routes server-rendered successfully after the change, and the threshold contract tests cover the sequence, reduced-motion branch, and desktop breakpoint.

Controlled-browser visual acceptance of this newer sequence is still pending because no in-app browser-control session was available during this pass. No new screenshot was captured or claimed. The local development server is available at `http://localhost:3002/`; the public preview does not yet contain this local change.

## Historical browser acceptance baseline

The checks below document the preceding production-preview baseline. They remain evidence for the idle threshold, responsive composition, and route shell; they are not presented as visual acceptance of the newer desktop activation sequence.

Production preview, 1440 × 900 viewport:

- Threshold renders the locked wide composition with full axe, Kintarō, Hōju, title, entry control, sound toggle, and `PRESS TO ASCEND`.
- The title/archive lockup clears the axe, the two entry labels form one lower-center command, the creator credit stays unobtrusive, and the compact sound control does not cover a principal subject.
- Sound-enabled entry exposed `aria-pressed=true` and `data-ascending=true`, ran the energy sequence, and routed once to `/archive` after the approximately one-second start cue and transition.
- Kintarō's full-figure layer reports no animation and no transform; only the separate feathered shoulder overlay owns the breathing loop. The legs, feet, ledge, and surrounding pixels remain planted.
- The Hōju keeps its `hojuHover` animation running when its focus/touch state is active. The visible relic has one moving masked master layer and the removed `HŌJU · RELIC FOCUS` text does not appear in the DOM.
- At that captured baseline, the entry overlay covered the full viewport with opacity only and no scaled rectangular bounds, and the earlier experimental Kintarō aura was absent.
- Rebuilt production preview logs contained no warnings/errors for the tested threshold/archive flow.
- Archive renders 10 records, grid/list controls, entity filter, and tolerant Japanese-name search.
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
