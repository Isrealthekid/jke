"use client";

import { useIsMobile } from "@/lib/useIsMobile";

/* ---- Role data — preserved from previous design ---- */
const roles = [
  { label: "Social Media Management", videoId: "2B3ZORKuDJ0" }, // Women Leaders Unscripted — Trailer
  { label: "Video Production", videoId: "-OKPBPCKP1w" },         // The Beginning — Debola Deji-Kurunmi
  { label: "Filmmaking", videoId: "dDHvTvbNeW4" },               // I Love You — Short Film
];

const ytEmbedSrc = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;

const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

function StickyCard({
  role,
  index,
  isLast,
}: {
  role: { label: string; videoId: string };
  index: number;
  isLast: boolean;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Background video (filtered) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "grayscale(20%) brightness(0.7)",
        }}
      >
        <iframe
          src={ytEmbedSrc(role.videoId)}
          title={role.label}
          style={{
            position: "absolute",
            inset: "-5%",
            width: "110%",
            height: "110%",
            border: "none",
            pointerEvents: "none",
          }}
          allow="autoplay; encrypted-media; picture-in-picture"
          loading={index === 0 ? undefined : "lazy"}
        />
      </div>

      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_SVG,
          backgroundSize: "180px 180px",
          opacity: 0.08,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Left dark gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 45%, transparent 85%)",
          pointerEvents: "none",
        }}
      />

      {/* Top-left: tag row */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          zIndex: 2,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            backgroundColor: "#008cff",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            opacity: 0.92,
          }}
        >
          [IWHAT DO I DO]
        </span>
      </div>

      {/* Top-right: card index */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          zIndex: 2,
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(roles.length).padStart(2, "0")}
      </div>

      {/* Bottom-left: title + stats */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 40,
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(56px, 9vw, 160px)",
            color: "#ffffff",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {role.label}
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            marginTop: 28,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 4vw, 64px)",
                color: "#008cff",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              50+
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "#ffffff",
                opacity: 0.8,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginTop: 6,
              }}
            >
              Projects Delivered
            </div>
          </div>

          {isLast && (
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              Based in Lagos &middot; Available Worldwide
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PinnedIntro() {
  const isMobile = useIsMobile();

  // ---- MOBILE: stacked vertical cards (no sticky) ----
  if (isMobile) {
    return (
      <div style={{ backgroundColor: "#0a0a0a" }}>
        {roles.map((role) => (
          <div
            key={role.label}
            style={{
              padding: "64px 24px",
              borderBottom: "1px solid rgba(245,244,240,0.06)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  backgroundColor: "#008cff",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  opacity: 0.85,
                }}
              >
                [IWHAT DO I DO]
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 44,
                color: "#ffffff",
                margin: 0,
                lineHeight: 1,
                textTransform: "uppercase",
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
                backgroundColor: "#000",
                filter: "grayscale(20%) brightness(0.7)",
              }}
            >
              <iframe
                src={ytEmbedSrc(role.videoId)}
                title={role.label}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ))}
        <div style={{ padding: "48px 24px", textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 56,
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
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.5)",
              marginTop: 6,
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
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Based in Lagos &middot; Available Worldwide
          </p>
        </div>
      </div>
    );
  }

  // ---- DESKTOP: sticky-stack ----
  return (
    <section style={{ position: "relative", backgroundColor: "#0a0a0a" }}>
      {roles.map((role, i) => (
        <StickyCard
          key={role.label}
          role={role}
          index={i}
          isLast={i === roles.length - 1}
        />
      ))}
    </section>
  );
}
