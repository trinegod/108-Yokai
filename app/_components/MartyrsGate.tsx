"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { martyrsGate } from "@/content/martyrs";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MartyrsGate() {
  const rootRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioFadeRef = useRef(0);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundLoading, setSoundLoading] = useState(false);
  const [soundError, setSoundError] = useState(false);
  const reduceMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const motionActive = motionEnabled && !reduceMotion;

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      window.cancelAnimationFrame(audioFadeRef.current);
      audio?.pause();
    };
  }, []);

  function updatePointer(event: PointerEvent<HTMLElement>) {
    if (!motionActive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    rootRef.current?.style.setProperty("--martyrs-x", x.toFixed(3));
    rootRef.current?.style.setProperty("--martyrs-y", y.toFixed(3));
  }

  function resetPointer() {
    rootRef.current?.style.setProperty("--martyrs-x", "0");
    rootRef.current?.style.setProperty("--martyrs-y", "0");
  }

  function fadeAudio(target: number, duration: number, onComplete?: () => void) {
    const audio = audioRef.current;
    if (!audio) return;
    window.cancelAnimationFrame(audioFadeRef.current);
    const initial = audio.volume;
    const startedAt = performance.now();

    const step = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - startedAt) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(0, Math.min(1, initial + (target - initial) * eased));
      if (progress < 1) audioFadeRef.current = window.requestAnimationFrame(step);
      else onComplete?.();
    };

    audioFadeRef.current = window.requestAnimationFrame(step);
  }

  async function toggleSound() {
    const audio = audioRef.current;
    if (!audio || soundLoading) return;

    if (soundEnabled) {
      setSoundEnabled(false);
      window.localStorage.setItem("martyrs-sound", "off");
      fadeAudio(0, 450, () => audio.pause());
      return;
    }

    setSoundLoading(true);
    setSoundError(false);
    audio.volume = 0;
    try {
      await audio.play();
      setSoundEnabled(true);
      window.localStorage.setItem("martyrs-sound", "on");
      fadeAudio(0.68, 1000);
    } catch {
      setSoundEnabled(false);
      setSoundError(true);
    } finally {
      setSoundLoading(false);
    }
  }

  function toggleMotion() {
    setMotionEnabled((current) => {
      if (current) resetPointer();
      return !current;
    });
  }

  return (
    <main
      ref={rootRef}
      className="martyrs-gate"
      data-motion={motionActive ? "on" : "still"}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <a className="skip-link" href="#martyrs-controls">Skip to controls</a>
      <p className="sr-only">{martyrsGate.background.alt}</p>

      <div className="martyrs-scene" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 699px)"
            type="image/avif"
            srcSet="/assets/backgrounds/martyrs/martyrs-mobile-480.avif 480w, /assets/backgrounds/martyrs/martyrs-mobile-720.avif 720w, /assets/backgrounds/martyrs/martyrs-mobile-1080.avif 1080w, /assets/backgrounds/martyrs/martyrs-mobile-1440.avif 1440w"
            sizes="100vw"
          />
          <source
            media="(max-width: 699px)"
            type="image/webp"
            srcSet="/assets/backgrounds/martyrs/martyrs-mobile-480.webp 480w, /assets/backgrounds/martyrs/martyrs-mobile-720.webp 720w, /assets/backgrounds/martyrs/martyrs-mobile-1080.webp 1080w, /assets/backgrounds/martyrs/martyrs-mobile-1440.webp 1440w"
            sizes="100vw"
          />
          <source
            media="(min-width: 700px)"
            type="image/avif"
            srcSet="/assets/backgrounds/martyrs/martyrs-desktop-960.avif 960w, /assets/backgrounds/martyrs/martyrs-desktop-1440.avif 1440w, /assets/backgrounds/martyrs/martyrs-desktop-1920.avif 1920w, /assets/backgrounds/martyrs/martyrs-desktop-2560.avif 2560w"
            sizes="100vw"
          />
          <source
            media="(min-width: 700px)"
            type="image/webp"
            srcSet="/assets/backgrounds/martyrs/martyrs-desktop-960.webp 960w, /assets/backgrounds/martyrs/martyrs-desktop-1440.webp 1440w, /assets/backgrounds/martyrs/martyrs-desktop-1920.webp 1920w, /assets/backgrounds/martyrs/martyrs-desktop-2560.webp 2560w"
            sizes="100vw"
          />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
            alt=""
            width={martyrsGate.background.width}
            height={martyrsGate.background.height}
            fetchPriority="high"
          />
        </picture>
        <div className="martyrs-scene__grade" />
        <div className="martyrs-scene__fluorescent" />
        <div className="martyrs-scene__slice martyrs-scene__slice--one" />
        <div className="martyrs-scene__slice martyrs-scene__slice--two" />
        <div className="martyrs-scene__slice martyrs-scene__slice--three" />
        <div className="martyrs-scene__grain" />
      </div>

      <header className="martyrs-header">
        <a href="/portal-lab" className="martyrs-back" aria-label="Back to the 108 Yōkai gate index">
          <span aria-hidden="true">←</span>
          <span>108Y</span>
        </a>
        <p><span>Gate</span> {martyrsGate.gate}</p>
      </header>

      <section className="martyrs-title" aria-labelledby="martyrs-heading">
        <p className="martyrs-title__index" aria-hidden="true">02 / {martyrsGate.status}</p>
        <h1 id="martyrs-heading" aria-label={martyrsGate.title}>
          <span className="martyrs-lockup" aria-hidden="true">
            <picture>
              <source srcSet="/assets/wordmarks/martyrs/martyrs-wordmark-1200.webp" type="image/webp" />
              <img
                src="/assets/wordmarks/martyrs/martyrs-wordmark-1200.png"
                alt=""
                width="1200"
                height="156"
              />
            </picture>
          </span>
        </h1>
      </section>

      <aside className="martyrs-proof" aria-hidden="true">
        <span>Edition 00</span>
        <i />
        <span>Private threshold</span>
      </aside>

      <section id="martyrs-controls" className="martyrs-controls" aria-label="Gate 02 controls">
        <button type="button" aria-pressed={motionActive} onClick={toggleMotion}>
          Motion / {motionActive ? "On" : "Still"}
        </button>
        <button type="button" aria-pressed={soundEnabled} onClick={toggleSound} disabled={soundLoading}>
          Sound / {soundLoading ? "Loading" : soundEnabled ? "On" : "Off"}
        </button>
      </section>

      <p className="martyrs-credit">{martyrsGate.credit}</p>
      <p className="martyrs-status" aria-live="polite">
        Sound {soundError ? "unavailable" : soundEnabled ? "on" : "off"}. Motion {motionActive ? "on" : "still"}.
      </p>

      {/* Instrumental loop contains no speech or lyrical content to caption. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} loop preload="none" aria-label={martyrsGate.audio.label}>
        <source src={martyrsGate.audio.source} type="audio/wav" />
      </audio>
    </main>
  );
}
