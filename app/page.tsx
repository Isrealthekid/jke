import type { Metadata } from "next";
import { PLACEHOLDER_IMAGES } from "@/data/projects";
import HeroReel from "@/components/home/HeroReel";
import PinnedIntro from "@/components/home/PinnedIntro";
import SelectedWorks from "@/components/home/SelectedWorks";
import KineticStatement from "@/components/home/KineticStatement";
import LatestProject from "@/components/home/LatestProject";
import SocialProof from "@/components/home/SocialProof";
import FooterCTA from "@/components/home/FooterCTA";

export const metadata: Metadata = {
  title: "JK Egbuson — Social Media, Video & Film",
  description:
    "Lagos-based social media manager, video editor, and filmmaker crafting visual stories for brands and individuals.",
  openGraph: {
    title: "JK Egbuson — Social Media, Video & Film",
    description:
      "Lagos-based social media manager, video editor, and filmmaker crafting visual stories for brands and individuals.",
    images: [{ url: PLACEHOLDER_IMAGES[0], width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson — Social Media, Video & Film",
    description:
      "Lagos-based social media manager, video editor, and filmmaker crafting visual stories for brands and individuals.",
    images: [PLACEHOLDER_IMAGES[0]],
  },
};

export default function Home() {
  return (
    <main>
      <HeroReel />
      <PinnedIntro />
      <SelectedWorks />
      <KineticStatement />
      <LatestProject />
      <SocialProof />
      <FooterCTA />
    </main>
  );
}
