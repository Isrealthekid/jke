"use client";

import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import type { Project } from "@/data/projects";

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <section
      style={{
        padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px) clamp(64px, 10vw, 120px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 64,
        }}
        className="md:!grid-cols-[320px_1fr]"
      >
        {/* ---- Left column: sticky meta ---- */}
        <div
          style={{ position: "sticky", top: 80, alignSelf: "start" }}
          className="hidden md:block"
        >
          {/* Category badge */}
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 100,
              border: "1px solid rgba(245,244,240,0.15)",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.6)",
              marginBottom: 32,
            }}
          >
            {project.category}
          </span>

          <MetaRow label="Client" value={project.client} />
          <MetaRow label="Role" value={project.role} />
          <MetaRow label="Year" value={project.year} />
          <MetaRow label="Duration" value={project.duration} />

          {/* Tools */}
          <div style={{ marginTop: 24 }}>
            <span style={metaLabelStyle}>Tools</span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 8,
              }}
            >
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    padding: "4px 12px",
                    border: "1px solid rgba(245,244,240,0.1)",
                    borderRadius: 4,
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "rgba(245,244,240,0.5)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          {project.videoUrl && (
            <div style={{ marginTop: 40 }}>
              <MagneticButton
                href={project.videoUrl}
                strength={0.3}
                style={{
                  padding: "14px 28px",
                  border: "1px solid rgba(200,255,0,0.4)",
                  borderRadius: 100,
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#008cff",
                }}
              >
                Watch Full Project &rarr;
              </MagneticButton>
            </div>
          )}

          {/* Mobile meta (shown only on mobile) */}
        </div>

        {/* Mobile meta block */}
        <div className="md:hidden" style={{ marginBottom: 32 }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 100,
              border: "1px solid rgba(245,244,240,0.15)",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.6)",
              marginBottom: 20,
            }}
          >
            {project.category}
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <MetaRow label="Client" value={project.client} />
            <MetaRow label="Role" value={project.role} />
            <MetaRow label="Year" value={project.year} />
            <MetaRow label="Duration" value={project.duration} />
          </div>
        </div>

        {/* ---- Right column: scrollable content ---- */}
        <div>
          {/* Overview */}
          <ScrollReveal>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(245,244,240,0.8)",
                maxWidth: 640,
              }}
            >
              {project.overview}
            </p>
          </ScrollReveal>

          {/* The Brief */}
          <ScrollReveal delay={0.1}>
            <div style={{ marginTop: 64 }}>
              <SectionHeading>The Brief</SectionHeading>
              <p style={bodyStyle}>{project.brief}</p>
            </div>
          </ScrollReveal>

          {/* The Approach */}
          <ScrollReveal delay={0.1}>
            <div style={{ marginTop: 64 }}>
              <SectionHeading>The Approach</SectionHeading>
              <p style={bodyStyle}>{project.approach}</p>
            </div>
          </ScrollReveal>

          {/* Image gallery */}
          <div
            className="grid grid-cols-2 md:grid-cols-3"
            style={{
              gap: 12,
              marginTop: 64,
            }}
          >
            {project.images.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/5",
                    overflow: "hidden",
                    borderRadius: 4,
                  }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(min-width: 768px) 280px, 33vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* The Result */}
          {project.metrics && project.metrics.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div style={{ marginTop: 64 }}>
                <SectionHeading>The Result</SectionHeading>
                <p style={{ ...bodyStyle, marginBottom: 32 }}>
                  {project.result}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 48,
                    flexWrap: "wrap",
                  }}
                >
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(40px, 5vw, 64px)",
                          color: "#008cff",
                          lineHeight: 1,
                        }}
                      >
                        {metric.value}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-body)",
                          fontSize: 12,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(245,244,240,0.4)",
                          marginTop: 8,
                        }}
                      >
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Responsive grid override */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .md\\:!grid-cols-\\[320px_1fr\\] {
            grid-template-columns: 320px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ---- Helpers ---- */
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <span style={metaLabelStyle}>{label}</span>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "#f5f4f0",
          margin: "4px 0 0",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(26px, 4vw, 32px)",
        color: "#f5f4f0",
        margin: "0 0 16px",
      }}
    >
      {children}
    </h2>
  );
}

const metaLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(245,244,240,0.35)",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 16,
  lineHeight: 1.7,
  color: "rgba(245,244,240,0.7)",
  maxWidth: 640,
  margin: 0,
};
