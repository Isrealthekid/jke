"use client";

import ChannelCards from "./ChannelCards";
import ContactForm from "./ContactForm";

const socials = [
  { platform: "Instagram", handle: "@jkegbuson_", href: "https://instagram.com/jkegbuson_" },
  { platform: "TikTok", handle: "@jkegbuson", href: "https://tiktok.com/@jkegbuson" },
  { platform: "LinkedIn", handle: "JK Egbuson", href: "https://linkedin.com" },
  { platform: "Twitter", handle: "@jkegbuson", href: "https://twitter.com/jkegbuson" },
  { platform: "YouTube", handle: "JK Egbuson", href: "https://youtube.com" },
];

export default function ContactHero() {
  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ padding: "clamp(100px, 12vw, 140px) clamp(20px, 5vw, 48px) 80px" }}>
      {/* Desktop: 2-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 64,
        }}
        className="md:!grid-cols-2"
      >
        {/* ---- LEFT COLUMN ---- */}
        <div>
          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(80px, 12vw, 160px)",
              color: "#f5f4f0",
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            Let&rsquo;s talk.
          </h1>

          {/* Availability */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 28,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "block",
                animation: "pulse-avail 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(245,244,240,0.6)",
              }}
            >
              Currently open for new projects starting {currentMonth}
            </span>
          </div>

          {/* Response time */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(245,244,240,0.35)",
              marginTop: 8,
            }}
          >
            Typically responds within 24 hours
          </p>

          {/* Channel cards */}
          <div style={{ marginTop: 48 }}>
            <ChannelCards />
          </div>
        </div>

        {/* ---- RIGHT COLUMN: Form ---- */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.35)",
              display: "block",
              marginBottom: 24,
            }}
          >
            Send an enquiry
          </span>
          <ContactForm />
        </div>
      </div>

      {/* ---- PART 4: Social links row ---- */}
      <div
        style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: "1px solid rgba(245,244,240,0.06)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 0,
        }}
      >
        {socials.map((s, i) => (
          <div key={s.platform} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: "rgba(245,244,240,0.08)",
                  margin: "0 24px",
                }}
              />
            )}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(245,244,240,0.4)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#f5f4f0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(245,244,240,0.4)";
              }}
            >
              <span style={{ fontWeight: 500 }}>{s.platform}</span>
              <span style={{ opacity: 0.5 }}>{s.handle}</span>
              <span style={{ fontSize: 11 }}>↗</span>
            </a>
          </div>
        ))}
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes pulse-avail {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.7);
          }
        }
        @media (min-width: 768px) {
          .md\\:!grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
