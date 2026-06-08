import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { PLACEHOLDER_IMAGES } from "@/data/projects";

interface MediaItem {
  src: string;
  type: "image" | "video";
  category: string;
  label: string;
}

function buildMediaCatalog(): MediaItem[] {
  const items: MediaItem[] = [];
  const dataDir = path.join(process.cwd(), "data");

  const mediaUrl = (...segments: string[]) =>
    `/api/playground/media/${segments.map((s) => encodeURIComponent(s)).join("/")}`;

  // --- Designs ---
  const designsBase = path.join(dataDir, "Designs", "Designs");
  if (fs.existsSync(designsBase)) {
    for (const client of fs.readdirSync(designsBase).sort()) {
      const clientPath = path.join(designsBase, client);
      if (!fs.statSync(clientPath).isDirectory()) continue;
      for (const campaign of fs.readdirSync(clientPath).sort()) {
        const campaignPath = path.join(clientPath, campaign);
        if (!fs.statSync(campaignPath).isDirectory()) continue;
        for (const file of fs.readdirSync(campaignPath).sort()) {
          const ext = path.extname(file).toLowerCase();
          if (
            ![".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".webm"].includes(ext)
          )
            continue;
          items.push({
            src: mediaUrl("Designs", "Designs", client, campaign, file),
            type: [".mp4", ".webm"].includes(ext) ? "video" : "image",
            category: "Designs",
            label: `${client} — ${campaign}`,
          });
        }
      }
    }
  }

  // --- Logo Animations ---
  const logoBase = path.join(dataDir, "Logo Animations", "Logo Animations");
  if (fs.existsSync(logoBase)) {
    for (const file of fs.readdirSync(logoBase).sort()) {
      const ext = path.extname(file).toLowerCase();
      if (![".mp4", ".webm", ".mov"].includes(ext)) continue;
      items.push({
        src: mediaUrl("Logo Animations", "Logo Animations", file),
        type: "video",
        category: "Logo Animations",
        label: path.basename(file, ext),
      });
    }
  }

  // --- Outro Animations ---
  const outroBase = path.join(dataDir, "Outro Animations", "Outro Animations");
  if (fs.existsSync(outroBase)) {
    for (const file of fs.readdirSync(outroBase).sort()) {
      const ext = path.extname(file).toLowerCase();
      if (![".mp4", ".webm", ".mov"].includes(ext)) continue;
      items.push({
        src: mediaUrl("Outro Animations", "Outro Animations", file),
        type: "video",
        category: "Outro Animations",
        label: path.basename(file, ext),
      });
    }
  }

  return items;
}

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
  const mediaItems = buildMediaCatalog();

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
      {/* responsive masonry styles */}
      <style>{`
        .pg-masonry {
          columns: 5;
          column-gap: 10px;
        }
        @media (max-width: 1280px) { .pg-masonry { columns: 4; } }
        @media (max-width: 1024px) { .pg-masonry { columns: 3; } }
        @media (max-width: 640px)  { .pg-masonry { columns: 2; } }

        .pg-cell {
          break-inside: avoid;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
          border-radius: 6px;
          background: rgba(245,244,240,0.04);
          cursor: default;
        }
        .pg-cell img,
        .pg-cell video {
          display: block;
          width: 100%;
          height: auto;
        }
        .pg-cell .pg-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 10px 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .pg-cell:hover .pg-label { opacity: 1; }
        .pg-label span {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(245,244,240,0.9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .pg-cat-badge {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #008cff;
          display: block;
          margin-bottom: 3px;
        }
      `}</style>

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

      {/* Hero */}
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

      {/* Media masonry grid */}
      {mediaItems.length > 0 && (
        <section
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 clamp(20px, 5vw, 48px) clamp(80px, 10vw, 120px)",
          }}
        >
          <div className="pg-masonry">
            {mediaItems.map((item, i) => (
              <div key={i} className="pg-cell">
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                )}
                <div className="pg-label">
                  <span>
                    <em className="pg-cat-badge">{item.category}</em>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
