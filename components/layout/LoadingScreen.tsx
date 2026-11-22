"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { projects, PLACEHOLDER_IMAGES } from "@/data/projects";
import HeroReel from "@/components/home/HeroReel";

const MIN_DURATION = 2500; // ms — the sweep takes this long, even on a fast load
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
  const layoutRef = useRef<{ tlTop: number } | null>(null); // where the timeline sits when finished
  const playheadRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const exitedRef = useRef(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  /* When the sequence is done: the timeline slides down to the bottom and a Premiere-style
     program monitor, showing the home page, pops up above it, then zooms open to fill the
     screen. */
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
    const panel = root.querySelector<HTMLElement>(".tl-panel");
    if (!group || !frame || !panel) {
      finalize();
      return;
    }

    // The monitor's own timecode shows the final time from the timeline.
    const finalTime = root.querySelector<HTMLElement>(".tl-timecode")?.textContent;
    const monitorTime = root.querySelector<HTMLElement>(".pm-time");
    if (finalTime && monitorTime) monitorTime.textContent = finalTime;

    // The monitor is centred in the space between the top bar (64px) and the timeline's final
    // position at the bottom, and sized to fit there.
    const vh = window.innerHeight;
    const tlTop = layoutRef.current?.tlTop ?? vh * 0.75;
    const cy = (64 + tlTop) / 2;
    const y0 = cy - vh / 2;
    const fitScale = (0.88 * (tlTop - 64)) / (vh + 176); // 176px = the monitor's header + footer
    const k = Math.min(monitorScale(), fitScale);

    const tl = gsap.timeline({ onComplete: finalize });
    // 1. The timeline drops to the bottom while the preview monitor pops up above it...
    tl.to(panel, { y: 0, duration: 0.55, ease: "power3.inOut" }, 0);
    tl.fromTo(
      group,
      { opacity: 0, scale: k * 0.8, y: y0 },
      { opacity: 1, scale: k, y: y0, duration: 0.45, ease: "back.out(1.4)" },
      0.3
    );
    // 2. ...and almost immediately it opens up to fill the whole screen, covering the timeline.
    tl.to(group, { scale: 1, y: 0, duration: 1.1, ease: "power4.inOut" }, ">0.05");
    tl.to(frame, { borderRadius: 0, duration: 0.8, ease: "power2.inOut" }, "<0.1");
  }, []);

  useEffect(() => {
    if (!visible) return;
    const root = containerRef.current;
    const startTime = Date.now();

    /* ---- One progress value drives everything ----
       The playhead, the clips snapping in and the timecode all follow it. The
       timecode runs 00:00:00:00 to 00:00:01:00 over the sweep (it stands in for a % counter). */
    let ready = false; // assets loaded and the minimum time has passed
    const clock = { p: 0 };
    const clips = Array.from(root?.querySelectorAll<HTMLElement>(".tl-clip") ?? []).map((el) => ({
      el,
      at: parseFloat(el.dataset.start || "0") / 100,
      done: false,
    }));

    gsap.set(
      clips.map((c) => c.el),
      { scaleX: 0 }
    );

    const render = () => {
      const p = clock.p;
      if (playheadRef.current) playheadRef.current.style.left = `${p * 100}%`;
      if (timecodeRef.current) timecodeRef.current.textContent = fmt(p);
      clips.forEach((c) => {
        if (!c.done && p >= c.at) {
          c.done = true;
          gsap.fromTo(c.el, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "back.out(1.7)" });
        }
      });
    };

    const fmt = (t: number) => {
      const sec = Math.floor(t);
      const frames = Math.floor((t - sec) * 24);
      return `00:00:${String(sec).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
    };
    // The timeline pops up in the middle of the screen first, then the sweep starts.
    const panelEl = root?.querySelector<HTMLElement>(".tl-panel");
    if (panelEl) {
      const rect = panelEl.getBoundingClientRect();
      layoutRef.current = { tlTop: rect.top };
      const toCentre = window.innerHeight / 2 - (rect.top + rect.height / 2);
      gsap.fromTo(
        panelEl,
        { opacity: 0, scale: 0.94, y: toCentre + 24 },
        { opacity: 1, scale: 1, y: toCentre, duration: 0.5, ease: "back.out(1.5)" }
      );
    }

    // The sweep takes 2.5s, but holds just short of the end until the page is really ready.
    const master = gsap.to(clock, {
      p: 1,
      duration: 2.5,
      delay: 0.45,
      ease: "none",
      onUpdate: () => {
        if (!ready && clock.p >= 0.98) master.pause();
        render();
      },
      onComplete: () => {
        render();
        animateOut();
      },
    });

    const markReady = () => {
      if (ready) return;
      ready = true;
      master.play();
    };

    /* ---- Real asset preload decides when we're ready ---- */
    const assets = getLandingAssets();
    const total = Math.max(1, assets.length + 1); // +1 for fonts
    let loaded = 0;

    const finalizeIfReady = () => {
      if (loaded < total) return;
      const elapsed = Date.now() - startTime;
      window.setTimeout(markReady, Math.max(0, MIN_DURATION - elapsed));
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

    // Fail-safe: never get stuck.
    const maxTimeout = window.setTimeout(markReady, MAX_DURATION);
    return () => {
      window.clearTimeout(maxTimeout);
      master.kill();
    };
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
      <div className="tl-panel" aria-hidden="true" style={{ opacity: 0 }}>
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

      {/* ---- Logo: static, top left, exactly where it is on the site ---- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 64,
          padding: "0 clamp(16px, 5vw, 32px)",
          display: "flex",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="The Joie TV" style={{ height: 38, width: "auto", display: "block" }} />
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
          <span className="pm-time">00:00:01:00</span>
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
