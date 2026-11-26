import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact | Joy Karenate-Egbuson — The Joie TV",
  description:
    "Get in touch for video editing, production, or filmmaking projects. Currently open for new work.",
  openGraph: {
    title: "Contact | Joy Karenate-Egbuson — The Joie TV",
    description:
      "Get in touch for video or film projects. Based in Lagos, available worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Joy Karenate-Egbuson — The Joie TV",
  },
};

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <ContactHero />
    </main>
  );
}
