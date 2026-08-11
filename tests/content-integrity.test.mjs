import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function readJson(filename) {
  return JSON.parse(await readFile(new URL(`../content/${filename}`, import.meta.url), "utf8"));
}

test("published records resolve every source, relation, place, and asset", async () => {
  const [records, sources, places, assets] = await Promise.all([
    readJson("records.json"),
    readJson("sources.json"),
    readJson("places.json"),
    readJson("assets.json"),
  ]);

  assert.ok(records.length >= 8 && records.length <= 12, "Phase One stays within the 8–12 record slice");
  const recordIds = new Set(records.map((record) => record.id));
  const recordSlugs = new Set(records.map((record) => record.slug));
  const sourceIds = new Set(sources.map((source) => source.id));
  const placeIds = new Set(places.map((place) => place.id));
  const assetIds = new Set(assets.map((asset) => asset.id));

  assert.equal(recordIds.size, records.length, "record IDs are unique");
  assert.equal(recordSlugs.size, records.length, "record slugs are unique");

  for (const record of records) {
    assert.equal(record.schemaVersion, 1);
    assert.equal(record.status, "published");
    assert.ok(record.sourceIds.length > 0, `${record.id} has a source`);
    assert.ok(record.traditionNotes, `${record.id} separates tradition`);
    assert.ok(record.ashigaraAdaptation?.role, `${record.id} separates ASHIGARA canon`);
    for (const sourceId of record.sourceIds) assert.ok(sourceIds.has(sourceId), `${record.id} source ${sourceId} resolves`);
    for (const relatedId of record.relatedRecordIds) assert.ok(recordIds.has(relatedId), `${record.id} relation ${relatedId} resolves`);
    for (const place of record.places) assert.ok(placeIds.has(place.placeId), `${record.id} place ${place.placeId} resolves`);
    for (const assetId of Object.values(record.assets)) assert.ok(assetIds.has(assetId), `${record.id} asset ${assetId} resolves`);
    for (const variant of record.variants) {
      for (const sourceId of variant.sourceIds) assert.ok(sourceIds.has(sourceId), `${record.id} variant source ${sourceId} resolves`);
    }
  }
});

test("source registry uses real institutional HTTPS links", async () => {
  const sources = await readJson("sources.json");
  for (const source of sources) {
    const url = new URL(source.url);
    assert.equal(url.protocol, "https:");
    assert.match(source.kind, /institutional|authority/);
    assert.match(source.accessedAt, /^2026-08-(10|11)$/);
  }
});

test("all canonical source masters and optimized runtime assets exist separately", async () => {
  const assets = await readJson("assets.json");
  for (const asset of assets) {
    const sourceUrl = new URL(asset.sourcePath, root);
    await access(sourceUrl);
    const sourceStat = await stat(sourceUrl);
    assert.ok(sourceStat.size > 200_000, `${asset.canonicalSourceName} remains a full source master`);
    assert.match(asset.optimization, /original retained byte-for-byte|no (?:production )?frame extraction/i);
  }

  await Promise.all([
    access(new URL("../public/assets/backgrounds/threshold/ashigara-threshold-desktop-960.avif", import.meta.url)),
    access(new URL("../public/assets/backgrounds/threshold/ashigara-threshold-mobile-640.avif", import.meta.url)),
    access(new URL("../public/assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-960.avif", import.meta.url)),
    access(new URL("../public/assets/backgrounds/threshold/ashigara-threshold-mobile-actorless-640.avif", import.meta.url)),
    access(new URL("../derived-art/clean-plates/ashigara-threshold-desktop-actorless-v1.png", import.meta.url)),
    access(new URL("../derived-art/clean-plates/ashigara-threshold-mobile-actorless-v1.png", import.meta.url)),
    access(new URL("../public/assets/relics/hoju-concept-480.webp", import.meta.url)),
    access(new URL("../public/assets/sprites/characters/kintaro-character-480.webp", import.meta.url)),
    access(new URL("../public/assets/portraits/yamauba-archive-360.avif", import.meta.url)),
    access(new URL("../public/assets/portraits/shuten-doji-archive-360.avif", import.meta.url)),
    access(new URL("../public/assets/portraits/ibaraki-doji-archive-360.avif", import.meta.url)),
    access(new URL("../public/assets/portraits/minamoto-yorimitsu-archive-360.avif", import.meta.url)),
  ]);
});

test("Japanese draft coverage resolves every record, place, chronicle, and interface key", async () => {
  const [records, places, chronicles, recordTranslations, placeTranslations, chronicleTranslations] = await Promise.all([
    readJson("records.json"),
    readJson("places.json"),
    readJson("chronicles.json"),
    readJson("locales/records.ja.json"),
    readJson("locales/places.ja.json"),
    readJson("locales/chronicles.ja.json"),
  ]);
  const [englishUi, japaneseUi] = await Promise.all([
    readJson("locales/en.json"),
    readJson("locales/ja.json"),
  ]);

  assert.deepEqual(Object.keys(recordTranslations).sort(), records.map((record) => record.id).sort());
  assert.deepEqual(Object.keys(placeTranslations).sort(), places.map((place) => place.id).sort());
  assert.deepEqual(Object.keys(chronicleTranslations).sort(), chronicles.map((chronicle) => chronicle.id).sort());
  assert.deepEqual(Object.keys(japaneseUi).sort(), Object.keys(englishUi).sort());
  assert.equal(japaneseUi.localeStatus, "provisional-unreviewed");

  for (const record of records) {
    const translation = recordTranslations[record.id];
    assert.ok(translation.summary && translation.description && translation.traditionNotes, `${record.id} has Japanese prose`);
    assert.equal(translation.variants.length, record.variants.length, `${record.id} variant translations stay aligned`);
    assert.equal(translation.themes.length, record.themes.length, `${record.id} theme translations stay aligned`);
    assert.equal(translation.motifs.length, record.motifs.length, `${record.id} motif translations stay aligned`);
  }
});
