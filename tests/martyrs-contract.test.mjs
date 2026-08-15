import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(new URL("../app/_components/MartyrsGate.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const portalGates = await readFile(new URL("../content/portal-gates.ts", import.meta.url), "utf8");
const martyrsContent = await readFile(new URL("../content/martyrs.ts", import.meta.url), "utf8");

test("MART¥RS keeps the requested image wordmark and portal identity", () => {
  assert.match(component, /martyrs-wordmark-1200\.webp/);
  assert.match(component, /martyrs-wordmark-1200\.png/);
  assert.doesNotMatch(component, /martyrs-lockup__line/);
  assert.doesNotMatch(component, /martyrs-lockup__yen/);
  assert.doesNotMatch(component, /martyrs-lockup__row--top|martyrs-lockup__row--bottom|martyrs-lockup__suffix/);
  assert.doesNotMatch(component, /martyrs-s-sticker/);
  assert.match(styles, /filter: blur\(clamp\(8px, 0\.8vw, 13px\)\)/);
  assert.match(styles, /\.martyrs-lockup::before[\s\S]*?opacity: 0\.5;/);
  assert.match(portalGates, /title: "MART¥RS"/);
  assert.match(portalGates, /href: "\/martyrs"/);
});

test("MART¥RS remains silent until its visible sound gesture", () => {
  assert.match(component, /<button[^>]+aria-pressed=\{soundEnabled\}/s);
  assert.match(component, /<audio ref=\{audioRef\} loop preload="none"/);
  assert.doesNotMatch(component, /\bautoPlay\b|\bautoplay\b/);
  assert.match(component, /await audio\.play\(\)/);
  assert.match(martyrsContent, /martyrs-extended-loop\.wav/);
  assert.match(martyrsContent, /durationSeconds: 56\.113417/);
});

test("MART¥RS uses an independent portrait master on phones", () => {
  assert.match(component, /media="\(max-width: 699px\)"/);
  assert.match(component, /martyrs-mobile-480\.avif/);
  assert.match(component, /martyrs-mobile-720\.webp/);
  assert.match(component, /media="\(min-width: 700px\)"/);
  assert.match(component, /src="data:image\/gif;base64,/);
  assert.match(styles, /@media \(max-width: 699px\)[\s\S]*?\.martyrs-gate::before \{ display: none; \}/);
  assert.match(styles, /\.martyrs-scene picture \{[\s\S]*?transform: scale\(1\.002\);/);
  assert.match(styles, /@media \(max-width: 699px\)[\s\S]*?\.martyrs-scene img \{ object-fit: cover; \}/);
});

test("MART¥RS motion is optional and reduced-motion safe", () => {
  assert.match(styles, /martyrsFluorescent/);
  assert.match(styles, /martyrsFluorescent 10\.8s/);
  assert.doesNotMatch(component, /martyrs-scene__slice/);
  assert.doesNotMatch(styles, /martyrsSliceOne|martyrsSliceTwo|martyrsSliceThree|martyrsWordmarkBlur/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.martyrs-scene__fluorescent \{ display: none; \}/);
});
