"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const steps = [
  { num: "01", label: "Enquiry" },
  { num: "02", label: "Brief" },
  { num: "03", label: "Proposal" },
  { num: "04", label: "Production" },
  { num: "05", label: "Delivery" },
  { num: "06", label: "Review" },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = containerRef.current?.querySelectorAll(".process-step");
      if (!items) return;

      gsap.fromTo(
        items,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
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
        How It Works
      </span>

      <div
        style={{
          display: "flex",
          gap: 0,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="process-step"
            style={{
              display: "flex",
              alignItems: "center",
              opacity: 0,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "20px 28px",
                border: "1px solid rgba(245,244,240,0.08)",
                borderRadius: 4,
                textAlign: "center",
                minWidth: 120,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(200,255,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(245,244,240,0.08)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  color: "#008cff",
                  display: "block",
                }}
              >
                {step.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(245,244,240,0.6)",
                  marginTop: 4,
                  display: "block",
                }}
              >
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <span
                style={{
                  padding: "0 12px",
                  color: "rgba(245,244,240,0.15)",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
