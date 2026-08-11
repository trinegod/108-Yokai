# Validation record

Validation date: 2026-08-11

## Automated checks

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with zero warnings/errors |
| `npm run test:content` | Passed, 4/4 |
| `npm test` | Passed, 13/13, including a fresh production build |
| `npm run build` | Passed; all five app routes emitted |
| `npm audit --omit=dev --audit-level=high` | Passed; zero production dependency vulnerabilities reported |

The full dependency tree audit initially reported 17 vulnerabilities. A non-breaking `npm audit fix` reduced that to 11 (1 low, 10 high), all in the Vinext/Vite/Cloudflare development and build toolchain. The remaining suggested fixes require breaking/out-of-range changes; they were not force-applied. Re-evaluate the bundled Sites stack before publication.

## Illustrated archive and bilingual interface

- Four owner-supplied JPEG portraits are preserved byte-for-byte in `source-art/archive/`; `cmp` and SHA-256 verification matched every uploaded original.
- Separate 360 and 720-pixel AVIF/WebP portrait derivatives were generated under `public/assets/portraits/`.
- The archive now renders 11 source-linked records, including expanded Yamauba, Shuten-dōji, Ibaraki-dōji, and Minamoto no Yorimitsu records.
- Six records have approved project art. Records without approved art retain controlled geometric sigils.
- Record art is visibly labelled as an original ASHIGARA character study and not historical evidence.
- English and provisional Japanese coverage resolves every published record, place, chronicle, route heading, control, and accessibility description. The Japanese interface is labelled `仮訳` and remains subject to fluent editorial review.
- The language choice persisted when navigating from `/archive` to `/about`; the document `lang` changed to `ja` and the Japanese heading rendered after navigation.
- Japanese mode renders `足柄` as the primary threshold wordmark with `ASHIGARA` retained as a romanized cue. The cookie-backed server locale now matches the first client render on direct links; a fresh Japanese record tab produced no hydration warning or browser error.
- Illustrated record chambers use independent card, desktop-detail, and phone-detail focal positions. Yamauba, Shuten-dōji, Ibaraki-dōji, and Minamoto no Yorimitsu were checked at both target viewports with their faces visible and no source-image modification.
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
- Archive renders 11 records, grid/list controls, entity filter, and tolerant Japanese-name search.
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
