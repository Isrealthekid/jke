"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/lib/useIsMobile";
import { SOCIALS } from "@/components/shared/socialLinks";

const EMAIL = "jkarenateegbuson@gmail.com";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const social = (label: string) => SOCIALS.find((s) => s.label === label)!;

interface Channel {
  label: string;
  icon: ReactNode;
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
      icon: (
        <>
          <rect x="2.5" y="5" width="19" height="14" rx="3.5" {...stroke} />
          <path d="m3.5 7.5 8.5 6 8.5-6" {...stroke} />
        </>
      ),
      backValue: EMAIL,
      backNote: "Tap to copy · best for project enquiries",
      action: () => {
        navigator.clipboard?.writeText(EMAIL);
        showToast();
      },
    },
    {
      label: "Instagram",
      icon: social("Instagram").icon,
      backValue: "@joie.egbuson",
      backNote: "Best for quick chats & collabs",
      action: () => window.open(social("Instagram").href, "_blank", "noopener"),
    },
    {
      label: "YouTube",
      icon: social("YouTube").icon,
      backValue: "@thejoietv",
      backNote: "Watch the latest films & edits",
      action: () => window.open(social("YouTube").href, "_blank", "noopener"),
    },
    {
      label: "LinkedIn",
      icon: social("LinkedIn").icon,
      backValue: "Joykarenate Egbuson",
      backNote: "Best for business & partnerships",
      action: () => window.open(social("LinkedIn").href, "_blank", "noopener"),
    },
  ];

  // Fly-in on mount. Only the outer wrapper moves, so the flip below never fights it.
  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".channel-card");
      if (!cards) return;
      gsap.fromTo(
        cards,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out", delay: 0.3, clearProps: "transform" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div className="channel-grid">
        {channels.map((ch) => {
          const isFlipped = flipped === ch.label;
          return (
            <div
              key={ch.label}
              className={`channel-card${isFlipped ? " is-flipped" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={ch.label}
              onClick={() => {
                if (isMobile) {
                  if (isFlipped) {
                    ch.action();
                    setFlipped(null);
                  } else setFlipped(ch.label);
                } else ch.action();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  ch.action();
                }
              }}
              style={{ opacity: 0 }}
            >
              <div className="channel-inner">
                <div className="channel-face channel-front">
                  <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "var(--fg)" }}>
                    {ch.icon}
                  </svg>
                  <span className="channel-label">{ch.label}</span>
                </div>
                <div className="channel-face channel-back">
                  <span className="channel-value">{ch.backValue}</span>
                  <span className="channel-note">{ch.backNote}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {toast && <div className="channel-toast">Copied!</div>}
    </div>
  );
}
