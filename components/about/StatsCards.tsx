"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const stats = [
  { value: "7+", label: "Years" },
  { value: "100+", label: "Projects" },
  { value: "14", label: "Clients & Brands" },
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

      // Count the figures up from 0 as the cards appear (the final value is also in the HTML,
      // so it still reads correctly with reduced motion or without scripting).
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      containerRef.current
        ?.querySelectorAll<HTMLElement>(".stat-value")
        .forEach((el, i) => {
          const target = parseInt(el.dataset.target || "0", 10);
          const suffix = el.dataset.suffix || "";
          const counter = { n: 0 };
          el.textContent = `0${suffix}`;
          gsap.to(counter, {
            n: target,
            duration: 2,
            delay: i * 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.n)}${suffix}`;
            },
          });
        });
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
            padding: "clamp(20px, 4vw, 40px) clamp(10px, 2vw, 24px)",
            textAlign: "center",
            opacity: 0,
          }}
        >
          <span
            className="stat-value"
            data-target={parseInt(stat.value, 10)}
            data-suffix={stat.value.replace(/[0-9]/g, "")}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#FF7A00",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
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
