# Content model

The Phase One archive uses versioned, repository-local JSON with TypeScript types. Presentation code consumes the registries through `content/index.ts`.

## Registries

- `content/records.json`: folklore, place, object, creature, and hero records.
- `content/sources.json`: institutional collection, exhibition, and authority links.
- `content/places.json`: narrative atlas nodes with visible certainty labels.
- `content/chronicles.json`: finite exhibitions composed from record IDs.
- `content/assets.json`: canonical source and derivative metadata.
- `content/locales/`: route/interface dictionaries plus record, place, and chronicle translations with visible localization status.
- `content/schema.ts`: TypeScript contract for the above registries.

## Record contract

Each record includes:

- schema version, stable ID, and shareable slug;
- draft/reviewed/published editorial state;
- entity type;
- English name plus checked Japanese/kana/romanization fields where present;
- sourced summary and description;
- explicit tradition notes;
- source-linked variants;
- regions and place links with historical/traditional/legendary/approximate certainty;
- periods, themes, motifs, relationships, and source IDs;
- a visibly separate ASHIGARA adaptation block and canon status;
- spoiler level, asset IDs, rights note, and review date.

Only `published` records appear in the current index. Adding a record requires editing data, not view components.

## Editorial policy

1. Cite institutional, scholarly, library, or museum pathways close to claims.
2. Keep claims narrower than the evidence.
3. Surface variant texts, images, settings, spellings, and periods.
4. Never treat one visual object as the totality of a tradition.
5. Distinguish historical people from later legendary roles.
6. Avoid confident translations and Japanese text without verification.
7. Exclude draft records from the public index.
8. Never use AI-authored prose as a factual source.
9. Record rights status for every bundled asset; link-only source records do not imply image reuse rights.
10. Expose Japanese drafts only with a visible provisional label, and require fluent human editorial review before describing the locale as reviewed or complete.

## Validation

`npm run test:content` checks:

- unique IDs and slugs;
- the curated Phase One record scope, currently 14 published entries;
- source presence and resolvability;
- related-record, place, variant-source, and asset references;
- separate Tradition and ASHIGARA fields;
- institutional HTTPS source URLs;
- source-master and representative derivative existence.

## CMS migration seam

The registries can move behind a CMS adapter later because routes consume normalized typed records rather than importing view-specific prose. A future migration should preserve stable IDs/slugs, editorial status, cross-reference validation, locale separation, and build-time failure for broken references.
