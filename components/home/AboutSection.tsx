import SplitBio from "@/components/about/SplitBio";
import StatsCards from "@/components/about/StatsCards";

/** The About content, shown on the home page right after the opening screen. */
export default function AboutSection() {
  return (
    <div id="about" style={{ backgroundColor: "var(--bg)" }}>
      <section
        style={{ padding: "clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px) 0" }}
      >
        <SplitBio />
      </section>
      <section
        style={{
          padding:
            "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)",
        }}
      >
        <StatsCards />
      </section>
    </div>
  );
}
