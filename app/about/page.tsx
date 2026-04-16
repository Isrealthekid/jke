import SplitBio from "@/components/about/SplitBio";
import StatsCards from "@/components/about/StatsCards";
import ClientLogos from "@/components/about/ClientLogos";

export const metadata = {
  title: "About — JKE Studio",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-black px-6 pt-32 pb-20 md:px-20">
      <SplitBio />
      <div className="mt-32">
        <StatsCards />
      </div>
      <div className="mt-32">
        <ClientLogos />
      </div>
    </main>
  );
}
