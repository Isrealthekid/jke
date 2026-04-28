"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { projects, PLACEHOLDER_IMAGES } from "@/data/projects";

const MIN_DURATION = 2500; // ms — matches the liquid-fill animation
const MAX_DURATION = 8000; // ms — fail-safe so we never get stuck

const BRAND_BLUE = "#008cff";

function getLandingAssets(): string[] {
  const set = new Set<string>();
  if (projects[0]?.thumbnail) set.add(projects[0].thumbnail);
  projects
    .filter((p) => p.category === "Social Content")
    .forEach((p) => set.add(p.thumbnail));
  PLACEHOLDER_IMAGES.forEach((img) => set.add(img));
  return Array.from(set);
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const exitedRef = useRef(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const animateOut = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    const finalize = () => {
      setVisible(false);
    };
    if (!containerRef.current) {
      finalize();
      return;
    }
    // 400ms hold at 100% then slide up
    const target = containerRef.current;
    window.setTimeout(() => {
      gsap.to(target, {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: finalize,
      });
    }, 400);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!fillRef.current || !progressRef.current || !counterRef.current) return;

    // Liquid fill: rises from bottom to top through the letterforms
    gsap.fromTo(
      fillRef.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 2.5,
        ease: "power2.inOut",
      }
    );

    /* ---- Real asset preload drives counter + progress bar ---- */
    const startTime = Date.now();
    const assets = getLandingAssets();
    const total = Math.max(1, assets.length + 1); // +1 for fonts
    let loaded = 0;

    const setProgress = (value: number) => {
      const pct = Math.round(value * 100);
      if (counterRef.current) counterRef.current.textContent = `${pct}%`;
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: value,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    const finalizeIfReady = () => {
      if (loaded < total) return;
      const elapsed = Date.now() - startTime;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      window.setTimeout(animateOut, wait);
    };

    const tick = () => {
      loaded++;
      setProgress(loaded / total);
      finalizeIfReady();
    };

    assets.forEach((src) => {
      const img = new window.Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(tick).catch(tick);
    } else {
      tick();
    }

    const maxTimeout = window.setTimeout(animateOut, MAX_DURATION);
    return () => window.clearTimeout(maxTimeout);
  }, [visible, animateOut]);

  if (visible === null || visible === false) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: BRAND_BLUE,
        overflow: "hidden",
      }}
    >
      {/* ---- Center: liquid-fill JK logo ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            lineHeight: 0.9,
          }}
        >
          {/* Ghost layer */}
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(120px, 22vw, 260px)",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "-0.02em",
              display: "block",
            }}
          >
            JK
          </span>
          {/* Solid white layer with clip-path liquid fill */}
          <span
            ref={fillRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(120px, 22vw, 260px)",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              clipPath: "inset(100% 0 0 0)",
              display: "block",
            }}
          >
            JK
          </span>
          <span
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            JK
          </span>
        </div>
      </div>

      {/* ---- Bottom-left counter ---- */}
      <div
        style={{
          position: "absolute",
          left: 32,
          bottom: 28,
          display: "flex",
          alignItems: "baseline",
          gap: 14,
        }}
      >
        <span
          ref={counterRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 5vw, 80px)",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          0%
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.02em",
          }}
        >
          [Loading...]
        </span>
      </div>

      {/* ---- Bottom progress bar ---- */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 4,
          backgroundColor: "rgba(255,255,255,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
