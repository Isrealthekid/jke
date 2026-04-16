"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { useIsMobile } from "@/lib/useIsMobile";

export default function LatestProject() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const latest = projects[0];
  if (!latest) return null;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      // Parallax — desktop only (mobile gets fixed background)
      if (!isMobile) {
        gsap.to(image, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Content entrance stagger
      const items = section.querySelectorAll(".lp-reveal");
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "80vh" : "90vh",
        overflow: "hidden",
      }}
    >
      {/* Background image with parallax */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: isMobile ? 0 : "-20% 0",
          height: isMobile ? "100%" : "140%",
        }}
      >
        <Image
          src={latest.thumbnail}
          alt={latest.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content — bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 64,
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Label */}
          <span
            className="lp-reveal"
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c8ff00",
              opacity: 0,
            }}
          >
            Latest Project
          </span>

          {/* Title */}
          <h2
            className="lp-reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 80px)",
              color: "#f5f4f0",
              lineHeight: 1.05,
              marginTop: 12,
              opacity: 0,
            }}
          >
            {latest.title}
          </h2>

          {/* Description */}
          <p
            className="lp-reveal"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "#f5f4f0",
              opacity: 0,
              maxWidth: 480,
              lineHeight: 1.6,
              marginTop: 16,
            }}
          >
            {latest.description}
          </p>

          {/* Meta row */}
          <span
            className="lp-reveal"
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "#f5f4f0",
              opacity: 0,
              marginTop: 16,
            }}
          >
            {latest.client} &middot; {latest.year} &middot; {latest.role}
          </span>

          {/* CTA buttons */}
          <div
            className="lp-reveal"
            style={{
              display: "flex",
              gap: 16,
              marginTop: 28,
              opacity: 0,
            }}
          >
            <Link
              href={`/work/${latest.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 32px",
                backgroundColor: "#f5f4f0",
                color: "#0a0a0a",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Watch Now
            </Link>
            <Link
              href={`/work/${latest.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 32px",
                backgroundColor: "transparent",
                color: "#f5f4f0",
                border: "1px solid #f5f4f0",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              View Case Study
            </Link>
          </div>
        </div>

        {/* Right side — vertical category label (desktop only) */}
        <span
          className="hidden md:block"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(245,244,240,0.5)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {latest.category}
        </span>
      </div>
    </section>
  );
}
