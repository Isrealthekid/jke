import HeroReel from "@/components/home/HeroReel";
import PinnedIntro from "@/components/home/PinnedIntro";
import SelectedWorks from "@/components/home/SelectedWorks";
import KineticStatement from "@/components/home/KineticStatement";
import LatestProject from "@/components/home/LatestProject";
import SocialProof from "@/components/home/SocialProof";
import FooterCTA from "@/components/home/FooterCTA";

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
