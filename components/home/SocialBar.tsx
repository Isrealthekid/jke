import type { ReactNode } from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@JoieTVProductions",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" {...stroke} />
        <path d="M10 9.2v5.6l4.8-2.8L10 9.200Z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/joie.egbuson/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
        <circle cx="12" cy="12" r="4.2" {...stroke} />
        <circle cx="17.200" cy="6.800" r="1.100" fill="currentColor" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joykarenate-egbuson/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" {...stroke} />
        <path d="M8 10.500V16M8 7.600v.1M12 16v-5.500M12 12.500c0-1.300 1-2 2.100-2S16 11.200 16 12.600V16" {...stroke} />
      </>
    ),
  },
];

/** Frosted bar of social links, along the bottom of the first screen. */
export default function SocialBar() {
  return (
    <div
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
