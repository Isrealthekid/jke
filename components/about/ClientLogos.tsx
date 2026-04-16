"use client";

const brands = [
  "GTBank",
  "Flutterwave",
  "MTN",
  "Paystack",
  "Moniepoint",
  "TikTok",
  "Native Magazine",
  "Access Bank",
  "Alte Radio",
  "World Economic Forum",
];

export default function ClientLogos() {
  const doubled = [...brands, ...brands];

  return (
    <section>
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(245,244,240,0.3)",
          marginBottom: 40,
        }}
      >
        Brands I&rsquo;ve Worked With
      </p>

      <div style={{ overflow: "hidden" }}>
        <div className="brand-marquee-track">
          {doubled.map((brand, i) => (
            <span key={i} className="brand-marquee-item">
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-marquee-track {
          display: flex;
          width: max-content;
          animation: brand-scroll 25s linear infinite;
        }

        .brand-marquee-track:hover {
          animation-play-state: paused;
        }

        .brand-marquee-item {
          flex-shrink: 0;
          padding: 0 40px;
          font-family: var(--font-display);
          font-size: clamp(20px, 3vw, 36px);
          color: rgba(245, 244, 240, 0.15);
          white-space: nowrap;
          transition: color 0.3s;
        }

        .brand-marquee-item:hover {
          color: rgba(245, 244, 240, 0.5);
        }

        @keyframes brand-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
