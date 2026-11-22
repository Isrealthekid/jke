"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import KineticStatement from "./KineticStatement";

const HERO_NAME = "THE JOIE TV";
const HERO_COLOURS = ["#FF7A00", "#C6249B", "#FFD34A"]; // orange, pink, yellow

const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

function formatLagosClock(now: Date): string {
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const lagos = new Date(utcMs + 60 * 60_000);
  let hours = lagos.getHours();
  const mins = lagos.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = ((hours + 11) % 12) + 1;
  return `${hours}:${String(mins).padStart(2, "0")} ${ampm} GMT+1`;
}

/* Play the roll once per hover. The hover target (outer span) never moves, so the
   letter can't flicker when it turns edge-on under the cursor. */
function rollLetter(e: React.MouseEvent<HTMLSpanElement>) {
  const glyph = e.currentTarget.firstElementChild as HTMLElement | null;
  if (!glyph || glyph.classList.contains("is-rolling")) return;
  glyph.classList.add("is-rolling");
  glyph.addEventListener(
    "animationend",
    () => glyph.classList.remove("is-rolling"),
    { once: true }
  );
}

const LINK_STYLE: React.CSSProperties = {
  color: "#ffffff",
  textDecoration: "none",
};

export default function HeroReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  /* Drive the clock via a ref (no React re-render) so the GSAP-animated
     hero-char spans don't reconcile mid-animation. */
  useEffect(() => {
    const update = () => {
      if (clockRef.current)
        clockRef.current.textContent = formatLagosClock(new Date());
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (!nameRef.current) return;
      gsap.from(nameRef.current.querySelectorAll(".hero-char"), {
        y: 60,
        opacity: 0,
        rotateX: -45,
        duration: 2.5,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ---- Noise overlay ---- */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_SVG,
          backgroundSize: "180px 180px",
          opacity: 0.12,
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ---- Top metadata bar: same line as the logo, shifted right to sit beside it ---- */}
      <div
        className="hero-meta"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 32,
          height: 64,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#999999",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#FF7A00",
              display: "inline-block",
            }}
          />
          LAGOS, NG
        </span>
        <span ref={clockRef} style={{ fontVariantNumeric: "tabular-nums" }}>
          —
        </span>
        <span className="hero-coords">6.5244° N, 3.3792° E</span>
      </div>

      {/* ---- Full-bleed name with per-char effect ---- */}
      <h1
        ref={nameRef}
        aria-label={HERO_NAME}
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: "var(--font-heading), var(--font-display), sans-serif",
          fontWeight: 400,
          fontSize: "9.5vw",
          whiteSpace: "nowrap",
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          margin: 0,
          padding: "0 8px",
          textAlign: "center",
          marginTop: "clamp(8px, 2vh, 24px)",
          perspective: "800px",
        }}
      >
        {HERO_NAME.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            aria-hidden="true"
            className="hero-char"
            onMouseEnter={rollLetter}
            style={
              {
                display: "inline-block",
                whiteSpace: "pre",
                "--hero-hover": HERO_COLOURS[i % HERO_COLOURS.length],
              } as React.CSSProperties
            }
          >
            <span className="hero-glyph">{char === " " ? " " : char}</span>
          </span>
        ))}
      </h1>

      {/* ---- A.K.A line ---- */}
      <p
        style={{
          position: "relative",
          zIndex: 2,
          margin: 0,
          padding: "14px 16px 0",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "clamp(15px, 2.2vw, 34px)",
          letterSpacing: "0.01em",
          lineHeight: 1.1,
          color: "#ffffff",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.45)" }}>a.k.a</span> JOY
        KARENATE-EGBUSON
      </p>

      {/* ---- EDITING · FILM (both are links) ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginTop: 28,
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "clamp(13px, 1.5vw, 22px)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        <Link href="/work" className="hero-link" style={LINK_STYLE}>
          Editing
        </Link>
        <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.4)" }}>
          ·
        </span>
        <a
          href="https://films.thejoietv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-link"
          style={LINK_STYLE}
        >
          Film
        </a>
      </div>

      {/* ---- Location ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: 28,
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#aaaaaa",
        }}
      >
        Lagos, Nigeria
      </div>

      {/* ---- Statement banner, bottom of the first screen ---- */}
      <KineticStatement embedded />
    </section>
  );
}
