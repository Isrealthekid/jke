"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const STATEMENT = "I make things people watch twice.";
const WORDS = STATEMENT.split(" ");

export default function KineticStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const innerWords = section.querySelectorAll(".ks-word-inner");

      // Words reveal — play on enter, reverse on leave
      gsap.fromTo(
        innerWords,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "custom",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Register custom ease matching [0.22, 1, 0.36, 1]
      // GSAP doesn't take arrays in fromTo ease, so use a CustomEase-compatible string
      // power3.out is close but let's use the exact cubic-bezier via gsap
      gsap.registerEase("custom", (progress: number) => {
        // Cubic bezier approximation for [0.22, 1, 0.36, 1]
        // Using the standard formula
        return cubicBezier(0.22, 1, 0.36, 1, progress);
      });

      // Subtitle fade in with delay
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0 },
          {
            opacity: 0.4,
            duration: 0.6,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
            delay: WORDS.length * 0.08 + 0.4,
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "160px 48px",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Statement */}
      <p
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
        {WORDS.map((word, i) => {
          const isLast = i === WORDS.length - 1; // "twice."
          return (
            <span
              key={i}
              style={{
                overflow: "hidden",
                display: "inline-block",
              }}
            >
              <span
                className="ks-word-inner"
                style={{
                  display: "inline-block",
                  color: isLast ? "#c8ff00" : "#f5f4f0",
                  willChange: "transform",
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </p>

      {/* Subtitle */}
      <span
        ref={subtitleRef}
        style={{
          display: "block",
          marginTop: 40,
          fontFamily: "var(--font-body)",
          fontSize: 12,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#f5f4f0",
          opacity: 0,
        }}
      >
        Lagos &middot; Nigeria
      </span>
    </section>
  );
}

/* ---- Cubic bezier helper ---- */
function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number
): number {
  // Newton-Raphson to find t for x, then compute y
  let guess = t;
  for (let i = 0; i < 8; i++) {
    const xGuess =
      3 * (1 - guess) * (1 - guess) * guess * x1 +
      3 * (1 - guess) * guess * guess * x2 +
      guess * guess * guess -
      t;
    const dxGuess =
      3 * (1 - guess) * (1 - guess) * x1 +
      6 * (1 - guess) * guess * (x2 - x1) +
      3 * guess * guess * (1 - x2);
    if (Math.abs(dxGuess) < 1e-6) break;
    guess -= xGuess / dxGuess;
  }
  return (
    3 * (1 - guess) * (1 - guess) * guess * y1 +
    3 * (1 - guess) * guess * guess * y2 +
    guess * guess * guess
  );
}
