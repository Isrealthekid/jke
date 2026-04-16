import type { Metadata } from "next";
import { projects, PLACEHOLDER_IMAGES } from "@/data/projects";
import BodakCards from "@/components/work/BodakCards";
import WorkGrid from "@/components/work/WorkGrid";

export const metadata: Metadata = {
  title: "JK Egbuson — Work",
  description:
    "Selected projects across filmmaking, video editing, and social media content. Work for GTBank, Flutterwave, MTN, TikTok, and more.",
  openGraph: {
    title: "JK Egbuson — Work",
    description:
      "Selected projects across filmmaking, video editing, and social media content.",
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
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ padding: "clamp(100px, 12vw, 120px) clamp(20px, 5vw, 48px) 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,244,240,0.5)" }}>
            Work
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(245,244,240,0.3)" }}>
            ({String(projects.length).padStart(2, "0")})
          </span>
        </div>
      </div>
      <BodakCards />
      <div style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)" }}>
        <WorkGrid />
      </div>
    </main>
  );
}
