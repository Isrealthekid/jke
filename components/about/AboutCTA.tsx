"use client";

import { useState } from "react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function AboutCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      style={{
        padding: "clamp(64px, 10vw, 100px) clamp(20px, 5vw, 48px)",
        borderTop: "1px solid rgba(245,244,240,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 32,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 5vw, 64px)",
          color: "#f5f4f0",
          margin: 0,
        }}
      >
        Ready to tell your story?
      </h2>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MagneticButton
          href="/contact"
          strength={0.35}
          style={{
            width: 200,
            height: 56,
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.3)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: hovered ? "#0a0a0a" : "#f5f4f0",
            backgroundColor: hovered ? "#f5f4f0" : "transparent",
            transition: "background-color 0.3s, color 0.3s",
            cursor: "none",
          }}
        >
          Get in touch
        </MagneticButton>
      </div>
    </section>
  );
}
