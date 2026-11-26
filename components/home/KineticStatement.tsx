"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATEMENT = "I make things people watch twice.";
const WORDS = STATEMENT.split(" ");

/**
 * The tagline. Each word slides up out of a mask when the section scrolls into view.
 * Scrolling on past it slides the words back down; scrolling back up past it fades them out.
 */
export default function KineticStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const words = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".ks-word-inner")
      );

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      // Start hidden below the mask.
      gsap.set(words, { yPercent: 115, opacity: 1 });
      let shown = false;

      const show = () => {
        shown = true;
        gsap.killTweensOf(words);
        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
        });
      };
      // Scrolled on past it: the words drop back down behind the mask.
      const slideAway = () => {
        shown = false;
        gsap.killTweensOf(words);
        gsap.to(words, {
          yPercent: 115,
          duration: 0.5,
          stagger: { each: 0.04, from: "end" },
          ease: "power3.in",
        });
      };
      // Scrolled back up past it: the words fade out where they are.
      const fadeAway = () => {
        shown = false;
        gsap.killTweensOf(words);
        gsap.to(words, {
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power1.out",
          // Park them below the mask again, ready to slide up next time.
          onComplete: () => {
            gsap.set(words, { yPercent: 115, opacity: 1 });
          },
        });
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: show,
        onEnterBack: show,
        onLeave: slideAway,
        onLeaveBack: fadeAway,
        // If the page loads with the tagline already in view, wait for the loading screen.
        onRefresh: (self) => {
          if (self.isActive && !shown) {
            gsap.delayedCall(window.scrollY === 0 ? 2.9 : 0, () => {
              if (st.isActive && !shown) show();
            });
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
        // A shorter band, with the line centred in the middle.
        minHeight: "58vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px clamp(20px, 5vw, 48px)",
        backgroundColor: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <p
        className="no-zoom"
        aria-label={STATEMENT}
        style={{
          fontFamily: "var(--font-heading), var(--font-display), sans-serif",
          fontSize: "clamp(26px, 4.2vw, 64px)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          textAlign: "center",
          margin: 0,
          maxWidth: "min(1000px, 100%)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 0.3em",
        }}
      >
        {WORDS.map((word, i) => {
          const isLast = i === WORDS.length - 1; // "twice."
          return (
            <span
              key={i}
              aria-hidden="true"
              style={{
                display: "inline-block",
                overflow: "hidden",
                // room for the descenders (g, p) so the mask doesn't clip them
                paddingBottom: "0.18em",
                marginBottom: "-0.18em",
              }}
            >
              <span
                className="ks-word-inner"
                style={{
                  display: "inline-block",
                  color: isLast ? "#FF7A00" : "var(--fg)",
                  willChange: "transform",
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </p>
    </section>
  );
}
