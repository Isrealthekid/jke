"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

const HERO_NAME = "JOY K-EGBUSON";

function formatLagosClock(now: Date): string {
  // West Africa Time, GMT+1, no DST
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const lagos = new Date(utcMs + 60 * 60_000);
  let hours = lagos.getHours();
  const mins = lagos.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = ((hours + 11) % 12) + 1;
  return `${hours}:${String(mins).padStart(2, "0")} ${ampm} GMT+1`;
}

const HOVER_GRID = (() => {
  // 5 columns × 4 rows = 20 cells.
  // Fill with existing project thumbnails first, sprinkle a few existing
  // category labels for variety (matches the spec's mix of imagery + tiny text).
  const cells: Array<{ kind: "img"; src: string; alt: string } | { kind: "text"; value: string }> = [];
  const textPositions = new Set([6, 12, 17]); // a few cells become tiny text fragments
  let projectIdx = 0;
  const labels = ["Film", "Video Edit", "Social"];
  let labelIdx = 0;
  for (let i = 0; i < 20; i++) {
    if (textPositions.has(i)) {
      cells.push({ kind: "text", value: labels[labelIdx % labels.length] });
      labelIdx++;
    } else {
      const project = projects[projectIdx % projects.length];
      projectIdx++;
      cells.push({ kind: "img", src: project.thumbnail, alt: project.title });
    }
  }
  return cells;
})();

export default function HeroReel() {
  const [time, setTime] = useState<string>(() => formatLagosClock(new Date()));
  const [year, setYear] = useState<number>(() => new Date().getFullYear());
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      const d = new Date();
      setTime(formatLagosClock(d));
      setYear(d.getFullYear());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
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
      {/* ---- Top metadata bar ---- */}
      <div
        style={{
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
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>
        <span>6.5244° N, 3.3792° E</span>
      </div>

      {/* ---- Full-bleed name ---- */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "19vw",
          color: "#ffffff",
          lineHeight: 0.85,
          letterSpacing: "-0.02em",
          margin: 0,
          padding: "0 8px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        {HERO_NAME}
      </h1>

      {/* ---- Center metadata row ---- */}
      <div
        style={{
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
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{year}</span>
      </div>

      {/* ---- Subtitle with hover gap (existing tagline split) ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          marginBottom: "auto",
          paddingBottom: 56,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "6vw",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          SOCIAL MEDIA
        </span>

        {/* Interactive gap */}
        <span
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            width: 300,
            height: "6vw",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6vw",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            ·
          </span>
          <div
            ref={cardRef}
            aria-hidden={!hovered}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 360,
              height: 280,
              transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.85})`,
              opacity: hovered ? 1 : 0,
              transition: "transform 0.2s ease, opacity 0.2s ease",
              backgroundColor: "#ffffff",
              border: "1px solid #dddddd",
              borderRadius: 4,
              padding: 14,
              pointerEvents: "none",
              zIndex: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridAutoRows: 60,
                gap: 4,
                width: "100%",
                height: "100%",
              }}
            >
              {HOVER_GRID.map((cell, i) =>
                cell.kind === "img" ? (
                  <div
                    key={`cell-${i}`}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: 2,
                      overflow: "hidden",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    <Image
                      src={cell.src}
                      alt={cell.alt}
                      fill
                      sizes="60px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <span
                    key={`cell-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-body)",
                      fontSize: 9,
                      color: "#888888",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      lineHeight: 1,
                    }}
                  >
                    {cell.value}
                  </span>
                )
              )}
            </div>
          </div>
        </span>

        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "6vw",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          VIDEO · FILM
        </span>
      </div>
    </section>
  );
}
