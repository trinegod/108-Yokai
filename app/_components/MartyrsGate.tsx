"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioFadeRef = useRef(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundLoading, setSoundLoading] = useState(false);
  const [soundError, setSoundError] = useState(false);
  const reduceMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const motionActive = !reduceMotion;

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      window.cancelAnimationFrame(audioFadeRef.current);
      audio?.pause();
    };
  }, []);

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

  return (
    <main
      className="martyrs-gate"
      data-motion={motionActive ? "on" : "still"}
    >
      <a className="skip-link" href="#martyrs-controls">Skip to sound control</a>
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
        <div className="martyrs-scene__grain" />
      </div>

      <header className="martyrs-header">
        <a href="/portal-lab" className="martyrs-back" aria-label="Back to the 108 Yōkai gate index">
          <span>108</span>
          <span>Y</span>
        </a>
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

      <section id="martyrs-controls" className="martyrs-controls" aria-label="Sound control">
        <button
          className="martyrs-sound-control"
          type="button"
          aria-label={soundLoading ? "Sound loading" : soundEnabled ? "Turn sound off" : "Turn sound on"}
          aria-pressed={soundEnabled}
          onClick={toggleSound}
          disabled={soundLoading}
        >
          <span className="martyrs-sound-icon" aria-hidden="true">
            <span className="martyrs-sound-icon__speaker" />
            <span className="martyrs-sound-icon__signal" />
          </span>
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
