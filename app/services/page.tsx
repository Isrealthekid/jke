import ServicesHeader from "@/components/services/ServicesHeader";
import ServiceTracks from "@/components/services/ServiceTracks";
import PricingCards from "@/components/services/PricingCards";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import FAQ from "@/components/services/FAQ";

export const metadata = {
  title: "Services — JK Egbuson",
};

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* PART 1 — Header */}
      <section style={{ padding: "140px 48px 0" }}>
        <ServicesHeader />
      </section>

      {/* PART 2 — Service tracks */}
      <section style={{ padding: "80px 48px 0" }}>
        <ServiceTracks />
      </section>

      {/* PART 3 — Pricing cards (Bodak mechanic) */}
      <PricingCards />

      {/* PART 4 — Process timeline */}
      <section style={{ padding: "80px 48px" }}>
        <ProcessTimeline />
      </section>

      {/* PART 5 — FAQ */}
      <section style={{ padding: "0 48px 120px" }}>
        <FAQ />
      </section>
    </main>
  );
}
