"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { projects, PLACEHOLDER_IMAGES } from "@/data/projects";

/* ---- Card data ---- */
const categories = [
  {
    title: "Filmmaking",
    image: PLACEHOLDER_IMAGES[0],
    backColor: "#0d1117",
    filter: "Film",
  },
  {
    title: "Video Editing",
    image: PLACEHOLDER_IMAGES[1],
    backColor: "#110d17",
    filter: "Video Edit",
  },
  {
    title: "Social Content",
    image: PLACEHOLDER_IMAGES[2],
    backColor: "#0d1710",
    filter: "Social Content",
  },
];

function getFeaturedTitles(category: string): string[] {
  return projects
    .filter((p) => p.category === category)
    .slice(0, 3)
    .map((p) => p.title);
}

function getProjectCount(category: string): number {
  return projects.filter((p) => p.category === category).length;
}

export default function BodakCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const cards = sticky.querySelectorAll<HTMLElement>(".bodak-card");
      if (cards.length !== 3) return;

      /* ---- Final positions (centred in viewport) ---- */
      const positions = [
        { x: -300, y: 0 },
        { x: 0, y: -30 },
        { x: 300, y: 0 },
      ];

      /* ---- Timeline 1: Movement ---- */
      const tl1 = gsap.timeline({ paused: true });

      // Phase 1 (0–0.25): fly in from above
      cards.forEach((card, i) => {
        tl1.fromTo(
          card,
          { y: -400, x: positions[i].x, opacity: 0, scale: 0.85 },
          {
            y: positions[i].y,
            x: positions[i].x,
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: "power3.out",
          },
          i * 0.03
        );
      });

      // Phase 2 (0.25–0.55): rest — no movement needed

      // Phase 3 (0.55–0.75): sink out
      cards.forEach((card) => {
        tl1.to(
          card,
          {
            y: "+=80",
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.in",
          },
          0.55
        );
      });

      /* ---- Timeline 2: Flip (0.3–0.55 of scroll progress) ---- */
      const tl2 = gsap.timeline({ paused: true });

      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>(".bodak-inner");
        if (!inner) return;
        tl2.to(
          inner,
          {
            rotateY: 180,
            duration: 0.4,
            ease: "power3.out",
          },
          i * 0.1
        );
      });

      /* ---- ScrollTrigger drives both timelines ---- */
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: sticky,
          scrub: 1,
          start: "top top",
          end: "+=400%",
          onUpdate: (self) => {
            const p = self.progress;
            tl1.progress(p);
            // Map scroll 0.3–0.55 to timeline2 0–1
            const flipProgress = Math.max(0, Math.min(1, (p - 0.3) / 0.25));
            tl2.progress(flipProgress);
          },
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} style={{ height: "400vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            className="bodak-card"
            style={{
              position: "absolute",
              width: 280,
              height: 380,
              perspective: 1000,
              opacity: 0,
            }}
          >
            <div
              className="bodak-inner"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "none",
              }}
            >
              {/* ---- FRONT face ---- */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  overflow: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="280px"
                />
                {/* Bottom gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                  }}
                />
                {/* Front text */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 28,
                      color: "#f5f4f0",
                      margin: 0,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "#f5f4f0",
                      opacity: 0.6,
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {getProjectCount(cat.filter)} projects
                  </span>
                </div>
              </div>

              {/* ---- BACK face ---- */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  overflow: "hidden",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: cat.backColor,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    color: "#f5f4f0",
                    margin: 0,
                  }}
                >
                  {cat.title}
                </h3>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "24px 0",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {getFeaturedTitles(cat.filter).map((title) => (
                    <li
                      key={title}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "rgba(245,244,240,0.7)",
                        borderBottom: "1px solid rgba(245,244,240,0.08)",
                        paddingBottom: 12,
                      }}
                    >
                      {title}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/work?filter=${encodeURIComponent(cat.filter)}`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#c8ff00",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  View all <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
