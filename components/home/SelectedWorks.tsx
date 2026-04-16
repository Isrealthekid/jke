"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { useIsMobile } from "@/lib/useIsMobile";

/* ================================================================== */
/*  Individual card with 3D tilt                                       */
/* ================================================================== */
function WorkCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  // GSAP quickTo for smooth 3D tilt interpolation
  const rotateXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotateYTo = useRef<gsap.QuickToFunc | null>(null);

  const initQuickTo = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    cardRef.current = el;
    rotateXTo.current = gsap.quickTo(el, "rotateX", {
      duration: 0.4,
      ease: "power2.out",
    });
    rotateYTo.current = gsap.quickTo(el, "rotateY", {
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      if (!card || !rotateXTo.current || !rotateYTo.current) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      rotateYTo.current(x * 16); // ±8deg
      rotateXTo.current(-y * 16); // ±8deg (inverted for natural feel)
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1.05, duration: 0.6, ease: "power2.out" });
    }
    if (btnRef.current) {
      gsap.to(btnRef.current, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rotateXTo.current) rotateXTo.current(0);
    if (rotateYTo.current) rotateYTo.current(0);
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
    }
    if (btnRef.current) {
      gsap.to(btnRef.current, { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }, []);

  return (
    <div
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        flexShrink: 0,
      }}
    >
      <div
        ref={initQuickTo}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: 420,
          height: "70vh",
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <Link
          href={`/work/${project.slug}`}
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          {/* Thumbnail */}
          <div
            ref={imgRef}
            style={{
              position: "absolute",
              inset: 0,
              transition: "transform 0.6s ease",
            }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="420px"
            />
          </div>

          {/* Bottom gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)",
              pointerEvents: "none",
            }}
          />

          {/* Bottom content */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 28,
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f5f4f0",
                opacity: 0.6,
              }}
            >
              {project.category}
            </span>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                color: "#f5f4f0",
                marginTop: 6,
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h3>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "#f5f4f0",
                opacity: 0.5,
                marginTop: 8,
                display: "block",
              }}
            >
              {project.year} &middot; {project.role}
            </span>

            {/* View project button — slides up on hover */}
            <div
              ref={btnRef}
              style={{
                marginTop: 16,
                opacity: 0,
                transform: "translateY(20px)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#c8ff00",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              View project
              <span style={{ fontSize: 14 }}>&rarr;</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SelectedWorks — horizontal scroll section                          */
/* ================================================================== */
export default function SelectedWorks() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section || isMobile) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  // ---- MOBILE: vertical stacked cards ----
  if (isMobile) {
    return (
      <section style={{ backgroundColor: "#0a0a0a", padding: "64px 20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,244,240,0.5)" }}>
            Selected Work
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(245,244,240,0.3)" }}>
            ({String(projects.length).padStart(2, "0")})
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {projects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
              <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: 4, overflow: "hidden" }}>
                <Image src={project.thumbnail} alt={project.title} fill style={{ objectFit: "cover" }} sizes="100vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f5f4f0", opacity: 0.6 }}>{project.category}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#f5f4f0", margin: "4px 0 0" }}>{project.title}</h3>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(245,244,240,0.5)" }}>{project.year} &middot; {project.role}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // ---- DESKTOP: horizontal scroll ----
  return (
    <section
      ref={sectionRef}
      className="works-section"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "32px 48px 0",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,244,240,0.5)" }}>
              Selected Work
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(245,244,240,0.3)" }}>
              ({String(projects.length).padStart(2, "0")})
            </span>
          </div>
        </div>

        {/* Horizontal progress bar */}
        <div style={{ width: "100%", height: 1, backgroundColor: "rgba(245,244,240,0.08)" }}>
          <div
            ref={progressRef}
            style={{ width: "100%", height: "100%", backgroundColor: "#c8ff00", transformOrigin: "left center", transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="works-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          height: "100%",
          paddingLeft: 48,
          paddingRight: 48,
          paddingTop: 80,
          width: "max-content",
        }}
      >
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
