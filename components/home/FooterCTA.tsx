"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/shared/MagneticButton";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function FooterCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [btnHovered, setBtnHovered] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = section.querySelectorAll(".footer-reveal");
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* SVG noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: 256,
        }}
      />

      {/* Main content — centred */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <h2
          className="footer-reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 7vw, 100px)",
            color: "#f5f4f0",
            textAlign: "center",
            lineHeight: 1.05,
            margin: 0,
            opacity: 0,
          }}
        >
          Let&rsquo;s make something
        </h2>

        {/* Magnetic CTA button */}
        <div
          className="footer-reveal"
          style={{ marginTop: 48, opacity: 0 }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
        >
          <MagneticButton
            href="/contact"
            strength={0.35}
            style={{
              width: 220,
              height: 64,
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.3)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: btnHovered ? "#0a0a0a" : "#f5f4f0",
              backgroundColor: btnHovered ? "#f5f4f0" : "transparent",
              transition: "background-color 0.3s, color 0.3s",
              cursor: "none",
            }}
          >
            Start a project &rarr;
          </MagneticButton>
        </div>

        {/* Email line */}
        <p
          className="footer-reveal"
          style={{
            marginTop: 28,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#f5f4f0",
            opacity: 0,
          }}
        >
          <span style={{ opacity: 0.4 }}>or email </span>
          <a
            href="mailto:hello@jkegbuson.com"
            style={{
              color: "#f5f4f0",
              opacity: 0.4,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.4";
            }}
          >
            hello@jkegbuson.com
          </a>
        </p>
      </div>

      {/* Footer bar */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          padding: "24px clamp(20px, 5vw, 48px)",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left */}
        <span style={footerTextStyle}>&copy; 2025 JK Egbuson</span>

        {/* Centre */}
        <span style={footerTextStyle}>Lagos, Nigeria</span>

        {/* Right — socials */}
        <div style={{ display: "flex", gap: 20 }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...footerTextStyle,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.35";
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}

const footerTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#f5f4f0",
  opacity: 0.35,
};
