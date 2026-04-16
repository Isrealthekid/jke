"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";

const DURATION = 1800; // ms

export default function LoadingScreen() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const letterJRef = useRef<HTMLSpanElement>(null);
  const letterKRef = useRef<HTMLSpanElement>(null);

  // Check session storage on mount
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("jke-loaded");
    setVisible(!hasLoaded);
  }, []);

  // Run animations only after visible is true and DOM is mounted
  const animateOut = useCallback(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        setVisible(false);
        sessionStorage.setItem("jke-loaded", "true");
      },
    });
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!letterJRef.current || !letterKRef.current || !progressRef.current)
      return;

    // Animate letters
    gsap.fromTo(
      [letterJRef.current, letterKRef.current],
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.15,
      }
    );

    // Animate progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: DURATION / 1000,
      ease: "power2.inOut",
    });

    // Wipe up after duration
    const timeout = setTimeout(animateOut, DURATION);
    return () => clearTimeout(timeout);
  }, [visible, animateOut]);

  // Don't render anything until we know the session state
  if (visible === null || visible === false) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
      }}
    >
      <div style={{ display: "flex", gap: 4, overflow: "hidden" }}>
        <span
          ref={letterJRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(64px, 12vw, 120px)",
            color: "#f5f4f0",
            lineHeight: 1,
            display: "inline-block",
            opacity: 0,
          }}
        >
          J
        </span>
        <span
          ref={letterKRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(64px, 12vw, 120px)",
            color: "#f5f4f0",
            lineHeight: 1,
            display: "inline-block",
            opacity: 0,
          }}
        >
          K
        </span>
      </div>

      <div
        style={{
          width: 120,
          height: 2,
          backgroundColor: "rgba(245,244,240,0.1)",
          marginTop: 32,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#008cff",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
