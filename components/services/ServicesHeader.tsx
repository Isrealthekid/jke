"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const HEADING = "What I offer";
const WORDS = HEADING.split(" ");

export default function ServicesHeader() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const wordEls = section.querySelectorAll(".sh-word-inner");

      gsap.fromTo(
        wordEls,
        { yPercent: 100 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        section.querySelector(".sh-sub"),
        { opacity: 0, y: 20 },
        {
          opacity: 0.6,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: WORDS.length * 0.08 + 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(56px, 8vw, 120px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#f5f4f0",
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "0 0.25em",
        }}
      >
        {WORDS.map((word, i) => (
          <span
            key={i}
            style={{ overflow: "hidden", display: "inline-block" }}
          >
            <span
              className="sh-word-inner"
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

      <p
        className="sh-sub"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          color: "#f5f4f0",
          opacity: 0,
          marginTop: 20,
          maxWidth: 420,
        }}
      >
        End-to-end creative work across three disciplines
      </p>
    </div>
  );
}
