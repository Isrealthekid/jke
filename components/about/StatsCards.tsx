"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const stats = [
  { value: "5+", label: "Years" },
  { value: "50+", label: "Projects" },
  { value: "3", label: "Disciplines" },
];

export default function StatsCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".stat-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
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
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="stat-card"
          style={{
            border: "1px solid rgba(245,244,240,0.1)",
            padding: "40px 24px",
            textAlign: "center",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#008cff",
              lineHeight: 1,
            }}
          >
            {stat.value}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.4)",
              marginTop: 12,
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
