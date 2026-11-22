"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATEMENT = "I make things people watch twice.";
const WORDS = STATEMENT.split(" ");
const SPECKS_PER_LETTER = 4;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
// Fixed (not random) so server and browser render the same speck positions.
const fixed = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * "Snap" effect: when the banner scrolls into view the letters pull back together out of
 * dust; when it scrolls out (either direction) they crumble into ash and blow away.
 */
export default function KineticStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const letters = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".ks-letter")
      );
      const specks = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".ks-speck")
      );

      // The timeline runs "whole -> dust". Scrolling away plays it, scrolling back reverses it.
      const tl = gsap.timeline({ paused: true });

      tl.to(
        letters,
        {
          x: () => rand(60, 220),
          y: () => rand(-170, -30),
          rotation: () => rand(-70, 70),
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power2.in",
          stagger: { each: 0.045, from: "random" },
        },
        0
      );

      // Ash specks: appear as a letter starts to crumble, then drift off with the wind.
      tl.to(
        specks,
        { opacity: 0.9, duration: 0.2, stagger: { each: 0.012, from: "random" } },
        0.15
      );
      tl.to(
        specks,
        {
          x: () => rand(90, 320),
          y: () => rand(-220, 40),
          opacity: 0,
          scale: () => rand(0.2, 0.9),
          duration: 1.3,
          ease: "power1.out",
          stagger: { each: 0.012, from: "random" },
        },
        0.35
      );

      // Start in the dusted state (nothing visible) and wait for the scroll.
      tl.progress(1).pause();

      const reform = () => tl.timeScale(1.15).reverse();
      const snap = () => tl.timeScale(1).play();

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: reform,
        onEnterBack: reform,
        onLeave: snap,
        onLeaveBack: snap,
        // If the page loads with the banner already in view, show it straight away.
        onRefresh: (self) => {
          if (self.isActive && tl.progress() === 1 && !tl.reversed()) reform();
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(20px, 5vw, 48px)",
        backgroundColor: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <p
        aria-label={STATEMENT}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 8vw, 110px)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "0 0.28em",
        }}
      >
        {WORDS.map((word, wi) => {
          const isLast = wi === WORDS.length - 1; // "twice."
          return (
            <span
              key={wi}
              aria-hidden="true"
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {word.split("").map((ch, ci) => (
                <span
                  key={ci}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    color: isLast ? "#FF7A00" : "#f5f4f0",
                  }}
                >
                  <span
                    className="ks-letter"
                    style={{
                      display: "inline-block",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    {ch}
                  </span>
                  {Array.from({ length: SPECKS_PER_LETTER }).map((_, si) => {
                    const seed = wi * 1000 + ci * 10 + si;
                    return (
                      <span
                        key={si}
                        className="ks-speck"
                        style={{
                          position: "absolute",
                          left: `${(15 + fixed(seed) * 70).toFixed(1)}%`,
                          top: `${(10 + fixed(seed + 0.5) * 80).toFixed(1)}%`,
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          backgroundColor: "currentColor",
                          opacity: 0,
                          pointerEvents: "none",
                        }}
                      />
                    );
                  })}
                </span>
              ))}
            </span>
          );
        })}
      </p>
    </section>
  );
}
