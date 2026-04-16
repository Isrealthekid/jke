import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "JK Egbuson — Contact",
  description:
    "Get in touch for social media management, video production, or filmmaking projects. Currently open for new work.",
  openGraph: {
    title: "JK Egbuson — Contact",
    description:
      "Get in touch for social media, video, or film projects. Based in Lagos, available worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson — Contact",
  },
};

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <ContactHero />
    </main>
  );
}
