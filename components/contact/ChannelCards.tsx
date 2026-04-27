"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/lib/useIsMobile";

interface Channel {
  label: string;
  frontIcon: string;
  backValue: string;
  backNote: string;
  action: () => void;
}

export default function ChannelCards() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);

  const showToast = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }, []);

  const channels: Channel[] = [
    {
      label: "Email",
      frontIcon: "✉",
      backValue: "jkarenateegbuson@gmail.com",
      backNote: "Best for project enquiries",
      action: () => {
        navigator.clipboard.writeText("jkarenateegbuson@gmail.com");
        showToast();
      },
    },
    {
      label: "Instagram",
      frontIcon: "◎",
      backValue: "@joie.egbuson",
      backNote: "Best for quick chats & collabs",
      action: () => {
        window.open("https://www.instagram.com/joie.egbuson/", "_blank");
      },
    },
    {
      label: "YouTube",
      frontIcon: "▶",
      backValue: "@JoieTVProductions",
      backNote: "Watch the latest films & edits",
      action: () => {
        window.open("https://www.youtube.com/@JoieTVProductions", "_blank");
      },
    },
  ];

  // Fly-in animation on mount
  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".channel-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { y: -200, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
        {channels.map((ch) => {
          const isFlipped = flipped === ch.label;
          return (
          <div
            key={ch.label}
            className="channel-card"
            onClick={() => {
              if (isMobile) {
                if (isFlipped) {
                  ch.action();
                  setFlipped(null);
                } else {
                  setFlipped(ch.label);
                }
              } else {
                ch.action();
              }
            }}
            style={{
              width: "100%",
              minHeight: 180,
              perspective: 1000,
              cursor: "none",
              opacity: 0,
            }}
          >
            <div
              className="channel-inner"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                transform: isMobile && isFlipped ? "rotateY(180deg)" : undefined,
              }}
              onMouseEnter={isMobile ? undefined : (e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "rotateY(180deg)";
              }}
              onMouseLeave={isMobile ? undefined : (e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "rotateY(0deg)";
              }}
            >
              {/* FRONT */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 12,
                  border: "1px solid rgba(245,244,240,0.08)",
                  backgroundColor: "#111",
                  backfaceVisibility: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 36 }}>{ch.frontIcon}</span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    color: "#f5f4f0",
                  }}
                >
                  {ch.label}
                </span>
              </div>

              {/* BACK */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 12,
                  border: "1px solid rgba(200,255,0,0.2)",
                  backgroundColor: "#111",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#008cff",
                    wordBreak: "break-all",
                  }}
                >
                  {ch.backValue}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "rgba(245,244,240,0.4)",
                  }}
                >
                  {ch.backNote}
                </span>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 24px",
            borderRadius: 100,
            backgroundColor: "#008cff",
            color: "#0a0a0a",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            zIndex: 9999,
            animation: "toast-in 0.3s ease-out",
          }}
        >
          Copied!
        </div>
      )}

      <style jsx>{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
