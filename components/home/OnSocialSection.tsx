const YELLOW = "#FFD34A";

/** Heading for the scrolling social-content showcase (Selected Works) that follows it. */
export default function OnSocialSection() {
  return (
    <section
      style={{
        backgroundColor: "#000000",
        padding: "clamp(24px, 4vw, 56px) clamp(20px, 5vw, 48px) 0",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(245,244,240,0.45)",
        }}
      >
        Content &amp; campaigns
      </p>
      <h2
        style={{
          margin: "12px 0 0",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(56px, 11vw, 160px)",
          lineHeight: 0.9,
          letterSpacing: "-0.01em",
          color: "#f5f4f0",
        }}
      >
        On <span style={{ color: YELLOW }}>social</span>
      </h2>
    </section>
  );
}
