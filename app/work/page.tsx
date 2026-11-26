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

const TITLE = "WORKS".split("");

export default function WorkPage() {
  return (
    <main style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
      <div
        style={{
          padding:
            "clamp(100px, 12vw, 140px) clamp(20px, 5vw, 48px) clamp(32px, 5vw, 56px)",
        }}
      >
        {/* Big title with its letters spread across the full width */}
        <h1
          aria-label="Works"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "clamp(72px, 17vw, 260px)",
            color: "#f5f4f0",
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          {TITLE.map((letter, i) => (
            <span key={i} aria-hidden="true">
              {letter}
            </span>
          ))}
        </h1>
      </div>
      <div
        style={{
          padding: "0 clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)",
        }}
      >
        <WorkShowcase />
      </div>
    </main>
  );
}
