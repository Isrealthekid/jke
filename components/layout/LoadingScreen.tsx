"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { projects, PLACEHOLDER_IMAGES } from "@/data/projects";

const MIN_DURATION = 2500; // ms — matches the liquid-fill animation
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

export default function LoadingScreen() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
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

      {/* ---- Center: liquid-fill logo ---- */}
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

      {/* ---- Bottom-left counter ---- */}
      <div
        style={{
          position: "absolute",
          left: "clamp(20px, 5vw, 72px)",
          bottom: "clamp(28px, 3.4vw, 56px)",
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
