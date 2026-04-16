"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const DURATION = 1800; // ms

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [removing, setRemoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const letterJRef = useRef<HTMLSpanElement>(null);
  const letterKRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only show once per session
    if (typeof window === "undefined") return;
    const hasLoaded = sessionStorage.getItem("jke-loaded");
    if (hasLoaded) return;

    setShow(true);

    // Animate letters in
    const tl = gsap.timeline({ delay: 0.15 });

    if (letterJRef.current && letterKRef.current) {
      tl.fromTo(
        [letterJRef.current, letterKRef.current],
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }

    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: DURATION / 1000,
        ease: "power2.inOut",
      });
    }

    // After duration: wipe up and unmount
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            setRemoving(true);
            sessionStorage.setItem("jke-loaded", "true");
          },
        });
      }
    }, DURATION);

    return () => clearTimeout(timeout);
  }, []);

  if (!show || removing) return null;

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
      {/* Letters */}
      <div
        style={{
          display: "flex",
          gap: 4,
          overflow: "hidden",
        }}
      >
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

      {/* Progress bar */}
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
            backgroundColor: "#c8ff00",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
