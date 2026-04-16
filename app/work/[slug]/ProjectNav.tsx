"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export default function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <nav
      style={{
        borderTop: "1px solid rgba(245,244,240,0.08)",
        padding: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Previous */}
      <div style={{ flex: 1 }}>
        {prev && (
          <Link
            href={`/work/${prev.slug}`}
            style={{
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            <span style={navLabelStyle}>&larr; Previous</span>
            <span style={navTitleStyle}>{prev.title}</span>
          </Link>
        )}
      </div>

      {/* Centre */}
      <Link
        href="/work"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(245,244,240,0.4)",
          textDecoration: "none",
          transition: "color 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#f5f4f0";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color =
            "rgba(245,244,240,0.4)";
        }}
      >
        Back to all work
      </Link>

      {/* Next */}
      <div style={{ flex: 1, textAlign: "right" }}>
        {next && (
          <Link
            href={`/work/${next.slug}`}
            style={{
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            <span style={{ ...navLabelStyle, textAlign: "right" }}>
              Next &rarr;
            </span>
            <span style={{ ...navTitleStyle, textAlign: "right" }}>
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

const navLabelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(245,244,240,0.35)",
  marginBottom: 6,
};

const navTitleStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-display)",
  fontSize: 24,
  color: "#f5f4f0",
  transition: "color 0.2s",
};
