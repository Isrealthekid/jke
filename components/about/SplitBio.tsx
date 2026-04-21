"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/lib/useIsMobile";
import joy1 from "@/app/images/joy1.webp";

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

      // Word-by-word reveal — fires once when the section enters the viewport.
      // Initial "hidden" state is set by GSAP (not inline) so if JS fails,
      // the text falls back to being fully visible instead of stuck clipped.
      const wordEls = section.querySelectorAll(".bio-word");
      gsap.fromTo(
        wordEls,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          stagger: 0.025,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
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
        className="bio-portrait"
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        <div ref={imageRef} style={{ position: "absolute", inset: isMobile ? 0 : "-15%", height: isMobile ? "100%" : "130%" }}>
          <Image
            src={joy1}
            alt="Joie Egbuson"
            fill
            style={{ objectFit: "cover" }}
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
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.2vw, 64px)",
            lineHeight: 1.1,
            letterSpacing: "0.01em",
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
              className="bio-word"
              style={{
                display: "inline-block",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Responsive grid override + portrait hover filter */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .md\\:!grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          .md\\:!gap-\\[80px\\] {
            gap: 80px !important;
          }
        }

        .bio-portrait img {
          filter: grayscale(100%);
          transition: filter 0.5s ease;
        }
        .bio-portrait:hover img {
          filter: grayscale(0%);
        }
      `}</style>
    </section>
  );
}
