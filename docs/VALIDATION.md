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

## Browser checks completed

Production preview, 1440 × 900 viewport:

- Threshold renders the locked wide composition with full axe, Kintarō, Hōju, title, entry control, sound toggle, and `PRESS TO ASCEND`.
- The title/archive lockup clears the axe, the two entry labels form one lower-center command, the creator credit stays unobtrusive, and the compact sound control does not cover a principal subject.
- Sound-enabled entry exposed `aria-pressed=true` and `data-ascending=true`, ran the Kintarō aura/energy sequence, and routed once to `/archive` after the approximately one-second start cue and transition.
- Continuous Kintarō and Hōju transforms changed across three idle samples without pointer input. The entry overlay covered the full viewport with opacity only and no scaled rectangular bounds.
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
- Mobile used dedicated, more readable Kintarō breathing and Hōju sway loops; the sound control moved above the entry command, clear of the title and relic.
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
