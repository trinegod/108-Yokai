"use client";

import {
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { martyrsGate } from "@/content/martyrs";
import { martyrsEditorials } from "@/content/martyrs-editorials";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MartyrsGate() {
  const reduceMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const motionActive = !reduceMotion;

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
        <Link href="/portal-lab" className="martyrs-back" aria-label="Back to the 108 Yōkai gate index">
          <span>108</span>
          <span>Y</span>
        </Link>
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

      <nav className="martyrs-contents" aria-label="MART¥RS editorial contents">
        <p>Contents / private edition</p>
        {martyrsEditorials.map((editorial) => (
          <Link href={`/martyrs/${editorial.slug}`} key={editorial.slug}>
            <span>{editorial.issue}</span>
            <strong>{editorial.title}</strong>
            <small>{editorial.kicker}</small>
          </Link>
        ))}
      </nav>

      <aside className="martyrs-proof" aria-hidden="true">
        <span>Edition 00</span>
        <i />
        <span>Private threshold</span>
      </aside>

      <p className="martyrs-credit">{martyrsGate.credit}</p>
    </main>
  );
}
