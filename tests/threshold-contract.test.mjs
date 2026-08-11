import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentUrl = new URL("../app/_components/ThresholdScene.tsx", import.meta.url);
const cssUrl = new URL("../app/globals.css", import.meta.url);

test("threshold preserves locked responsive masters and required controls", async () => {
  const component = await readFile(componentUrl, "utf8");
  assert.match(component, /ashigara-threshold-desktop/);
  assert.match(component, /ashigara-threshold-mobile/);
  assert.match(component, /ashigara-threshold-desktop-actorless/);
  assert.match(component, /ashigara-threshold-mobile-actorless/);
  assert.match(component, /locale\.enter/);
  assert.match(component, /locale\.ascend/);
  assert.match(component, /threshold__kintaro/);
  assert.match(component, /threshold__kintaro-breath/);
  assert.doesNotMatch(component, /threshold__kintaro-aura/);
  assert.match(component, /threshold__fade/);
  assert.match(component, /threshold__axe/);
  assert.match(component, /threshold__hoju/);
  assert.match(component, /threshold__relic-hotspot/);
  assert.doesNotMatch(component, /HŌJU · RELIC FOCUS/);
  assert.match(component, /data-relic-active/);
  assert.match(component, /new AudioContext\(\)/);
  assert.doesNotMatch(component, /autoplay/i);
});

test("motion is progressive and has a reduced-motion path", async () => {
  const css = await readFile(cssUrl, "utf8");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation:\s*kintaroShoulderBreath/);
  assert.match(css, /animation:\s*kintaroShoulderBreathMobile/);
  assert.match(css, /scaleX\(1\.018\)/);
  assert.match(css, /scaleX\(1\.021\)/);
  const staticGuardian = css.match(/\.threshold__kintaro\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.match(staticGuardian, /animation:\s*none/);
  assert.match(staticGuardian, /transform:\s*none/);
  assert.doesNotMatch(css, /guardianAura|guardianGlow|guardianSpark|threshold__kintaro-aura/);
  assert.match(css, /animation:\s*hojuHover/);
  assert.match(css, /animation:\s*hojuHoverMobile/);
  assert.match(css, /animation:\s*hojuOpenMobile/);
  assert.match(css, /threshold__hoju-depth/);
  assert.doesNotMatch(css, /threshold\[data-relic-active="true"\]\s+\.threshold__hoju\s*\{/);
  assert.match(css, /mask-image:\s*radial-gradient/);
  assert.match(css, /animation:\s*energyTravel/);
  assert.match(css, /animation:\s*thresholdFade/);
  assert.doesNotMatch(css, /@keyframes\s+aperture/);
  assert.match(css, /threshold\[data-ascending="true"\]/);
  assert.match(css, /\.skip-transition\s*\{[\s\S]*?display:\s*none/);
  assert.match(css, /\.threshold__edition\s*\{[\s\S]*?top:\s*max\(0\.45rem,[\s\S]*?bottom:\s*auto/);
});
