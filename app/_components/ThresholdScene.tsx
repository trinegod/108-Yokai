"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import locale from "@/content/locales/en.json";
import { thresholdSceneManifest } from "@/content/threshold-scene";

function readStoredSoundPreference() {
  try {
    return window.localStorage.getItem("ashigara-sound") === "on";
  } catch {
    return false;
  }
}

function writeStoredSoundPreference(enabled: boolean) {
  try {
    window.localStorage.setItem("ashigara-sound", enabled ? "on" : "off");
  } catch {
    // A denied storage preference should never block entry.
  }
}

function playAscendSound() {
  const context = new AudioContext();
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.16, now + 0.012);
  master.gain.setValueAtTime(0.16, now + 0.78);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 1.08);
  master.connect(context.destination);

  const tone = context.createOscillator();
  const toneGain = context.createGain();
  tone.type = "square";
  tone.frequency.setValueAtTime(92, now);
  tone.frequency.exponentialRampToValueAtTime(38, now + 0.3);
  toneGain.gain.setValueAtTime(0.5, now);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
  tone.connect(toneGain).connect(master);
  tone.start(now);
  tone.stop(now + 0.36);

  const noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.24), context.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let index = 0; index < noiseData.length; index += 1) {
    const decay = 1 - index / noiseData.length;
    noiseData[index] = (Math.random() * 2 - 1) * decay;
  }
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  noise.buffer = noiseBuffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(720, now);
  filter.frequency.exponentialRampToValueAtTime(120, now + 0.22);
  noiseGain.gain.setValueAtTime(0.48, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
  noise.connect(filter).connect(noiseGain).connect(master);
  noise.start(now);

  const strobeNotes = [220, 330, 440, 660, 440, 660, 880, 990];
  strobeNotes.forEach((frequency, index) => {
    const start = now + 0.13 + index * 0.082;
    const pulse = context.createOscillator();
    const pulseGain = context.createGain();
    pulse.type = index % 2 === 0 ? "square" : "triangle";
    pulse.frequency.setValueAtTime(frequency, start);
    pulseGain.gain.setValueAtTime(0.0001, start);
    pulseGain.gain.exponentialRampToValueAtTime(index < 5 ? 0.2 : 0.14, start + 0.012);
    pulseGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.068);
    pulse.connect(pulseGain).connect(master);
    pulse.start(start);
    pulse.stop(start + 0.074);
  });

  const tail = context.createOscillator();
  const tailGain = context.createGain();
  tail.type = "sine";
  tail.frequency.setValueAtTime(330, now + 0.61);
  tail.frequency.exponentialRampToValueAtTime(660, now + 0.98);
  tailGain.gain.setValueAtTime(0.0001, now + 0.61);
  tailGain.gain.exponentialRampToValueAtTime(0.1, now + 0.66);
  tailGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
  tail.connect(tailGain).connect(master);
  tail.start(now + 0.61);
  tail.stop(now + 1.08);

  window.setTimeout(() => void context.close(), 1350);
}

