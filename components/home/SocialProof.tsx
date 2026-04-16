"use client";

/* ---- Row data ---- */
const row1Items = [
  { brand: "GTBank", metric: "2.1M impressions" },
  { brand: "Flutterwave", metric: "Campaign" },
  { brand: "TikTok", metric: "4.8M views" },
  { brand: "MTN", metric: "1.2M reach" },
  { brand: "Moniepoint", metric: "Brand Film" },
  { brand: "Paystack", metric: "3.5M impressions" },
];

const row2Items = [
  { platform: "Instagram", count: "280K" },
  { platform: "TikTok", count: "368K" },
  { platform: "YouTube", count: "133K" },
  { platform: "Twitter", count: "155K" },
];

export default function SocialProof() {
  return (
    <section
      style={{
        width: "100%",
        padding: "80px 0",
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

      {/* Row 1 — left direction, 30s */}
      <div className="marquee-row marquee-row-1" style={{ marginBottom: 20 }}>
        <div className="marquee-track-left">
          {[...row1Items, ...row1Items].map((item, i) => (
            <span key={i} className="marquee-item">
              <span style={{ fontWeight: 500, color: "#f5f4f0" }}>
                {item.brand}
              </span>
              <span style={{ margin: "0 12px", color: "rgba(245,244,240,0.3)" }}>
                &middot;
              </span>
              <span style={{ color: "#c8ff00" }}>{item.metric}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — right direction, 20s */}
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
              <span style={{ color: "#c8ff00" }}>{item.count}</span>
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
          animation: marquee-left 30s linear infinite;
        }
        .marquee-track-right {
          animation: marquee-right 20s linear infinite;
        }

        .marquee-item {
          flex-shrink: 0;
          padding: 0 40px;
          font-family: var(--font-body);
          font-size: 15px;
          letter-spacing: 0.04em;
          white-space: nowrap;
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
