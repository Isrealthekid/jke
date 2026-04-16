import type { Metadata } from "next";
import { PLACEHOLDER_IMAGES } from "@/data/projects";
import SplitBio from "@/components/about/SplitBio";
import StatsCards from "@/components/about/StatsCards";
import ServicesList from "@/components/about/ServicesList";
import ClientLogos from "@/components/about/ClientLogos";
import ToolsGrid from "@/components/about/ToolsGrid";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "JK Egbuson — About",
  description:
    "Lagos-based creative with 5+ years of experience in social media management, video production, and filmmaking for brands like GTBank, Flutterwave, and TikTok.",
  openGraph: {
    title: "JK Egbuson — About",
    description:
      "Lagos-based creative with 5+ years of experience in social media management, video production, and filmmaking.",
    images: [{ url: PLACEHOLDER_IMAGES[0], width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson — About",
    images: [PLACEHOLDER_IMAGES[0]],
  },
};

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <section style={{ padding: "clamp(100px, 12vw, 140px) clamp(20px, 5vw, 48px) 0" }}>
        <SplitBio />
        <div style={{ marginTop: "clamp(48px, 8vw, 80px)" }}>
          <StatsCards />
        </div>
      </section>
      <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 48px) 0" }}>
        <ServicesList />
      </section>
      <section style={{ padding: "clamp(64px, 10vw, 120px) 0" }}>
        <ClientLogos />
      </section>
      <section style={{ padding: "0 clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)" }}>
        <ToolsGrid />
      </section>
      <AboutCTA />
    </main>
  );
}
