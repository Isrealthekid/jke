import { SOCIALS } from "@/components/shared/socialLinks";

/** The slim bar at the bottom of every page: copyright, location and social icons. */
export default function SiteFooter() {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        padding: "24px clamp(84px, 7vw, 96px) 24px clamp(20px, 5vw, 48px)", // right side clears the floating theme button
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        backgroundColor: "#000000",
        position: "relative",
        zIndex: 1,
      }}
    >
      <span style={textStyle}>&copy; 2027 Joy Karenate-Egbuson</span>
      <span style={textStyle}>Lagos, Nigeria</span>
      <div style={{ display: "flex", gap: 18 }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="social-icon"
            style={{ display: "block", lineHeight: 0, color: "#f5f4f0", opacity: 0.6 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              {s.icon}
            </svg>
          </a>
        ))}
      </div>
    </footer>
  );
}

const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#f5f4f0",
  opacity: 0.35,
};