export function ThresholdScene() {
  const router = useRouter();
  const sceneRef = useRef<HTMLElement>(null);
  const routeTimerRef = useRef<number | null>(null);
  const relicTimerRef = useRef<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [relicActive, setRelicActive] = useState(false);

  useEffect(() => {
    const preferenceTimer = window.setTimeout(() => setSoundEnabled(readStoredSoundPreference()), 0);
    return () => {
      window.clearTimeout(preferenceTimer);
      if (routeTimerRef.current) window.clearTimeout(routeTimerRef.current);
      if (relicTimerRef.current) window.clearTimeout(relicTimerRef.current);
    };
  }, []);

  function toggleSound() {
    const nextValue = !soundEnabled;
    setSoundEnabled(nextValue);
    writeStoredSoundPreference(nextValue);
  }

  function commitEntry(immediate = false) {
    if (ascending && !immediate) return;
    if (immediate) {
      if (routeTimerRef.current) window.clearTimeout(routeTimerRef.current);
      router.push("/archive");
      return;
    }

    setAscending(true);
    if (soundEnabled) playAscendSound();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasVisited = false;
    try {
      hasVisited = window.localStorage.getItem("ashigara-entered") === "yes";
      window.localStorage.setItem("ashigara-entered", "yes");
    } catch {
      // Repeat-visit acceleration is optional.
    }
    const delay = reducedMotion ? 180 : hasVisited ? 980 : 1220;
    routeTimerRef.current = window.setTimeout(() => router.push("/archive"), delay);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    sceneRef.current?.style.setProperty("--pointer-x", x.toFixed(3));
    sceneRef.current?.style.setProperty("--pointer-y", y.toFixed(3));
  }

  function resetPointer() {
    sceneRef.current?.style.setProperty("--pointer-x", "0");
    sceneRef.current?.style.setProperty("--pointer-y", "0");
  }

  function awakenRelic() {
    if (ascending) return;
    if (relicTimerRef.current) window.clearTimeout(relicTimerRef.current);
    setRelicActive(true);
    relicTimerRef.current = window.setTimeout(() => setRelicActive(false), 1500);
  }

  function focusRelic() {
    if (relicTimerRef.current) window.clearTimeout(relicTimerRef.current);
    setRelicActive(true);
  }

  function blurRelic() {
    setRelicActive(false);
  }

  return (
    <main
      ref={sceneRef}
      className="threshold"
      data-ascending={ascending ? "true" : "false"}
      data-relic-active={relicActive ? "true" : "false"}
      data-depth-mode={thresholdSceneManifest.relic.dimensionalMode}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="threshold__visual" aria-hidden="true">
        <picture className="threshold__picture">
          <source
            media="(max-width: 699px)"
            type="image/avif"
            srcSet="/assets/backgrounds/threshold/ashigara-threshold-mobile-actorless-640.avif 640w, /assets/backgrounds/threshold/ashigara-threshold-mobile-actorless-941.avif 941w"
            sizes="100vw"
          />
          <source
            media="(max-width: 699px)"
            type="image/webp"
            srcSet="/assets/backgrounds/threshold/ashigara-threshold-mobile-actorless-640.webp 640w, /assets/backgrounds/threshold/ashigara-threshold-mobile-actorless-941.webp 941w"
            sizes="100vw"
          />
          <source
            type="image/avif"
            srcSet="/assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-960.avif 960w, /assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-1440.avif 1440w, /assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-1672.avif 1672w"
            sizes="100vw"
          />
          <img
            src="/assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-1440.webp"
            srcSet="/assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-960.webp 960w, /assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-1440.webp 1440w, /assets/backgrounds/threshold/ashigara-threshold-desktop-actorless-1672.webp 1672w"
            sizes="100vw"
            alt=""
            width="1672"
            height="941"
            fetchPriority="high"
          />
        </picture>
        <div className="threshold__far-light" />
        <div className="threshold__mist threshold__mist--rear" />
        <div className="threshold__kintaro-depth">
          <div
            className="threshold__kintaro"
            data-sprite-mode={thresholdSceneManifest.guardian.idle.mode}
            data-frame-count={thresholdSceneManifest.guardian.idle.approvedFrameCount}
          />
        </div>
        <div className="threshold__kintaro-aura">
          {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
        </div>
        <div className="threshold__axe" />
        <div className="threshold__hoju-depth">
          <div className="threshold__hoju">
            <i className="hoju-plane hoju-plane--rear" />
            <i className="hoju-plane hoju-plane--one" />
            <i className="hoju-plane hoju-plane--two" />
            <i className="hoju-plane hoju-plane--three" />
            <i className="hoju-plane hoju-plane--front" />
            <i className="hoju-core-light" />
          </div>
        </div>
        <div className="threshold__energy-path"><i /></div>
        <div className="threshold__ground-pulse" />
        <div className="threshold__mist threshold__mist--front" />
        <div className="threshold__motes">
          {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
        </div>
        <div className="threshold__grain" />
      </div>

      <div className="threshold__fade" aria-hidden="true" />

      <button
        type="button"
        className="threshold__relic-hotspot"
        aria-label={thresholdSceneManifest.relic.interactionLabel}
        aria-describedby="hoju-description"
        aria-pressed={relicActive}
        disabled={ascending}
        onPointerEnter={awakenRelic}
        onClick={awakenRelic}
        onFocus={focusRelic}
        onBlur={blurRelic}
      >
        <span aria-hidden="true">HŌJU · RELIC FOCUS</span>
      </button>

      <p className="sr-only">
        At blue hour beneath Mount Ashigara, Kintarō stands empty-handed beside a separately planted legendary axe. A Hōju relic floats above the mountain.
      </p>
      <p id="hoju-description" className="sr-only">
        Focus or activate the relic to reveal its shallow dimensional response. This optional interaction does not block entry.
      </p>

      <section className="threshold__interface" aria-labelledby="threshold-title">
        <p className="threshold__kicker">{locale.siteKicker}</p>
        <h1 id="threshold-title">
          <span>ASHIGARA</span>
          <small>THE LIVING ARCHIVE</small>
        </h1>
        <div className="threshold__command">
          <button
            type="button"
            className="ascend-button"
            onClick={() => commitEntry()}
            disabled={ascending}
            aria-describedby="ascend-instruction"
          >
            <span>{ascending ? "ASCENDING" : locale.enter}</span>
          </button>
          <p id="ascend-instruction">{locale.ascend}</p>
        </div>
      </section>

      <div className="threshold__controls">
        <button type="button" className="sound-control" onClick={toggleSound} aria-pressed={soundEnabled}>
          <span aria-hidden="true">{soundEnabled ? "◈" : "◇"}</span>
          {soundEnabled ? locale.soundOn : locale.soundOff}
        </button>
        {ascending ? (
          <button type="button" className="skip-transition" onClick={() => commitEntry(true)}>
            {locale.skipTransition}
          </button>
        ) : null}
      </div>

      <p className="threshold__edition">
        <span>PHASE ONE · ARCHIVE GATE 01</span>
        <span>WEBSITE CREATED BY STEVEN ADKINS</span>
      </p>
    </main>
  );
}
