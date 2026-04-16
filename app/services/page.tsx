import type { Metadata } from "next";
import ServicesHeader from "@/components/services/ServicesHeader";
import ServiceTracks from "@/components/services/ServiceTracks";
import PricingCards from "@/components/services/PricingCards";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import FAQ from "@/components/services/FAQ";

export const metadata: Metadata = {
  title: "JK Egbuson — Services",
  description:
    "Social media management, video production, and filmmaking services. End-to-end creative work for brands across Nigeria and beyond.",
  openGraph: {
    title: "JK Egbuson — Services",
    description:
      "Social media management, video production, and filmmaking services for ambitious brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson — Services",
  },
};

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <section style={{ padding: "clamp(100px, 12vw, 140px) clamp(20px, 5vw, 48px) 0" }}>
        <ServicesHeader />
      </section>
      <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px) 0" }}>
        <ServiceTracks />
      </section>
      <PricingCards />
      <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)" }}>
        <ProcessTimeline />
      </section>
      <section style={{ padding: "0 clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)" }}>
        <FAQ />
      </section>
    </main>
  );
}
