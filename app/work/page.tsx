import type { Metadata } from "next";
import { PLACEHOLDER_IMAGES } from "@/data/projects";
import WorkShowcase from "@/components/work/WorkShowcase";

export const metadata: Metadata = {
  title: "JK Egbuson — Work",
  description:
    "Selected projects across filmmaking and video editing. Work for GTBank, Flutterwave, MTN, TikTok, and more.",
  openGraph: {
    title: "JK Egbuson — Work",
    description:
      "Selected projects across filmmaking and video editing.",
    images: [{ url: PLACEHOLDER_IMAGES[1], width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson — Work",
    images: [PLACEHOLDER_IMAGES[1]],
  },
};

export default function WorkPage() {
  return (
    <main style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
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
