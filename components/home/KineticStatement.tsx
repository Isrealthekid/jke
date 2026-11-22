"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATEMENT = "I make things people watch twice.";
const WORDS = STATEMENT.split(" ");
const SPECKS_PER_LETTER = 10;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
// Fixed (not random) so server and browser render the same speck positions.
const fixed = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * "Snap" effect, in order from the first letter to the last:
 *   1. each letter crumbles into a little pile of dust where it stands,
 *   2. then the wind takes the dust away.
 * Scrolling back plays it in reverse: the dust blows back in, gathers, and re-forms the letters.
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

      const crumbleEach = 0.022; // gap between one letter and the next, left to right
      const crumbleSpan = letters.length * crumbleEach;

      // The timeline runs "whole -> dust -> gone". Scrolling away plays it, scrolling back reverses it.
      const tl = gsap.timeline({ paused: true });

      // 1. Letters crumble, left to right.
      tl.to(
        letters,
        {
          opacity: 0,
          y: 10,
          filter: "blur(5px)",
          duration: 0.3,
          ease: "power1.in",
          stagger: { each: crumbleEach, from: "start" },
        },
        0
      );
      // ...and fall to the floor (the bottom of the line), where the dust lies in a heap.
      tl.to(
        specks,
        {
          opacity: 1,
          y: (_i: number, el: HTMLElement) => {
            const letterBox = el.parentElement as HTMLElement;
            return letterBox.clientHeight * 0.92 - el.offsetTop - rand(0, 9);
          },
          x: () => rand(-14, 14),
          duration: 0.45,
          ease: "power2.in", // gravity: speeds up as it falls
          stagger: { amount: crumbleSpan, from: "start" },
        },
        0.05
      );

      // 2. A short beat on the floor, then the wind lifts the dust and carries it away, left to right.
      const blowAt = crumbleSpan + 0.5;
      tl.to(
        specks,
        {
          x: () => "+=" + rand(240, 640),
          y: () => "+=" + rand(-150, -15),
          opacity: 0,
          scale: () => rand(0.2, 0.8),
          duration: 0.8,
          ease: "power1.in",
          stagger: { amount: crumbleSpan, from: "start" },
        },
        blowAt
      );

      // Start in the "gone" state (nothing visible) and wait for the scroll.
      tl.progress(1).pause();

      const reform = () => tl.timeScale(2).reverse();
      const snap = () => tl.timeScale(1.4).play();

      ScrollTrigger.create({
        trigger: section,
        // Forms as it comes into view; crumbles as it leaves.
        start: "top 55%",
        end: "bottom 80%",
        onEnter: reform,
        onEnterBack: reform,
        onLeave: snap,
        onLeaveBack: snap,
        // If the page loads with the banner already in view, show it straight away.
        onRefresh: (self) => {
          if (self.isActive && tl.progress() === 1 && !tl.reversed()) {
            // On first load, wait for the loading screen to lift before it forms.
            gsap.delayedCall(window.scrollY === 0 ? 2.9 : 0, reform);
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        // Its own full screen, with the line in the middle.
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(20px, 5vw, 48px)",
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
                    const size = 2 + Math.round(fixed(seed + 0.9) * 2); // 2-4px
                    return (
                      <span
                        key={si}
                        className="ks-speck"
                        style={{
                          position: "absolute",
                          left: `${(10 + fixed(seed) * 80).toFixed(1)}%`,
                          top: `${(15 + fixed(seed + 0.5) * 75).toFixed(1)}%`,
                          width: size,
                          height: size,
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
