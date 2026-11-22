import { SOCIALS } from "@/components/shared/socialLinks";

/** Frosted bar of social links, along the bottom of the first screen. */
export default function SocialBar() {
  return (
    <div
      className="hero-social-bar"
      style={{
        position: "absolute",
        left: "50%",
        bottom: "clamp(16px, 3vh, 32px)",
        transform: "translateX(-50%)",
        zIndex: 3,
        width: "min(560px, calc(100% - 32px))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "12px 18px",
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        color: "#f5f4f0",
      }}
    >
      <span style={{ display: "flex", gap: 10, alignItems: "baseline", minWidth: 0 }}>
        <strong style={{ fontWeight: 600, whiteSpace: "nowrap" }}>The Joie TV</strong>
        <span style={{ opacity: 0.6, whiteSpace: "nowrap" }}>Filmmaker &amp; Editor</span>
      </span>
      <span style={{ display: "flex", gap: 16 }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="social-icon"
            style={{ display: "block", lineHeight: 0, color: "#f5f4f0" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              {s.icon}
            </svg>
          </a>
        ))}
      </span>
    </div>
  );
}
