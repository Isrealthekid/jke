"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PLACEHOLDER_IMAGES } from "@/data/projects";
import { useIsMobile } from "@/lib/useIsMobile";

const BIO_TEXT =
  "JK Egbuson is a Lagos-based social media manager, video editor and filmmaker with over 5 years of experience crafting visual stories for brands and individuals. From documentary films to viral social campaigns, the work is driven by one belief: great storytelling changes how people feel about a brand.";

const WORDS = BIO_TEXT.split(" ");

export default function SplitBio() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      // Photo parallax — desktop only
      if (!isMobile) {
        gsap.fromTo(
          image,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Word-by-word reveal tied to scroll
      const wordEls = section.querySelectorAll(".bio-word");
      wordEls.forEach((word, i) => {
        gsap.fromTo(
          word,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${80 + i * 12}px top`,
              end: () => `top+=${80 + i * 12 + 60}px top`,
              scrub: 0.5,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 48,
        minHeight: "80vh",
        alignItems: "start",
      }}
      className="md:!grid-cols-2 md:!gap-[80px]"
    >
      {/* LEFT — Portrait photo */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        <div ref={imageRef} style={{ position: "absolute", inset: isMobile ? 0 : "-15%", height: isMobile ? "100%" : "130%" }}>
          <Image
            src={PLACEHOLDER_IMAGES[0]}
            alt="JK Egbuson"
            fill
            style={{
              objectFit: "cover",
              filter: "saturate(0.8)",
            }}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>
      </div>

      {/* RIGHT — Bio text with word reveal */}
      <div style={{ paddingTop: 16 }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(245,244,240,0.35)",
            display: "block",
            marginBottom: 32,
          }}
        >
          About
        </span>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 20,
            lineHeight: 1.8,
            color: "#f5f4f0",
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "0 0.3em",
          }}
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="bio-word"
              style={{
                display: "inline-block",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Responsive grid override */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .md\\:!grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          .md\\:!gap-\\[80px\\] {
            gap: 80px !important;
          }
        }
      `}</style>
    </section>
  );
}
