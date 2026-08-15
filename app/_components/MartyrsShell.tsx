"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { martyrsGate } from "@/content/martyrs";

export function MartyrsShell({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioFadeRef = useRef(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundLoading, setSoundLoading] = useState(false);
  const [soundError, setSoundError] = useState(false);

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
    <div className="martyrs-route-shell">
      {children}

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

      <p className="martyrs-status" aria-live="polite">
        Sound {soundError ? "unavailable" : soundEnabled ? "on" : "off"}.
      </p>

      {/* Instrumental loop contains no speech or lyrical content to caption. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} loop preload="none" aria-label={martyrsGate.audio.label}>
        <source src={martyrsGate.audio.source} type="audio/wav" />
      </audio>
    </div>
  );
}
