import ServiceTracks from "@/components/services/ServiceTracks";
import PricingCards from "@/components/services/PricingCards";

export const metadata = {
  title: "Services — JKE Studio",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-black px-6 pt-32 pb-20 md:px-20">
      <h1 className="mb-4 font-display text-6xl uppercase text-brand-white md:text-8xl">
        Services
      </h1>
      <p className="mb-16 max-w-xl font-body text-lg text-brand-white/60">
        End-to-end creative solutions for ambitious brands.
      </p>
      <ServiceTracks />
      <div className="mt-32">
        <h2 className="mb-12 font-display text-4xl uppercase text-brand-white">
          Pricing
        </h2>
        <PricingCards />
      </div>
    </main>
  );
}
