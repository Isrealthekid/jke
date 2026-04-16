"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PLACEHOLDER_IMAGES } from "@/data/projects";
import { useIsMobile } from "@/lib/useIsMobile";

/* ---- Role data — drives the 3 phases ---- */
const roles = [
  { label: "Social Media Management", image: PLACEHOLDER_IMAGES[0] },
  { label: "Video Production", image: PLACEHOLDER_IMAGES[1] },
  { label: "Filmmaking", image: PLACEHOLDER_IMAGES[2] },
];

export default function PinnedIntro() {
  const isMobile = useIsMobile();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const role0Ref = useRef<HTMLSpanElement>(null);
  const role1Ref = useRef<HTMLSpanElement>(null);
  const role2Ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const img0Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const pin = pinRef.current;
      if (!wrapper || !pin) return;

      // On mobile: simple fade-in for each role, no pin
      if (isMobile) {
        const mobileRoles = pin.querySelectorAll(".mobile-role");
        mobileRoles.forEach((role) => {
          gsap.fromTo(
            role,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: role, start: "top 85%" },
            }
          );
        });
        return;
      }

      const roleRefs = [role0Ref.current, role1Ref.current, role2Ref.current];
      const imgRefs = [img0Ref.current, img1Ref.current, img2Ref.current];

      /* ---- Main timeline ---- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: pin,
          scrub: 1,
          start: "top top",
          end: "+=200%",
          onUpdate: (self) => {
            // Progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.height = `${self.progress * 100}%`;
            }
          },
        },
      });

      /* ---- PHASE 1 (0 – 0.3): heading + first role ---- */

      // Split heading text into chars and animate
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        headingRef.current.textContent = "";
        const chars: HTMLSpanElement[] = [];
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          headingRef.current!.appendChild(span);
          chars.push(span);
        });

        tl.to(
          chars,
          { opacity: 1, stagger: 0.015, duration: 0.15, ease: "none" },
          0
        );
      }

      // First role fades in
      if (roleRefs[0]) {
        tl.fromTo(
          roleRefs[0],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          0.05
        );
      }

      // First image visible from start
      if (imgRefs[0]) {
        tl.set(imgRefs[0], { opacity: 1 }, 0);
      }

      /* ---- PHASE 2 (0.3 – 0.6): crossfade to role 2 + counter ---- */

      // Role 1 out
      if (roleRefs[0]) {
        tl.to(roleRefs[0], { opacity: 0, y: -20, duration: 0.08 }, 0.28);
      }
      // Role 2 in
      if (roleRefs[1]) {
        tl.fromTo(
          roleRefs[1],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          0.32
        );
      }

      // Image crossfade: 1 out, 2 in
      if (imgRefs[0]) tl.to(imgRefs[0], { opacity: 0, duration: 0.1 }, 0.3);
      if (imgRefs[1]) tl.to(imgRefs[1], { opacity: 1, duration: 0.1 }, 0.3);

      // Counter: 0 → 50
      if (counterRef.current) {
        const counter = { val: 0 };
        tl.fromTo(
          counterRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.05 },
          0.3
        );
        tl.to(
          counter,
          {
            val: 50,
            duration: 0.2,
            ease: "power2.out",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = `${Math.round(counter.val)}+`;
              }
            },
          },
          0.32
        );
      }

      /* ---- PHASE 3 (0.6 – 1.0): crossfade to role 3 + bottom text ---- */

      // Role 2 out
      if (roleRefs[1]) {
        tl.to(roleRefs[1], { opacity: 0, y: -20, duration: 0.08 }, 0.58);
      }
      // Role 3 in
      if (roleRefs[2]) {
        tl.fromTo(
          roleRefs[2],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          0.62
        );
      }

      // Image crossfade: 2 out, 3 in
      if (imgRefs[1]) tl.to(imgRefs[1], { opacity: 0, duration: 0.1 }, 0.6);
      if (imgRefs[2]) tl.to(imgRefs[2], { opacity: 1, duration: 0.1 }, 0.6);

      // Bottom text
      if (bottomRef.current) {
        tl.fromTo(
          bottomRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          0.75
        );
      }
    },
    { scope: wrapperRef, dependencies: [isMobile] }
  );

  // ---- MOBILE LAYOUT ----
  if (isMobile) {
    return (
      <div ref={wrapperRef}>
        <div ref={pinRef} style={{ backgroundColor: "#0a0a0a" }}>
          {roles.map((role, i) => (
            <div
              key={role.label}
              className="mobile-role"
              style={{
                padding: "64px 24px",
                borderBottom: "1px solid rgba(245,244,240,0.06)",
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(245,244,240,0.4)",
                }}
              >
                I create content that
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 40,
                  color: "#f5f4f0",
                  marginTop: 8,
                  lineHeight: 1.1,
                }}
              >
                {role.label}
              </h3>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  borderRadius: 4,
                  overflow: "hidden",
                  marginTop: 24,
                }}
              >
                <Image
                  src={role.image}
                  alt={role.label}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 48,
                color: "#008cff",
              }}
            >
              50+
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245,244,240,0.4)",
                marginTop: 4,
              }}
            >
              Projects Delivered
            </span>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(245,244,240,0.5)",
                marginTop: 24,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Based in Lagos &middot; Available Worldwide
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ height: "300vh" }}>
      <div
        ref={pinRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
          display: "flex",
        }}
      >
        {/* ---- Progress bar (far left edge) ---- */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            zIndex: 20,
            backgroundColor: "rgba(245,244,240,0.05)",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              width: "100%",
              height: "0%",
              backgroundColor: "#008cff",
              transition: "height 0.05s linear",
            }}
          />
        </div>

        {/* ---- Left column (40%) ---- */}
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px 0 40px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Heading */}
          <span
            ref={headingRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              letterSpacing: "0.15em",
              color: "rgba(245,244,240,0.5)",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            I create content that
          </span>

          {/* Role labels — absolutely positioned so they stack */}
          <div style={{ position: "relative", minHeight: 120 }}>
            {roles.map((role, i) => (
              <span
                key={role.label}
                ref={i === 0 ? role0Ref : i === 1 ? role1Ref : role2Ref}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6vw, 80px)",
                  lineHeight: 1.1,
                  color: "#f5f4f0",
                  opacity: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {role.label}
              </span>
            ))}
          </div>

          {/* Counter */}
          <div style={{ marginTop: 32 }}>
            <span
              ref={counterRef}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 5vw, 72px)",
                color: "#008cff",
                opacity: 0,
              }}
            >
              0+
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                letterSpacing: "0.15em",
                color: "rgba(245,244,240,0.4)",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Projects Delivered
            </span>
          </div>

          {/* Bottom text */}
          <div
            ref={bottomRef}
            style={{
              position: "absolute",
              bottom: 48,
              left: 40,
              opacity: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.15em",
                color: "rgba(245,244,240,0.5)",
                textTransform: "uppercase",
              }}
            >
              Based in Lagos &middot; Available Worldwide
            </span>
          </div>
        </div>

        {/* ---- Right column (60%) — crossfading images ---- */}
        <div
          style={{
            width: "60%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {roles.map((role, i) => (
            <div
              key={role.label}
              ref={i === 0 ? img0Ref : i === 1 ? img1Ref : img2Ref}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                transition: "opacity 0.1s ease",
              }}
            >
              <Image
                src={role.image}
                alt={role.label}
                fill
                style={{ objectFit: "cover" }}
                sizes="60vw"
                priority={i === 0}
              />
              {/* Gradient for text readability at edges */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 40%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
