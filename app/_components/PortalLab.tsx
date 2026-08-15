"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { portalGates, type PortalGate } from "@/content/portal-gates";

type StreetTagPosition = {
  desktop: { x: string; y: string };
  mobile: { x: string; y: string };
  angle: string;
};

const streetTagPositions: Record<string, StreetTagPosition> = {
  "01": { desktop: { x: "47.2%", y: "49%" }, mobile: { x: "57.5%", y: "43.5%" }, angle: "-2deg" },
  "02": { desktop: { x: "35%", y: "86%" }, mobile: { x: "16.5%", y: "58%" }, angle: "3deg" },
  "03": { desktop: { x: "79%", y: "29%" }, mobile: { x: "88%", y: "39%" }, angle: "-1deg" },
  "04": { desktop: { x: "46.2%", y: "88%" }, mobile: { x: "53.5%", y: "78%" }, angle: "2deg" },
  "05": { desktop: { x: "89%", y: "74%" }, mobile: { x: "87%", y: "69%" }, angle: "-4deg" },
  "06": { desktop: { x: "36%", y: "44%" }, mobile: { x: "25%", y: "46%" }, angle: "1deg" },
  "07": { desktop: { x: "68.4%", y: "57%" }, mobile: { x: "78%", y: "53%" }, angle: "-3deg" },
  "08": { desktop: { x: "40.5%", y: "25%" }, mobile: { x: "11%", y: "48%" }, angle: "-2deg" },
  "09": { desktop: { x: "63.2%", y: "66%" }, mobile: { x: "70%", y: "63%" }, angle: "4deg" },
  "10": { desktop: { x: "38.8%", y: "72%" }, mobile: { x: "36%", y: "68%" }, angle: "-4deg" },
  "11": { desktop: { x: "63.5%", y: "46%" }, mobile: { x: "72%", y: "43%" }, angle: "2deg" },
  "12": { desktop: { x: "73.3%", y: "8%" }, mobile: { x: "89%", y: "27%" }, angle: "-3deg" },
};

