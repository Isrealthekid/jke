"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATEMENT = "I make things people watch twice.";
const WORDS = STATEMENT.split(" ");
const SPECKS_PER_LETTER = 26;

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
      // ...and fall to the floor (the bottom of the line), where each word's dust lies in a heap:
      // tallest in the middle, tapering off to the sides, like a pile of sand.
      const word = (el: HTMLElement) => el.closest(".ks-word") as HTMLElement;
      tl.to(
        specks,
        {
          opacity: 1,
          x: (_i: number, el: HTMLElement) => {
            const w = word(el).getBoundingClientRect();
            const e = el.getBoundingClientRect();
            const u = parseFloat(el.dataset.u || "0"); // -1 (left edge) .. 1 (right edge), bell-shaped
            return w.left + w.width / 2 + u * w.width * 0.5 - (e.left + e.width / 2);
          },
          y: (_i: number, el: HTMLElement) => {
            const w = word(el).getBoundingClientRect();
            const e = el.getBoundingClientRect();
            const u = parseFloat(el.dataset.u || "0");
            const depth = parseFloat(el.dataset.d || "0"); // 0 = top surface, 1 = bottom of the heap
            const floor = w.bottom - w.height * 0.08;
            const heapHeight = Math.min(w.height * 0.5, w.width * 0.4);
            const surface = heapHeight * (1 - Math.pow(Math.abs(u), 1.4));
            return floor - surface * (1 - depth) - e.top;
          },
          duration: 0.55,
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

      // 0 = the line is whole, 1 = it has blown away. Always glide the timeline to wherever it
      // should be, from wherever it currently is, so quick or repeated scrolling can't confuse it.
      let target: 0 | 1 = 1;
      const goTo = (t: 0 | 1) => {
        if (target === t) return;
        target = t;
        gsap.killTweensOf(tl);
        tl.tweenTo(t === 1 ? tl.duration() : 0, {
          duration: tl.duration() / (t === 1 ? 1.4 : 2),
          ease: "none",
        });
      };

      // If the window is resized, re-measure where the heaps go.
      let resizeTimer: number | undefined;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          gsap.killTweensOf(tl);
          tl.progress(0).invalidate().progress(target);
        }, 250);
      };
      window.addEventListener("resize", onResize);

      const st = ScrollTrigger.create({
        trigger: section,
        // Forms as it comes into view; crumbles as it leaves (either direction).
        start: "top 55%",
        end: "bottom 80%",
        onToggle: (self) => goTo(self.isActive ? 0 : 1),
        // After any layout refresh, make sure the line matches where we are on the page.
        onRefresh: (self) => {
          if (self.isActive && target === 1) {
            // On first load, wait for the loading screen to lift before it forms.
            gsap.delayedCall(window.scrollY === 0 ? 2.9 : 0, () => {
              if (st.isActive) goTo(0);
            });
          } else if (!self.isActive && target === 0) {
            goTo(1);
          }
        },
      });

      return () => {
        window.clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
      };
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
        backgroundColor: "#000000",
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
              className="ks-word"
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
                    const seed = wi * 10000 + ci * 100 + si;
                    const size = 2 + Math.round(fixed(seed + 0.9)); // 2-3px
                    // Where this grain ends up in the heap: u from -1 (left) to 1 (right), bunched
                    // towards the middle; depth from 0 (surface) to 1 (bottom).
                    const u =
                      (fixed(seed + 1) + fixed(seed + 2) + fixed(seed + 3)) / 1.5 - 1;
                    const depth = fixed(seed + 4);
                    return (
                      <span
                        key={si}
                        className="ks-speck"
                        data-u={u.toFixed(3)}
                        data-d={depth.toFixed(3)}
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
