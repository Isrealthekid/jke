"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PLACEHOLDER_IMAGES } from "@/data/projects";

export default function HeroReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);

  /* ---- Live timecode counter ---- */
  const [, setFrame] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let rafId: number;

    function tick() {
      frameCount++;
      const totalSeconds = Math.floor(frameCount / 24);
      const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const secs = String(totalSeconds % 60).padStart(2, "0");
      const frames = String(frameCount % 24).padStart(2, "0");

      if (timecodeRef.current) {
        timecodeRef.current.textContent = `${hrs}:${mins}:${secs}:${frames}`;
      }

      setFrame(frameCount);
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ---- GSAP: entrance + scroll fade ---- */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !nameRef.current || !taglineRef.current) return;

      // Entrance animation — 1s delay, stagger 0.2s
      const tl = gsap.timeline({ delay: 1 });
      tl.from(nameRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      tl.from(
        taglineRef.current,
        { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Scroll line loop
      if (scrollLineRef.current) {
        gsap.fromTo(
          scrollLineRef.current,
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

      // Fade hero text on scroll (> ~10% of viewport)
      gsap.to(".hero-content", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "40% top",
          scrub: 1,
        },
      });
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
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* ---- Background video ---- */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={PLACEHOLDER_IMAGES[0]}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        {/* Replace with actual video URL */}
        <source src="/videos/hero-reel.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.7) 100%)",
        }}
      />

      {/* ---- Camera HUD overlay ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        {/* Top-left: FPS + Resolution */}
        <div style={{ position: "absolute", top: 24, left: 32 }}>
          <span style={hudTextStyle}>FPS 24</span>
          <br />
          <span style={hudTextStyle}>4K UHD</span>
        </div>

        {/* Top-right: REC + Timecode */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 32,
            textAlign: "right",
          }}
        >
          <span
            style={{
              ...hudTextStyle,
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "inline-block",
                animation: "blink-rec 1s step-end infinite",
              }}
            />
            REC
          </span>
          <span ref={timecodeRef} style={{ ...hudTextStyle, marginTop: 4, display: "block" }}>
            00:00:00:00
          </span>
        </div>

        {/* Bottom-left: Name */}
        <div style={{ position: "absolute", bottom: 24, left: 32 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "#fff",
              opacity: 0.7,
              textTransform: "uppercase",
            }}
          >
            JK EGBUSON
          </span>
        </div>

        {/* Bottom-right: Standby */}
        <div style={{ position: "absolute", bottom: 24, right: 32 }}>
          <span
            style={{
              ...hudTextStyle,
              animation: "standby-pulse 2s ease-in-out infinite",
            }}
          >
            STANDBY MODE
          </span>
        </div>
      </div>

      {/* ---- Hero text (centered) ---- */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1
          ref={nameRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(60px, 10vw, 140px)",
            letterSpacing: "-0.02em",
            color: "#f5f4f0",
            lineHeight: 1,
            margin: 0,
          }}
        >
          JK EGBUSON
        </h1>
        <p
          ref={taglineRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            letterSpacing: "0.3em",
            color: "#f5f4f0",
            opacity: 0.6,
            marginTop: 20,
            textTransform: "uppercase",
          }}
        >
          Social Media &middot; Video &middot; Film
        </p>
      </div>

      {/* ---- Scroll indicator ---- */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        <div
          ref={scrollLineRef}
          style={{
            width: 1,
            height: 40,
            backgroundColor: "rgba(245,244,240,0.4)",
            transformOrigin: "top center",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245,244,240,0.4)",
          }}
        >
          scroll
        </span>
      </div>

      {/* ---- Keyframes ---- */}
      <style jsx global>{`
        @keyframes blink-rec {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes standby-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}

/* ---- Shared HUD text style ---- */
const hudTextStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 11,
  letterSpacing: "0.15em",
  color: "#fff",
  opacity: 0.5,
  textTransform: "uppercase",
};
