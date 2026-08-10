import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentUrl = new URL("../app/_components/ThresholdScene.tsx", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);

test("threshold preserves locked responsive masters and required controls", async () => {
  const component = await readFile(componentUrl, "utf8");
  assert.match(component, /ashigara-threshold-desktop/);
  assert.match(component, /ashigara-threshold-mobile/);
  assert.match(component, /locale\.enter/);
  assert.match(component, /locale\.ascend/);
  assert.match(component, /threshold__kintaro/);
  assert.match(component, /threshold__kintaro-aura/);
  assert.match(component, /threshold__fade/);
  assert.match(component, /threshold__axe/);
  assert.match(component, /threshold__hoju/);
  assert.match(component, /threshold__relic-hotspot/);
  assert.match(component, /data-relic-active/);
  assert.match(component, /new AudioContext\(\)/);
  assert.doesNotMatch(component, /autoplay/i);
});

test("motion is progressive and has a reduced-motion path", async () => {
  const css = await readFile(cssUrl, "utf8");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation:\s*kintaroBreath/);
  assert.match(css, /animation:\s*kintaroBreathMobile/);
  assert.match(css, /animation:\s*guardianAura/);
  assert.match(css, /animation:\s*guardianSpark/);
  assert.match(css, /animation:\s*hojuHover/);
  assert.match(css, /animation:\s*hojuHoverMobile/);
  assert.match(css, /threshold__hoju-depth/);
  assert.match(css, /mask-image:\s*radial-gradient/);
  assert.match(css, /animation:\s*energyTravel/);
  assert.match(css, /animation:\s*thresholdFade/);
  assert.doesNotMatch(css, /@keyframes\s+aperture/);
  assert.match(css, /threshold\[data-ascending="true"\]/);
});
