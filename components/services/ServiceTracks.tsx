"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface Track {
  num: string;
  title: string;
  description: string;
  deliverables: string[];
  process: string[];
  turnaround: string;
  filterSlug: string;
}

const tracks: Track[] = [
  {
    num: "01",
    title: "Social Media Management",
    description:
      "Strategy, creation, and community — end-to-end social presence that grows audiences.",
    deliverables: [
      "Content strategy",
      "Monthly content calendars",
      "Post creation (photo/video)",
      "Caption writing",
      "Analytics reporting",
      "Community management",
    ],
    process: ["Setup", "Create", "Deliver"],
    turnaround: "Monthly retainer",
    filterSlug: "Social Content",
  },
  {
    num: "02",
    title: "Video Production & Editing",
    description:
      "From commercial spots to event recaps — polished video that commands attention.",
    deliverables: [
      "Commercial videos",
      "Music videos",
      "Event highlight reels",
      "Corporate videos",
      "YouTube content",
      "Short-form (Reels/TikTok)",
    ],
    process: ["Setup", "Create", "Deliver"],
    turnaround: "5–14 days per project",
    filterSlug: "Video Edit",
  },
  {
    num: "03",
    title: "Filmmaking & Documentary",
    description:
      "Narrative-driven films and documentaries — concept to final cut.",
    deliverables: [
      "Short films",
      "Brand documentaries",
      "Portrait films",
      "Concept development",
      "Direction",
      "Post-production",
    ],
    process: ["Setup", "Create", "Deliver"],
    turnaround: "Project-based, discuss timeline",
    filterSlug: "Film",
  },
];

const expandVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 },
};

export default function ServiceTracks() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = containerRef.current?.querySelectorAll(".svc-track");
      if (!rows) return;

      gsap.fromTo(
        rows,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
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
      {tracks.map((track) => {
        const isOpen = expanded === track.num;

        return (
          <div
            key={track.num}
            className="svc-track"
            style={{
              borderTop: "1px solid rgba(245,244,240,0.08)",
              padding: "40px 0",
              opacity: 0,
            }}
          >
            {/* Header row */}
            <button
              onClick={() => setExpanded(isOpen ? null : track.num)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "100%",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "none",
                textAlign: "left",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* Decorative number */}
                <span
                  style={{
                    position: "absolute",
                    top: -20,
                    left: -8,
                    fontFamily: "var(--font-display)",
                    fontSize: 80,
                    color: "#f5f4f0",
                    opacity: 0.08,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {track.num}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 48,
                    color: "#f5f4f0",
                    margin: 0,
                    lineHeight: 1.1,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#008cff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#f5f4f0";
                  }}
                >
                  {track.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    color: "rgba(245,244,240,0.6)",
                    marginTop: 8,
                    maxWidth: 480,
                  }}
                >
                  {track.description}
                </p>
              </div>

              {/* Expand indicator */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  color: "rgba(245,244,240,0.3)",
                  flexShrink: 0,
                  lineHeight: 1,
                  transition: "transform 0.3s, color 0.3s",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>

            {/* Expandable content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      paddingTop: 32,
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 40,
                    }}
                    className="md:!grid-cols-3"
                  >
                    {/* Deliverables */}
                    <div>
                      <span style={labelStyle}>Deliverables</span>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: "12px 0 0",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {track.deliverables.map((d) => (
                          <li
                            key={d}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 14,
                              color: "rgba(245,244,240,0.6)",
                              paddingLeft: 12,
                              borderLeft: "2px solid rgba(200,255,0,0.3)",
                            }}
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process */}
                    <div>
                      <span style={labelStyle}>Process</span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          marginTop: 12,
                        }}
                      >
                        {track.process.map((step, i) => (
                          <div
                            key={step}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 16,
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 16px",
                                border: "1px solid rgba(245,244,240,0.1)",
                                borderRadius: 4,
                                fontFamily: "var(--font-body)",
                                fontSize: 13,
                                color: "rgba(245,244,240,0.6)",
                              }}
                            >
                              {step}
                            </div>
                            {i < track.process.length - 1 && (
                              <span
                                style={{
                                  color: "rgba(245,244,240,0.2)",
                                  fontSize: 12,
                                }}
                              >
                                →
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Turnaround */}
                      <div style={{ marginTop: 24 }}>
                        <span style={labelStyle}>Turnaround</span>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 14,
                            color: "#f5f4f0",
                            marginTop: 8,
                          }}
                        >
                          {track.turnaround}
                        </p>
                      </div>
                    </div>

                    {/* Related work link */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <Link
                        href={`/work?filter=${encodeURIComponent(track.filterSlug)}`}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#008cff",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          transition: "opacity 0.2s",
                        }}
                      >
                        See related work <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <style jsx global>{`
        @media (min-width: 768px) {
          .md\\:!grid-cols-3 {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 11,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(245,244,240,0.35)",
};
