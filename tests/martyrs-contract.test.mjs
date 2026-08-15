import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(new URL("../app/_components/MartyrsGate.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const portalGates = await readFile(new URL("../content/portal-gates.ts", import.meta.url), "utf8");

test("MART¥RS keeps the requested image wordmark and portal identity", () => {
  assert.match(component, /martyrs-wordmark-1200\.webp/);
  assert.match(component, /martyrs-wordmark-1200\.png/);
  assert.doesNotMatch(component, /martyrs-lockup__line/);
  assert.doesNotMatch(component, /martyrs-lockup__yen/);
  assert.doesNotMatch(component, /martyrs-lockup__row--top|martyrs-lockup__row--bottom|martyrs-lockup__suffix/);
  assert.doesNotMatch(component, /martyrs-s-sticker/);
  assert.match(styles, /martyrsWordmarkBlur/);
  assert.match(portalGates, /title: "MART¥RS"/);
  assert.match(portalGates, /href: "\/martyrs"/);
});

test("MART¥RS remains silent until its visible sound gesture", () => {
  assert.match(component, /<button[^>]+aria-pressed=\{soundEnabled\}/s);
  assert.match(component, /<audio ref=\{audioRef\} loop preload="none"/);
  assert.doesNotMatch(component, /\bautoPlay\b|\bautoplay\b/);
  assert.match(component, /await audio\.play\(\)/);
});

test("MART¥RS uses an independent portrait master on phones", () => {
  assert.match(component, /media="\(max-width: 699px\)"/);
  assert.match(component, /martyrs-mobile-480\.avif/);
  assert.match(component, /media="\(min-width: 700px\)"/);
  assert.match(component, /src="data:image\/gif;base64,/);
  assert.match(styles, /@media \(max-width: 699px\)[\s\S]*?martyrs-mobile-720\.webp/);
});

test("MART¥RS motion is optional and reduced-motion safe", () => {
  assert.match(styles, /martyrsFluorescent/);
  assert.match(styles, /martyrsSliceOne/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.martyrs-scene__slice[\s\S]*?display: none;/);
});
