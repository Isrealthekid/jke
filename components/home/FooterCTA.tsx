"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/shared/MagneticButton";


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
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg)",
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
            color: "var(--fg)",
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
              border: "1px solid rgb(var(--fg-rgb) / 0.3)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: btnHovered ? "var(--bg)" : "var(--fg)",
              backgroundColor: btnHovered ? "var(--fg)" : "transparent",
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
            color: "var(--fg)",
            opacity: 0,
          }}
        >
          <span style={{ opacity: 0.4 }}>or email </span>
          <a
            href="mailto:jkarenateegbuson@gmail.com"
            style={{
              color: "var(--fg)",
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
            jkarenateegbuson@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
