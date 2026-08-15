"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { leftRightGate } from "@/content/left-right";
import { LeftRightAtmosphere } from "./LeftRightAtmosphere";

type Direction = "left" | "right";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LeftRightGate() {
  const rootRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioFadeRef = useRef(0);
  const [direction, setDirection] = useState<Direction>("left");
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundLoading, setSoundLoading] = useState(false);
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
    rootRef.current?.style.setProperty("--left-right-x", x.toFixed(3));
    rootRef.current?.style.setProperty("--left-right-y", y.toFixed(3));
  }

  function resetPointer() {
    rootRef.current?.style.setProperty("--left-right-x", "0");
    rootRef.current?.style.setProperty("--left-right-y", "0");
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
      if (progress < 1) {
        audioFadeRef.current = window.requestAnimationFrame(step);
      } else {
        onComplete?.();
      }
    };

    audioFadeRef.current = window.requestAnimationFrame(step);
  }

  async function toggleSound() {
    const audio = audioRef.current;
    if (!audio || soundLoading) return;

    if (soundEnabled) {
      setSoundEnabled(false);
      window.localStorage.setItem("left-right-sound", "off");
      fadeAudio(0, 500, () => audio.pause());
      return;
    }

    setSoundLoading(true);
    audio.volume = 0;
    try {
      await audio.play();
      setSoundEnabled(true);
      window.localStorage.setItem("left-right-sound", "on");
      fadeAudio(0.72, 900);
    } catch {
      setSoundEnabled(false);
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
      className="left-right-gate"
      data-direction={direction}
      data-motion={motionActive ? "on" : "still"}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <a className="skip-link" href="#left-right-controls">Skip to controls</a>
      <p className="sr-only">{leftRightGate.background.alt}</p>

      <div className="left-right-scene" aria-hidden="true">
        <picture>
          <source
            type="image/avif"
            srcSet="/assets/backgrounds/left-right/left-right-crossing-720.avif 720w, /assets/backgrounds/left-right/left-right-crossing-1280.avif 1280w, /assets/backgrounds/left-right/left-right-crossing-1920.avif 1920w, /assets/backgrounds/left-right/left-right-crossing-2560.avif 2560w"
            sizes="100vw"
          />
          <img
            src="/assets/backgrounds/left-right/left-right-crossing-1920.webp"
            srcSet="/assets/backgrounds/left-right/left-right-crossing-720.webp 720w, /assets/backgrounds/left-right/left-right-crossing-1280.webp 1280w, /assets/backgrounds/left-right/left-right-crossing-1920.webp 1920w, /assets/backgrounds/left-right/left-right-crossing-2560.webp 2560w"
            sizes="100vw"
            alt=""
            width={leftRightGate.background.width}
            height={leftRightGate.background.height}
            fetchPriority="high"
          />
        </picture>
        <div className="left-right-scene__grade" />
        <div className="left-right-scene__reflection" />
        <div className="left-right-scene__grain" />
        <LeftRightAtmosphere active={motionActive} />
      </div>

      <header className="left-right-header">
        <a href="/portal-lab" className="left-right-back" aria-label="Back to the 108 Yōkai gate index">
          <span aria-hidden="true">←</span>
          <span>108Y</span>
        </a>
        <p><span>Gate</span> {leftRightGate.gate}</p>
      </header>

      <section className="left-right-title" aria-labelledby="left-right-heading">
        <p className="left-right-title__index" aria-hidden="true">02 / directional study</p>
        <h1 id="left-right-heading" aria-label={leftRightGate.title}>
          <span aria-hidden="true" className="left-right-word left-right-word--left" data-word={leftRightGate.titleLeft}>
            <i>{leftRightGate.titleLeft}</i>
          </span>
          <span className="left-right-divider" aria-hidden="true"><i /></span>
          <span aria-hidden="true" className="left-right-word left-right-word--right" data-word={leftRightGate.titleRight}>
            <i>{leftRightGate.titleRight}</i>
          </span>
        </h1>
        <p className="left-right-title__signal" aria-hidden="true">
          <span>L</span><i /><span>R</span>
        </p>
      </section>

      <aside className="left-right-legend" aria-hidden="true">
        <span>Direction is not position.</span>
        <i />
        <span>Position is not arrival.</span>
      </aside>

      <section id="left-right-controls" className="left-right-controls" aria-label="Gate 02 controls">
        <div className="left-right-direction" role="group" aria-label="Choose visual direction">
          <button
            type="button"
            aria-pressed={direction === "left"}
            onClick={() => setDirection("left")}
          >
            <span aria-hidden="true">←</span> Left
          </button>
          <button
            type="button"
            aria-pressed={direction === "right"}
            onClick={() => setDirection("right")}
          >
            Right <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="left-right-toggles">
          <button type="button" aria-pressed={motionActive} onClick={toggleMotion}>
            Motion / {motionActive ? "On" : "Still"}
          </button>
          <button type="button" aria-pressed={soundEnabled} onClick={toggleSound} disabled={soundLoading}>
            Sound / {soundLoading ? "Loading" : soundEnabled ? "On" : "Off"}
          </button>
        </div>
      </section>

      <p className="left-right-credit">{leftRightGate.credit}</p>
      <p className="left-right-status" aria-live="polite">
        Direction {direction}. Sound {soundEnabled ? "on" : "off"}. Motion {motionActive ? "on" : "still"}.
      </p>

      {/* Instrumental ambience contains no speech or lyrical content to caption. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} loop preload="none" aria-label={leftRightGate.audio.label}>
        <source src={leftRightGate.audio.source} type="audio/wav" />
      </audio>
    </main>
  );
}