export function PortalLab() {
  const portalRef = useRef<HTMLElement>(null);
  const gateOneRef = useRef<HTMLAnchorElement>(null);
  const [chamberOpen, setChamberOpen] = useState(false);
  const [gateOneActive, setGateOneActive] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const reduceMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const motionActive = motionEnabled && !reduceMotion;

  useEffect(() => {
    if (!chamberOpen) return;
    const frame = window.requestAnimationFrame(() => gateOneRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [chamberOpen]);

  function updatePointer(event: PointerEvent<HTMLElement>) {
    if (!motionActive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    portalRef.current?.style.setProperty("--portal-x", x.toFixed(3));
    portalRef.current?.style.setProperty("--portal-y", y.toFixed(3));
  }

  function resetPointer() {
    portalRef.current?.style.setProperty("--portal-x", "0");
    portalRef.current?.style.setProperty("--portal-y", "0");
  }

  function toggleMotion() {
    setMotionEnabled((current) => {
      if (current) resetPointer();
      return !current;
    });
  }

  function openChamber() {
    const shouldReduceMotion = !motionActive;
    setChamberOpen(true);
    window.requestAnimationFrame(() => {
      document.getElementById("portal-gates")?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <main
      ref={portalRef}
      className="portal-lab portal-street"
      data-chamber-open={chamberOpen ? "true" : "false"}
      data-gate-one-active={gateOneActive ? "true" : "false"}
      data-motion={motionActive ? "on" : "still"}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <a className="skip-link" href="#portal-gates">Skip to the gate index</a>

      <section className="portal-hero" aria-labelledby="portal-title">
        <div className="portal-hero__environment" aria-hidden="true">
          <picture>
            <source
              media="(max-width: 699px)"
              type="image/avif"
              srcSet="/assets/backgrounds/portal/108-yokai-analog-street-mobile-640.avif 640w, /assets/backgrounds/portal/108-yokai-analog-street-mobile-720.avif 720w, /assets/backgrounds/portal/108-yokai-analog-street-mobile-941.avif 941w"
              sizes="100vw"
            />
            <source
              media="(max-width: 699px)"
              type="image/webp"
              srcSet="/assets/backgrounds/portal/108-yokai-analog-street-mobile-640.webp 640w, /assets/backgrounds/portal/108-yokai-analog-street-mobile-720.webp 720w, /assets/backgrounds/portal/108-yokai-analog-street-mobile-941.webp 941w"
              sizes="100vw"
            />
            <source
              type="image/avif"
              srcSet="/assets/backgrounds/portal/108-yokai-analog-street-desktop-960.avif 960w, /assets/backgrounds/portal/108-yokai-analog-street-desktop-1280.avif 1280w, /assets/backgrounds/portal/108-yokai-analog-street-desktop-1672.avif 1672w"
              sizes="100vw"
            />
            <img
              src="/assets/backgrounds/portal/108-yokai-analog-street-desktop-1672.webp"
              srcSet="/assets/backgrounds/portal/108-yokai-analog-street-desktop-960.webp 960w, /assets/backgrounds/portal/108-yokai-analog-street-desktop-1280.webp 1280w, /assets/backgrounds/portal/108-yokai-analog-street-desktop-1672.webp 1672w"
              sizes="100vw"
              alt=""
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </picture>
          <div className="portal-hero__exposure" />
          <div className="portal-hero__grain" />
          <div className="portal-hero__registration" />
        </div>

        <header className="portal-utility">
          <button type="button" onClick={toggleMotion} aria-pressed={motionActive}>
            Motion / {motionActive ? "On" : "Still"}
          </button>
        </header>

        <div className="portal-wordmark" aria-hidden="true">
          <span className="portal-wordmark__number" data-text="108">108</span>
          <span className="portal-wordmark__name" data-text="YŌKAI">
            YŌKA<span className="portal-wordmark__final">I</span>
            <i className="portal-wordmark__sigil" />
          </span>
        </div>
        <h1 id="portal-title" className="sr-only">108 Yōkai</h1>

        <div className="portal-graffiti" aria-hidden="true">
          <span className="portal-graffiti__yokai">妖怪</span>
          <span className="portal-graffiti__number">百八</span>
          <span className="portal-graffiti__gate">GATE_01</span>
          <span className="portal-graffiti__ashigara">ASHIGARA</span>
        </div>

        <nav className="portal-street-tags" aria-label="Gate markers inside the passage">
          <ol>
            {portalGates.map((gate) => (
              <HeroGateTag
                key={gate.number}
                gate={gate}
                position={streetTagPositions[gate.number]}
                onActiveChange={gate.number === "01" ? setGateOneActive : undefined}
              />
            ))}
          </ol>
        </nav>

        <div className="portal-invitation">
          <button type="button" onClick={openChamber} aria-controls="portal-gates" aria-expanded={chamberOpen}>
            <span>The</span>
            <svg aria-hidden="true" viewBox="0 0 24 28">
              <path d="M12 1v23M5 17l7 7 7-7" />
            </svg>
            <span>wall</span>
          </button>
        </div>

        <p className="portal-hero__counter" aria-hidden="true"><span>GATE</span><i /><span>01 / 12</span></p>
        <p className="portal-hero__credit">Website created by Steven Adkins</p>
      </section>

      <section id="portal-gates" className="portal-chamber" aria-labelledby="portal-gates-title">
        <div className="portal-chamber__head">
          <h2 id="portal-gates-title"><span>The</span> back wall.</h2>
          <p>Traces...</p>
        </div>

        <ol className="portal-gates" aria-label="108 Yōkai gate index">
          {portalGates.map((gate, index) => (
            <li
              key={gate.number}
              className={`portal-gate portal-gate--${gate.status}`}
              style={{ "--gate-index": index } as CSSProperties}
            >
              {gate.href ? (
                <a
                  ref={index === 0 ? gateOneRef : undefined}
                  href={gate.href}
                  onPointerEnter={() => setGateOneActive(true)}
                  onPointerLeave={() => setGateOneActive(false)}
                  onFocus={() => setGateOneActive(true)}
                  onBlur={() => setGateOneActive(false)}
                >
                  <GateContents gate={gate} />
                </a>
              ) : (
                <div aria-label={`Gate ${gate.number}, sealed`}>
                  <GateContents gate={gate} />
                </div>
              )}
            </li>
          ))}
        </ol>

      </section>
    </main>
  );
}

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function HeroGateTag({
  gate,
  position,
  onActiveChange,
}: {
  gate: PortalGate;
  position: StreetTagPosition;
  onActiveChange?: (active: boolean) => void;
}) {
  const style = {
    "--tag-x": position.desktop.x,
    "--tag-y": position.desktop.y,
    "--tag-mobile-x": position.mobile.x,
    "--tag-mobile-y": position.mobile.y,
    "--tag-angle": position.angle,
  } as CSSProperties;

  return (
    <li className={`portal-street-tag portal-street-tag--${gate.status} portal-street-tag--${gate.number}`} style={style}>
      {gate.href ? (
        <a
          href={gate.href}
          aria-label={`Enter Gate ${gate.number}: ${gate.title}, ${gate.subtitle}`}
          onPointerEnter={() => onActiveChange?.(true)}
          onPointerLeave={() => onActiveChange?.(false)}
          onFocus={() => onActiveChange?.(true)}
          onBlur={() => onActiveChange?.(false)}
        >
          {gate.number === "01" || gate.number === "02" ? (
            <picture className="portal-street-tag__sticker">
              <source
                type="image/webp"
                srcSet={gate.number === "01"
                  ? "/assets/stickers/portal/gate-01-brutal-calligraphy-256.webp 256w, /assets/stickers/portal/gate-01-brutal-calligraphy-512.webp 512w"
                  : "/assets/stickers/portal/gate-02-editorial-256.webp 256w, /assets/stickers/portal/gate-02-editorial-512.webp 512w"}
                sizes="(max-width: 699px) 92px, 112px"
              />
              <img
                src={gate.number === "01"
                  ? "/assets/stickers/portal/gate-01-brutal-calligraphy-512.png"
                  : "/assets/stickers/portal/gate-02-editorial-512.png"}
                srcSet={gate.number === "01"
                  ? "/assets/stickers/portal/gate-01-brutal-calligraphy-256.png 256w, /assets/stickers/portal/gate-01-brutal-calligraphy-512.png 512w"
                  : "/assets/stickers/portal/gate-02-editorial-256.png 256w, /assets/stickers/portal/gate-02-editorial-512.png 512w"}
                sizes="(max-width: 699px) 92px, 112px"
                alt=""
                width="512"
                height="512"
                decoding="async"
              />
            </picture>
          ) : (
            <span className="portal-street-tag__type" aria-hidden="true">
              <b>02</b><i>M¥R(S)</i>
            </span>
          )}
        </a>
      ) : (
        <span aria-label={`Gate ${gate.number}, sealed`}><b>{gate.number}</b><i /></span>
      )}
    </li>
  );
}

function GateContents({ gate }: { gate: PortalGate }) {
  return (
    <>
      <span className="portal-gate__number">{gate.number}</span>
      <span className="portal-gate__label">
        <strong>
          <span>{gate.title}</span>
          {gate.japanese ? <em className="portal-gate__japanese" lang="ja">{gate.japanese}</em> : null}
        </strong>
        <small>{gate.subtitle}</small>
      </span>
      <span className="portal-gate__state" aria-hidden="true">{gate.status === "open" ? "Enter ↗" : "Sealed"}</span>
    </>
  );
}
