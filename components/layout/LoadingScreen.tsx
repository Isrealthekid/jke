"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { projects, PLACEHOLDER_IMAGES } from "@/data/projects";
import HeroReel from "@/components/home/HeroReel";

const MIN_DURATION = 2500; // ms — matches the timeline sweep and the logo fill
const MAX_DURATION = 8000; // ms — fail-safe so we never get stuck

const BRAND_ORANGE = "#FF7A00";

function getLandingAssets(): string[] {
  const set = new Set<string>();
  if (projects[0]?.thumbnail) set.add(projects[0].thumbnail);
  projects
    .filter((p) => p.category === "Edits")
    .forEach((p) => set.add(p.thumbnail));
  PLACEHOLDER_IMAGES.forEach((img) => set.add(img));
  return Array.from(set);
}

/** How small the preview monitor starts out (1 = full screen). */
const monitorScale = () => (window.innerWidth < 700 ? 0.6 : 0.46);

/* Static copy of the top bar, so the preview matches the real home page. */
const PILL: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  height: 36,
  padding: "0 16px",
  borderRadius: 999,
  fontFamily: "var(--font-body)",
  fontSize: 12,
  whiteSpace: "nowrap",
};

function PreviewTopBar() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        padding: "0 clamp(16px, 5vw, 32px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 5,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" style={{ height: 38, width: "auto", display: "block" }} />
      <div style={{ display: "flex", alignItems: "center", gap: window.innerWidth >= 768 ? 24 : 16 }}>
        <span style={{ ...PILL, background: "#f5f4f0", color: "#000", fontWeight: 600 }}>
          <i
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "block" }}
          />
          Work with me
        </span>
        <span
          style={{
            ...PILL,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#f5f4f0",
            fontWeight: 500,
          }}
        >
          Menu
          <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <i style={{ width: 18, height: 1.5, background: "#f5f4f0", display: "block" }} />
            <i style={{ width: 18, height: 1.5, background: "#f5f4f0", display: "block" }} />
            <i style={{ width: 18, height: 1.5, background: "#f5f4f0", display: "block" }} />
          </span>
        </span>
      </div>
    </div>
  );
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const exitedRef = useRef(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  /* When the sequence is done: the logo and timeline give way to a Premiere-style program
     monitor showing the home page, which then zooms up to fill the screen. */
  const animateOut = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    const root = containerRef.current;
    const finalize = () => setVisible(false);
    if (!root) {
      finalize();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(root, { opacity: 0, duration: 0.3, onComplete: finalize });
      return;
    }

    const group = root.querySelector<HTMLElement>(".pm-group");
    const frame = root.querySelector<HTMLElement>(".pm-frame");
    const logo = root.querySelector<HTMLElement>(".pm-logo");
    const fadeOut = root.querySelectorAll<HTMLElement>(".pm-fade");
    if (!group || !frame || !logo) {
      finalize();
      return;
    }

    // The monitor takes the logo's place: centred on it, and small enough to fit in the space
    // above the timeline (which stays where it is).
    const vh = window.innerHeight;
    const r = logo.getBoundingClientRect();
    const cy = r.top + r.height / 2;
    const y0 = cy - vh / 2;
    const fitScale = (0.9 * (2 * cy)) / (vh + 176); // 176px = the monitor's header + footer
    const k = Math.min(monitorScale(), fitScale);

    const tl = gsap.timeline({ onComplete: finalize });
    // 1. The logo is replaced by the preview monitor...
    tl.to(fadeOut, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
    tl.fromTo(
      group,
      { opacity: 0, scale: k * 0.85, y: y0 },
      { opacity: 1, scale: k, y: y0, duration: 0.4, ease: "power3.out" },
      0.05
    );
    // 2. ...and almost immediately opens up to fill the whole screen, covering the timeline.
    tl.to(group, { scale: 1, y: 0, duration: 1.1, ease: "power4.inOut" }, ">0.05");
    tl.to(frame, { borderRadius: 0, duration: 0.8, ease: "power2.inOut" }, "<0.1");
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!fillRef.current) return;

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

    // Editing timeline: the playhead sweeps across while clips snap into the tracks as it
    // passes them; the timecode runs alongside (24 fps).
    const clips = containerRef.current?.querySelectorAll<HTMLElement>(".tl-clip");
    clips?.forEach((clip) => {
      const start = parseFloat(clip.dataset.start || "0") / 100;
      gsap.fromTo(
        clip,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, delay: start * 2.5, ease: "back.out(1.7)" }
      );
    });
    if (playheadRef.current) {
      const clock = { t: 0 };
      gsap.fromTo(
        playheadRef.current,
        { left: "0%" },
        { left: "100%", duration: 2.5, ease: "none" }
      );
      gsap.to(clock, {
        t: 2.5,
        duration: 2.5,
        ease: "none",
        onUpdate: () => {
          const sec = Math.floor(clock.t);
          const frames = Math.floor((clock.t - sec) * 24);
          if (timecodeRef.current)
            timecodeRef.current.textContent = `00:00:${String(sec).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
        },
      });
    }

    /* ---- Real asset preload decides when we're ready to open ---- */
    const startTime = Date.now();
    const assets = getLandingAssets();
    const total = Math.max(1, assets.length + 1); // +1 for fonts
    let loaded = 0;

    const finalizeIfReady = () => {
      if (loaded < total) return;
      const elapsed = Date.now() - startTime;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      window.setTimeout(animateOut, wait);
    };

    const tick = () => {
      loaded++;
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
        backgroundColor: BRAND_ORANGE,
        overflow: "hidden",
      }}
    >
      {/* ---- Editing timeline ---- */}
      <div className="tl-panel" aria-hidden="true">
        <div className="tl-head">
          <span ref={timecodeRef} className="tl-timecode">
            00:00:00:00
          </span>
          <span>Seq 01 &middot; The Joie TV</span>
          <span>24 fps</span>
        </div>
        <div className="tl-body">
          <div className="tl-ruler" />
          <div className="tl-track">
            <i className="tl-clip tl-pink" data-start="4" style={{ left: "4%", width: "16%" }} />
            <i className="tl-clip tl-white" data-start="24" style={{ left: "24%", width: "12%" }} />
            <i className="tl-clip tl-yellow" data-start="40" style={{ left: "40%", width: "22%" }} />
            <i className="tl-clip tl-pink" data-start="68" style={{ left: "68%", width: "10%" }} />
            <i className="tl-clip tl-white" data-start="82" style={{ left: "82%", width: "14%" }} />
          </div>
          <div className="tl-track">
            <i className="tl-clip tl-white" data-start="0" style={{ left: "0%", width: "20%" }} />
            <i className="tl-clip tl-black" data-start="22" style={{ left: "22%", width: "18%" }} />
            <i className="tl-clip tl-pink" data-start="44" style={{ left: "44%", width: "14%" }} />
            <i className="tl-clip tl-yellow" data-start="62" style={{ left: "62%", width: "20%" }} />
            <i className="tl-clip tl-black" data-start="84" style={{ left: "84%", width: "16%" }} />
          </div>
          <div className="tl-track">
            <i className="tl-clip tl-yellow" data-start="2" style={{ left: "2%", width: "26%" }} />
            <i className="tl-clip tl-white" data-start="32" style={{ left: "32%", width: "24%" }} />
            <i className="tl-clip tl-black" data-start="60" style={{ left: "60%", width: "14%" }} />
            <i className="tl-clip tl-pink" data-start="76" style={{ left: "76%", width: "22%" }} />
          </div>
          <div ref={playheadRef} className="tl-playhead">
            <i />
          </div>
        </div>
      </div>

      {/* ---- Logo, centred in the space above the timeline ---- */}
      <div
        className="pm-fade"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding:
            "24px 24px calc(clamp(28px, 3.4vw, 56px) + clamp(120px, 11vw, 160px) + 16px)",
        }}
      >
        <div
          className="pm-logo"
          style={{
            position: "relative",
            display: "inline-block",
            lineHeight: 0.9,
          }}
        >
          {/* Ghost layer */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            style={{
              width: "clamp(150px, 24vw, 340px)",
              height: "auto",
              display: "block",
              opacity: 0.2,
            }}
          />
          {/* Solid white layer with clip-path liquid fill */}
          <span
            ref={fillRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "inset(100% 0 0 0)",
              display: "block",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt=""
              style={{ width: "100%", height: "auto", display: "block" }}
            />
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
            The Joie TV
          </span>
        </div>
      </div>

      {/* ---- Preview monitor (like Premiere's Program monitor), shown at the end ---- */}
      <div className="pm-group" aria-hidden="true" style={{ opacity: 0 }}>
        <div className="pm-panel" />
        <div className="pm-header">
          <span>Program: The Joie TV</span>
          <span className="pm-menu">&#8801;</span>
        </div>
        <div className="pm-frame">
          <div className="pm-stage">
            <PreviewTopBar />
            <HeroReel instant />
          </div>
        </div>
        <div className="pm-footer">
          <span className="pm-time">00:00:02:12</span>
          <span className="pm-transport">
            <i className="pm-prev" />
            <i className="pm-play" />
            <i className="pm-next" />
          </span>
          <span className="pm-fit">Fit &nbsp; 1/2</span>
        </div>
      </div>
    </div>
  );
}
