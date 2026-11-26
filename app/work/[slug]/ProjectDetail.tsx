"use client";

import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

const label: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(245,244,240,0.4)",
};

function Row({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ marginTop: 18 }}>
      <span style={label}>{name}</span>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: "#f5f4f0",
          margin: "4px 0 0",
        }}
      >
        {value}
      </p>
    </div>
  );
}

/**
 * A project page: the details sit on the left and the video plays on the right.
 * "Go to link" opens the video on its own page in a new tab.
 */
export default function ProjectDetail({ project }: { project: Project }) {
  const link = project.externalUrl ?? project.videoUrl;
  const vertical = project.category === "Edits";
  // Instagram's player carries its own header and footer, so it needs a taller box than a plain video.
  const isInstagram = project.videoUrl?.includes("instagram.com");
  const ratio = isInstagram ? 480 / 860 : vertical ? 9 / 16 : 16 / 9;

  return (
    <section
      style={{
        padding:
          "clamp(96px, 11vw, 130px) clamp(20px, 5vw, 48px) clamp(48px, 8vw, 96px)",
        maxWidth: 1500,
        margin: "0 auto",
      }}
    >
      <div className="project-detail">
        {/* Details */}
        <aside className="project-detail-side">
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 100,
              border: "1px solid rgba(245,244,240,0.2)",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.65)",
            }}
          >
            {project.category}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 3.4vw, 48px)",
              lineHeight: 1.05,
              color: "#f5f4f0",
              margin: "20px 0 10px",
            }}
          >
            {project.title}
          </h1>

          <Row name="Client" value={project.client} />
          <Row name="Role" value={project.role} />
          <Row name="Year" value={project.year} />
          <Row name="Duration" value={project.duration} />

          {project.tools.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <span style={label}>Tools</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    padding: "5px 12px",
                    border: "1px solid rgba(245,244,240,0.15)",
                    borderRadius: 20,
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "rgba(245,244,240,0.6)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 32,
                padding: "14px 28px",
                border: "1px solid #FF7A00",
                borderRadius: 100,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FF7A00",
                textDecoration: "none",
              }}
            >
              Go to link &rarr;
            </a>
          )}
        </aside>

        {/* Player */}
        <div className="project-detail-player">
          {project.videoUrl ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: String(ratio),
                maxHeight: vertical ? "82vh" : undefined,
                maxWidth: vertical ? `calc(82vh * ${ratio})` : undefined,
                margin: vertical ? "0 auto" : undefined,
                borderRadius: 20,
                overflow: "hidden",
                background: "#0c0c0c",
              }}
            >
              <iframe
                src={project.videoUrl}
                title={project.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{ width: "100%", borderRadius: 20, display: "block" }}
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        .project-detail {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 900px) {
          .project-detail {
            grid-template-columns: 320px minmax(0, 1fr);
            gap: 56px;
            align-items: start;
          }
          .project-detail-side {
            position: sticky;
            top: 96px;
          }
        }
        @media (max-width: 899px) {
          .project-detail-player {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
