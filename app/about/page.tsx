import SplitBio from "@/components/about/SplitBio";
import StatsCards from "@/components/about/StatsCards";
import ServicesList from "@/components/about/ServicesList";
import ClientLogos from "@/components/about/ClientLogos";
import ToolsGrid from "@/components/about/ToolsGrid";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About — JK Egbuson",
};

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* PART 1 — Split Bio + Stats */}
      <section style={{ padding: "140px 48px 0" }}>
        <SplitBio />
        <div style={{ marginTop: 80 }}>
          <StatsCards />
        </div>
      </section>

      {/* PART 2 — Services mini-overview */}
      <section style={{ padding: "120px 48px 0" }}>
        <ServicesList />
      </section>

      {/* PART 3 — Clients marquee */}
      <section style={{ padding: "120px 0" }}>
        <ClientLogos />
      </section>

      {/* PART 4 — Tools */}
      <section style={{ padding: "0 48px 120px" }}>
        <ToolsGrid />
      </section>

      {/* CTA */}
      <AboutCTA />
    </main>
  );
}
