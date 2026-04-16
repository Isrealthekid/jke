"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const services = [
  {
    icon: "🎬",
    name: "Filmmaking",
    description: "Short films, documentaries, and branded content from concept to final cut.",
  },
  {
    icon: "✂️",
    name: "Video Editing",
    description: "Recap films, brand videos, and motion graphics that command attention.",
  },
  {
    icon: "📱",
    name: "Social Media",
    description: "Content strategy, creation, and management across Instagram, TikTok, and YouTube.",
  },
];

export default function ServicesList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = containerRef.current?.querySelectorAll(".service-row");
      if (!rows) return;

      gsap.fromTo(
        rows,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
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
        What I Do
      </span>

      {services.map((s) => (
        <div
          key={s.name}
          className="service-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "24px 0",
            borderBottom: "1px solid rgba(245,244,240,0.06)",
            opacity: 0,
          }}
        >
          <span style={{ fontSize: 24, flexShrink: 0, width: 40, textAlign: "center" }}>
            {s.icon}
          </span>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                color: "#f5f4f0",
                margin: 0,
              }}
            >
              {s.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(245,244,240,0.5)",
                margin: "4px 0 0",
              }}
            >
              {s.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
