import type { Metadata } from "next";
import WorkShowcase from "@/components/work/WorkShowcase";

export const metadata: Metadata = {
  title: "Work | Joy Karenate-Egbuson — The Joie TV",
  description:
    "Selected projects across filmmaking and video editing. Work for GTBank, Flutterwave, MTN, TikTok, and more.",
  openGraph: {
    title: "Work | Joy Karenate-Egbuson — The Joie TV",
    description:
      "Selected projects across filmmaking and video editing.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Joy Karenate-Egbuson — The Joie TV",
    images: ["/og.png"],
  },
};

export default function WorkPage() {
  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <div
        style={{
          padding:
            "clamp(96px, 11vw, 130px) clamp(20px, 4vw, 40px) clamp(64px, 10vw, 120px)",
        }}
      >
        <WorkShowcase />
      </div>
    </main>
  );
}
