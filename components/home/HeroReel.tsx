"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const HERO_NAME = "JOY K-EGBUSON";

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

export default function HeroReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  /* Drive clock + year via refs (no React re-render) so the GSAP-animated
     hero-char spans don't reconcile mid-animation. */
  useEffect(() => {
    const update = () => {
      const d = new Date();
      if (clockRef.current) clockRef.current.textContent = formatLagosClock(d);
      if (yearRef.current) yearRef.current.textContent = String(d.getFullYear());
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

      {/* ---- Top metadata bar ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 32,
          padding: "20px 32px 0",
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
              backgroundColor: "#008cff",
              display: "inline-block",
            }}
          />
          LAGOS, NG
        </span>
        <span ref={clockRef} style={{ fontVariantNumeric: "tabular-nums" }}>
          —
        </span>
        <span>6.5244° N, 3.3792° E</span>
      </div>

      {/* ---- Full-bleed name with per-char effect ---- */}
      <h1
        ref={nameRef}
        aria-label={HERO_NAME}
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: "var(--font-display)",
          fontSize: "19vw",
          color: "#ffffff",
          lineHeight: 0.85,
          letterSpacing: "-0.02em",
          margin: 0,
          padding: "0 8px",
          textAlign: "center",
          marginTop: "auto",
          perspective: "800px",
        }}
      >
        {HERO_NAME.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            aria-hidden="true"
            className="hero-char"
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              transformStyle: "preserve-3d",
              transformOrigin: "50% 60%",
            }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </h1>

      {/* ---- Center metadata row ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          padding: "16px clamp(24px, 30%, 30%)",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#aaaaaa",
        }}
      >
        <span>BASED IN LAGOS</span>
        <span ref={yearRef} style={{ fontVariantNumeric: "tabular-nums" }}>
          —
        </span>
      </div>

      {/* ---- Subtitle (smaller, no hover image) ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          marginBottom: "auto",
          paddingBottom: 56,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.6vw, 44px)",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          SOCIAL MEDIA
        </span>
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.6vw, 44px)",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1,
          }}
        >
          ·
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.6vw, 44px)",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          VIDEO
        </span>
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.6vw, 44px)",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1,
          }}
        >
          ·
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.6vw, 44px)",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          FILM
        </span>
      </div>
    </section>
  );
}
