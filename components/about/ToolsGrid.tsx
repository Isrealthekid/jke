"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const tools = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "CapCut",
  "Canva Pro",
  "Instagram",
  "TikTok Pro",
  "Meta Business Suite",
  "Notion",
];

export default function ToolsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pills = containerRef.current?.querySelectorAll(".tool-pill");
      if (!pills) return;

      gsap.fromTo(
        pills,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
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
          marginBottom: 24,
        }}
      >
        Tools I Use
      </span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {tools.map((tool) => (
          <span
            key={tool}
            className="tool-pill"
            style={{
              padding: "8px 18px",
              borderRadius: 100,
              border: "1px solid rgba(245,244,240,0.1)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(245,244,240,0.5)",
              opacity: 0,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(200,255,0,0.4)";
              el.style.color = "#008cff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(245,244,240,0.1)";
              el.style.color = "rgba(245,244,240,0.5)";
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
