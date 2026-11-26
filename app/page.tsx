import type { Metadata } from "next";
import HeroReel from "@/components/home/HeroReel";
import SelectedWorks from "@/components/home/SelectedWorks";
import AboutSection from "@/components/home/AboutSection";
import OnScreenSection from "@/components/home/OnScreenSection";
import KineticStatement from "@/components/home/KineticStatement";
import FooterCTA from "@/components/home/FooterCTA";
import SocialProof from "@/components/home/SocialProof";

export const metadata: Metadata = {
  title: "The Joie TV | Joy Karenate-Egbuson — Video Editor & Filmmaker in Lagos",
  description:
    "Joy Karenate-Egbuson (Joy Egbuson) is a Lagos-based video editor, filmmaker and creative director behind The Joie TV (Joie TV Productions). Short films, video editing and creative direction for brands.",
  openGraph: {
    title: "The Joie TV | Joy Karenate-Egbuson — Video Editor & Filmmaker in Lagos",
    description:
      "Joy Karenate-Egbuson (Joy Egbuson) is a Lagos-based video editor, filmmaker and creative director behind The Joie TV (Joie TV Productions). Short films, video editing and creative direction for brands.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Joie TV | Joy Karenate-Egbuson — Video Editor & Filmmaker in Lagos",
    description:
      "Joy Karenate-Egbuson (Joy Egbuson) is a Lagos-based video editor, filmmaker and creative director behind The Joie TV (Joie TV Productions). Short films, video editing and creative direction for brands.",
    images: ["/og.png"],
  },
};

export default function Home() {
  return (
    <main>
      <p className="sr-only">
        Joy Karenate-Egbuson (also known as Joy Egbuson, Joie TV and Joie TV Productions) is a video editor, filmmaker and creative director based in Lagos, Nigeria. This is the home of The Joie TV.
      </p>
      <HeroReel />
      <AboutSection />
      <KineticStatement />
      <SelectedWorks overlay={<OnScreenSection />} />
      <SocialProof />
      <FooterCTA />
    </main>
  );
}
