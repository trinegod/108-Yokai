import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(new URL("../app/_components/MartyrsGate.tsx", import.meta.url), "utf8");
const shell = await readFile(new URL("../app/_components/MartyrsShell.tsx", import.meta.url), "utf8");
const editorial = await readFile(new URL("../app/_components/MartyrsEditorial.tsx", import.meta.url), "utf8");
const editorialContent = await readFile(new URL("../content/martyrs-editorials.ts", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const portalComponent = await readFile(new URL("../app/_components/PortalLab.tsx", import.meta.url), "utf8");
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
  assert.match(portalComponent, /gate-02-editorial-256\.webp/);
  assert.match(portalComponent, /gate-02-editorial-512\.png/);
});

test("Portal Lab keeps motion implicit and the Gate 02 marker aligned with Gate 01", () => {
  assert.match(portalComponent, /const motionActive = !reduceMotion;/);
  assert.doesNotMatch(portalComponent, /portal-invitation|toggleMotion|Motion \/|openChamber|chamberOpen/);
  assert.match(portalComponent, /<span>02 \/ 12<\/span>/);
  assert.match(portalComponent, /<h2 id="portal-gates-title"><span>The<\/span> basement\.<\/h2>/);
  assert.match(styles, /\.portal-wordmark__final \{[\s\S]*?width: 0\.34em;[\s\S]*?clip-path: inset\(0 9% 0 0\);/);
  assert.match(styles, /\.portal-street \.portal-chamber__head \{[\s\S]*?grid-template-columns: 1fr;[\s\S]*?justify-items: center;/);
  assert.doesNotMatch(styles, /\.portal-street-tag--02 > a/);
  assert.doesNotMatch(styles, /\.portal-utility|\.portal-invitation/);
});

test("MART¥RS remains silent until its visible sound gesture", () => {
  assert.match(shell, /<button[^>]+aria-pressed=\{soundEnabled\}/s);
  assert.match(shell, /className="martyrs-sound-control"/);
  assert.match(shell, /className="martyrs-sound-icon"/);
  assert.doesNotMatch(shell, />\s*Sound\s*\//);
  assert.doesNotMatch(component, /←/);
  assert.match(styles, /\.martyrs-back span:last-child \{\s*color: var\(--martyrs-ink\);\s*\}/);
  assert.match(styles, /\.martyrs-controls button \{[\s\S]*?border: 0;[\s\S]*?background: transparent;/);
  assert.match(shell, /<audio ref=\{audioRef\} loop preload="none"/);
  assert.doesNotMatch(shell, /\bautoPlay\b|\bautoplay\b/);
  assert.match(shell, /await audio\.play\(\)/);
  assert.match(martyrsContent, /martyrs-extended-loop\.wav/);
  assert.match(martyrsContent, /durationSeconds: 56\.113417/);
  assert.match(shell, /editorialAudio \?\? martyrsGate\.audio/);
  assert.match(shell, /<MartyrsAudioShell key=\{activeAudio\.source\}/);
  assert.match(editorialContent, /source: "\/assets\/audio\/persona-master\.wav"/);
});

test("MART¥RS cover exposes three modular editorial entrances", () => {
  assert.match(component, /aria-label="MART¥RS editorial contents"/);
  assert.match(component, /martyrsEditorials\.map/);
  assert.match(component, /<a href=\{`\/martyrs\/\$\{editorial\.slug\}`\}/);
  assert.doesNotMatch(component, /<Link href=\{`\/martyrs\/\$\{editorial\.slug\}`\}/);
  assert.match(styles, /@media \(min-width: 700px\) \{[\s\S]*?\.martyrs-contents \{[\s\S]*?top: 37%;/);
  assert.match(editorialContent, /issue: "02\.01"[\s\S]*?title: "Persona"/);
  assert.match(editorialContent, /issue: "02\.02"[\s\S]*?title: "Unfinished"/);
  assert.match(editorialContent, /issue: "02\.03"[\s\S]*?title: "Below"[\s\S]*?kicker: "Pattern against user"/);
  assert.match(editorialContent, /slug: "unfinished"[\s\S]*?nextSlug: "below"/);
  assert.match(editorialContent, /slug: "below"[\s\S]*?nextSlug: "persona"/);
  assert.doesNotMatch(editorialContent, /—| - /);
});

test("MART¥RS editorials preserve breakpoint masters and reduced motion", () => {
  assert.match(editorial, /media="\(max-width: 699px\)"/);
  assert.match(editorial, /-mobile-480\.avif/);
  assert.match(editorial, /-desktop-1920\.webp/);
  assert.match(editorial, /className="martyrs-editorial__aperture/);
  assert.match(styles, /martyrsEditorialApertureLeft/);
  assert.match(styles, /@keyframes martyrsEditorialApertureLeft \{[\s\S]*?0%, 14% \{ transform: translateX\(0\); \}[\s\S]*?100% \{ transform: translateX\(-102%\); \}/);
  assert.match(styles, /\.martyrs-editorial__kicker \{[\s\S]*?margin-right: auto;[\s\S]*?margin-left: auto;[\s\S]*?text-align: center;/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.martyrs-editorial__aperture \{ display: none; \}/);
  assert.match(styles, /Didot, "Bodoni 72", "Bodoni MT"/);
  assert.match(styles, /@media \(max-width: 699px\) \{[\s\S]*?\.martyrs-editorial__title-block,[\s\S]*?padding: 2\.7rem 1\.1rem 2\.5rem;[\s\S]*?\.martyrs-editorial__issue \{ margin-bottom: 1\.35rem; \}/);
});

test("MART¥RS editorial navigation uses reliable browser links", () => {
  assert.match(editorial, /<a href="\/martyrs" className="martyrs-editorial__return"/);
  assert.match(editorial, /<a href="\/portal-lab" className="martyrs-editorial__portal"/);
  assert.match(editorial, /<a href=\{`\/martyrs\/\$\{editorial\.nextSlug\}`\}/);
  assert.doesNotMatch(editorial, /import Link from "next\/link"/);
  assert.match(editorial, /<\/section>[\s\S]*?<nav className="martyrs-editorial__next"/);
  assert.match(styles, /\.martyrs-editorial__next \{[\s\S]*?background: transparent;/);
  assert.match(styles, /\.martyrs-editorial__next a \{[\s\S]*?border: 0;[\s\S]*?background: transparent;/);
  assert.match(styles, /\.martyrs-editorial__title-block \{[\s\S]*?text-align: center;/);
  assert.match(styles, /\.martyrs-editorial__statement > p \{[\s\S]*?max-width: 25rem;[\s\S]*?margin: 0 auto;/);
});

test("MART¥RS uses an independent portrait master on phones", () => {
  assert.match(component, /media="\(max-width: 699px\)"/);
  assert.match(component, /martyrs-mobile-480\.avif/);
  assert.match(component, /martyrs-mobile-720\.webp/);
  assert.match(component, /media="\(min-width: 700px\)"/);
  assert.match(component, /src="data:image\/gif;base64,/);
  assert.match(styles, /@media \(max-width: 699px\)[\s\S]*?\.martyrs-gate::before \{ display: none; \}/);
  assert.match(styles, /\.martyrs-scene picture \{[\s\S]*?transform: scale\(1\.002\);/);
  assert.match(styles, /@media \(max-width: 699px\)[\s\S]*?\.martyrs-scene img \{ object-fit: contain; \}/);
});

test("MART¥RS motion is optional and reduced-motion safe", () => {
  assert.match(styles, /martyrsFluorescent/);
  assert.match(styles, /martyrsFluorescent 10\.8s/);
  assert.doesNotMatch(component, /toggleMotion|Motion \/ \{/);
  assert.doesNotMatch(component, /<p><span>Gate<\/span>/);
  assert.doesNotMatch(component, /martyrs-scene__slice/);
  assert.doesNotMatch(styles, /martyrsSliceOne|martyrsSliceTwo|martyrsSliceThree|martyrsWordmarkBlur/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.martyrs-scene__fluorescent \{ display: none; \}/);
});
