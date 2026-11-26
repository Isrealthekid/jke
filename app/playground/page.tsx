import type { Metadata } from "next";
import { PLACEHOLDER_IMAGES } from "@/data/projects";
import PlaygroundView from "@/components/playground/PlaygroundView";

export const metadata: Metadata = {
  title: "JK Egbuson - Playground",
  description:
    "The work I make on the side: carousel designs, light graphic design and motion graphics.",
  openGraph: {
    title: "JK Egbuson - Playground",
    description:
      "The work I make on the side: carousel designs, light graphic design and motion graphics.",
    images: [{ url: PLACEHOLDER_IMAGES[2], width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson - Playground",
    images: [PLACEHOLDER_IMAGES[2]],
  },
};

export default function PlaygroundPage() {
  return <PlaygroundView />;
}
