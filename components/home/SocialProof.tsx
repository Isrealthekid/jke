"use client";

/* ---- Row data ---- */
const row1Items = [
  "Leading Ladies Africa",
  "Koppoh",
  "Princess & Pearl Swift Company Ltd.",
  "Mimi Paul Creative Agency",
  "RealisedGains",
  "QUIZME+",
  "Women Aligned For Growth",
  "Healthy Living Services Ltd.",
  "Listening Birds Productions",
  "Bala House",
  "NEVEAH NG Agency",
  "Tosin Victoria",
];

export default function SocialProof() {
  return (
    <section
      style={{
        width: "100%",
        padding: "clamp(48px, 8vw, 80px) 0",
        backgroundColor: "#000000",
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
        Brands I&rsquo;ve worked with
      </p>

      {/* Row 1 — brands I've worked with (left, 40s) */}
      <div className="marquee-row marquee-row-1">
        <div className="marquee-track-left">
          {[...row1Items, ...row1Items].map((brand, i) => (
            <span key={i} className="marquee-item">
              <span style={{ fontWeight: 500, color: "#f5f4f0" }}>{brand}</span>
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
