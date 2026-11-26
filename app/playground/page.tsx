import type { Metadata } from "next";
import PlaygroundView from "@/components/playground/PlaygroundView";

export const metadata: Metadata = {
  title: "JK Egbuson - Playground",
  description:
    "The work I make on the side: carousel designs, light graphic design and motion graphics.",
  openGraph: {
    title: "JK Egbuson - Playground",
    description:
      "The work I make on the side: carousel designs, light graphic design and motion graphics.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson - Playground",
    images: ["/og.png"],
  },
};

export default function PlaygroundPage() {
  return <PlaygroundView />;
}
