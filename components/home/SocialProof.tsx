"use client";

/* ---- Row data ---- */
const row1Items = [
  "koppoh",
  "Leading Ladies Africa",
  "Alpha African Advisory",
  "Realised Gains",
  "Princess and Pearls Swift Company",
  "Quiz Me",
  "Redeemer's University Theatre Art Department",
  "Women Aligned for Growth",
  "Healthy Living Services",
  "Mimi Paul Collective",
];

const row2Items = [
  { platform: "Instagram", handle: "@joie.egbuson" },
  { platform: "YouTube", handle: "@JoieTVProductions" },
  { platform: "LinkedIn", handle: "Joykarenate Egbuson" },
];

export default function SocialProof() {
  return (
    <section
      style={{
        width: "100%",
        padding: "clamp(48px, 8vw, 80px) 0",
        backgroundColor: "#0a0a0a",
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Section label */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#f5f4f0",
          opacity: 0.3,
          marginBottom: 48,
        }}
      >
        Brands &amp; Platforms
      </p>

      {/* Row 1 — brands I've worked with (left, 40s) */}
      <div className="marquee-row marquee-row-1" style={{ marginBottom: 20 }}>
        <div className="marquee-track-left">
          {[...row1Items, ...row1Items].map((brand, i) => (
            <span key={i} className="marquee-item">
              <span style={{ fontWeight: 500, color: "#f5f4f0" }}>{brand}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — platforms (right, 25s) */}
      <div className="marquee-row marquee-row-2">
        <div className="marquee-track-right">
          {[...row2Items, ...row2Items].map((item, i) => (
            <span key={i} className="marquee-item">
              <span style={{ fontWeight: 500, color: "#f5f4f0" }}>
                {item.platform}
              </span>
              <span style={{ margin: "0 12px", color: "rgba(245,244,240,0.3)" }}>
                &middot;
              </span>
              <span style={{ color: "#008cff" }}>{item.handle}</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-row {
          width: 100%;
          overflow: hidden;
        }
        .marquee-row:hover .marquee-track-left,
        .marquee-row:hover .marquee-track-right {
          animation-play-state: paused;
        }

        .marquee-track-left,
        .marquee-track-right {
          display: flex;
          width: max-content;
          gap: 0;
        }

        .marquee-track-left {
          animation: marquee-left 40s linear infinite;
        }
        .marquee-track-right {
          animation: marquee-right 25s linear infinite;
        }

        .marquee-item {
          flex-shrink: 0;
          padding: 0 24px;
          font-family: var(--font-body);
          font-size: 14px;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .marquee-item {
            padding: 0 40px;
            font-size: 15px;
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
