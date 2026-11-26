import type { Metadata } from "next";
import HeroReel from "@/components/home/HeroReel";
import SelectedWorks from "@/components/home/SelectedWorks";
import AboutSection from "@/components/home/AboutSection";
import OnScreenSection from "@/components/home/OnScreenSection";
import KineticStatement from "@/components/home/KineticStatement";
import FooterCTA from "@/components/home/FooterCTA";
import SocialProof from "@/components/home/SocialProof";

export const metadata: Metadata = {
  title: "The Joie TV — Video Editing & Film",
  description:
    "Lagos-based video editor and filmmaker crafting visual stories for brands and individuals.",
  openGraph: {
    title: "The Joie TV — Video Editing & Film",
    description:
      "Lagos-based video editor and filmmaker crafting visual stories for brands and individuals.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Joie TV — Video Editing & Film",
    description:
      "Lagos-based video editor and filmmaker crafting visual stories for brands and individuals.",
    images: ["/og.png"],
  },
};

export default function Home() {
  return (
    <main>
      <HeroReel />
      <AboutSection />
      <KineticStatement />
      <SelectedWorks overlay={<OnScreenSection />} />
      <SocialProof />
      <FooterCTA />
    </main>
  );
}
