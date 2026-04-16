"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/data/projects";

export default function ProjectHero({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Entrance
      gsap.from(section.querySelector(".hero-title"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });

      // Scroll line
      const line = section.querySelector(".scroll-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            transformOrigin: "top center",
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
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Poster / Video */}
      {showVideo && project.videoUrl ? (
        <iframe
          src={`${project.videoUrl}?autoplay=1`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)",
            }}
          />

          {/* Play button */}
          {project.videoUrl && (
            <button
              onClick={() => setShowVideo(true)}
              aria-label="Play video"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "2px solid rgba(245,244,240,0.6)",
                backgroundColor: "rgba(10,10,10,0.4)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "none",
                zIndex: 10,
                transition: "transform 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translate(-50%, -50%) scale(1.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "#008cff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translate(-50%, -50%) scale(1)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(245,244,240,0.6)";
              }}
            >
              {/* Play triangle */}
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M2 2L22 14L2 26V2Z" fill="#f5f4f0" />
              </svg>
            </button>
          )}
        </>
      )}

      {/* Title — bottom left */}
      <h1
        className="hero-title"
        style={{
          position: "absolute",
          bottom: 80,
          left: 64,
          right: 64,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 7vw, 90px)",
          color: "#f5f4f0",
          lineHeight: 1.05,
          margin: 0,
          zIndex: 5,
        }}
      >
        {project.title}
      </h1>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 5,
        }}
      >
        <div
          className="scroll-line"
          style={{
            width: 1,
            height: 32,
            backgroundColor: "rgba(245,244,240,0.3)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245,244,240,0.3)",
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
