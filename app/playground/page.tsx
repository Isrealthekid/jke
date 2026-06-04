import type { Metadata } from "next";
import { PLACEHOLDER_IMAGES } from "@/data/projects";

const experiments = [
  {
    title: "Motion Tests",
    description:
      "Small interaction studies for transitions, scroll-driven reveals, and bold typography movement.",
    status: "In Progress",
  },
  {
    title: "Concept Frames",
    description:
      "Visual directions for campaign shoots, social cuts, and branded film pacing.",
    status: "Research",
  },
  {
    title: "UI Prototypes",
    description:
      "Rapid page ideas to test information hierarchy, rhythm, and interaction tone.",
    status: "Open",
  },
];

export const metadata: Metadata = {
  title: "JK Egbuson - Playground",
  description:
    "Creative experiments, interaction studies, and concept previews from the JK lab.",
  openGraph: {
    title: "JK Egbuson - Playground",
    description:
      "Creative experiments, interaction studies, and concept previews from the JK lab.",
    images: [{ url: PLACEHOLDER_IMAGES[2], width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Egbuson - Playground",
    images: [PLACEHOLDER_IMAGES[2]],
  },
};

export default function PlaygroundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#f5f4f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(0,140,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(34,197,94,0.15), transparent 35%)",
          pointerEvents: "none",
        }}
      />

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(100px, 12vw, 140px) clamp(20px, 5vw, 48px) clamp(72px, 10vw, 120px)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(245,244,240,0.6)",
            marginBottom: 16,
          }}
        >
          New Menu Page
        </span>

        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(64px, 15vw, 180px)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          Playground
        </h1>

        <p
          style={{
            marginTop: 16,
            marginBottom: 40,
            maxWidth: 680,
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 2.2vw, 22px)",
            lineHeight: 1.6,
            color: "rgba(245,244,240,0.82)",
          }}
        >
          A live space for ideas in motion. This page collects experiments, early concepts,
          and interaction studies before they move into final client work.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {experiments.map((item) => (
            <article
              key={item.title}
              style={{
                background: "rgba(245,244,240,0.03)",
                border: "1px solid rgba(245,244,240,0.12)",
                borderRadius: 12,
                padding: 20,
                backdropFilter: "blur(3px)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#008cff",
                  marginBottom: 12,
                }}
              >
                {item.status}
              </span>
              <h2
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4.5vw, 42px)",
                  lineHeight: 0.95,
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "rgba(245,244,240,0.72)",
                }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
