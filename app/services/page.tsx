import type { Metadata } from "next";
import ServicesHeader from "@/components/services/ServicesHeader";
import ServiceCards from "@/components/services/ServiceCards";
import FAQ from "@/components/services/FAQ";

export const metadata: Metadata = {
  title: "JK Egbuson — Services",
  description:
    "Creative direction, video production, editing, and filmmaking services. End-to-end creative work for brands across Nigeria and beyond.",
  openGraph: {
    title: "JK Egbuson — Services",
    description:
      "Creative direction, video production, editing, and filmmaking services for ambitious brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson — Services",
  },
};

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
      <section style={{ padding: "clamp(100px, 12vw, 140px) clamp(20px, 5vw, 48px) 0" }}>
        <ServicesHeader />
      </section>
      <section style={{ padding: "clamp(40px, 6vw, 72px) clamp(20px, 5vw, 48px) clamp(64px, 9vw, 110px)" }}>
        <ServiceCards />
      </section>
      <section style={{ padding: "0 clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)" }}>
        <FAQ />
      </section>
    </main>
  );
}
