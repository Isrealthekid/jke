import SplitBio from "@/components/about/SplitBio";
import StatsCards from "@/components/about/StatsCards";
import ServicesList from "@/components/about/ServicesList";
import ClientLogos from "@/components/about/ClientLogos";
import ToolsGrid from "@/components/about/ToolsGrid";

/** The About content, shown on the home page right after the opening screen. */
export default function AboutSection() {
  return (
    <div id="about" style={{ backgroundColor: "#0a0a0a" }}>
      <section
        style={{ padding: "clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px) 0" }}
      >
        <SplitBio />
        <div style={{ marginTop: "clamp(48px, 8vw, 80px)" }}>
          <StatsCards />
        </div>
      </section>
      <section
        style={{ padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 48px) 0" }}
      >
        <ServicesList />
      </section>
      <section style={{ padding: "clamp(64px, 10vw, 120px) 0" }}>
        <ClientLogos />
      </section>
      <section
        style={{
          padding: "0 clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)",
        }}
      >
        <ToolsGrid />
      </section>
    </div>
  );
}
