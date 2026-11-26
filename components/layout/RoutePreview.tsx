"use client";

import { usePathname } from "next/navigation";
import HeroReel from "@/components/home/HeroReel";
import { projects } from "@/data/projects";
import { SOCIALS } from "@/components/shared/socialLinks";

/**
 * What the loader's program monitor shows: a miniature of whichever page you're landing on, so a
 * refresh on /work shows the Works page opening, not the home screen.
 */
export default function RoutePreview() {
  const path = usePathname() || "/";

  if (path === "/") return <HeroReel instant />;
  if (path === "/work") return <WorksPreview />;
  if (path.startsWith("/work/")) {
    const slug = path.split("/")[2];
    const project = projects.find((p) => p.slug === slug);
    if (project) return <ProjectPreview project={project} />;
  }
  if (path === "/services") return <ServicesPreview />;
  if (path === "/contact") return <ContactPreview />;
  return <GenericPreview title={path.replace(/^\//, "").split("/")[0] || "The Joie TV"} />;
}

const stage: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#000",
  color: "#f5f4f0",
  padding: "96px clamp(20px, 4vw, 40px) 0",
  overflow: "hidden",
};

const display: React.CSSProperties = { fontFamily: "var(--font-display)", lineHeight: 0.95, margin: 0 };

function WorksPreview() {
  const cols = [0, 1, 2, 3].map((c) => projects.filter((_, i) => i % 4 === c).slice(0, 3));
  const offsets = [150, 40, 190, 0];
  return (
    <div style={stage}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {cols.map((col, ci) => (
          <div
            key={ci}
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, marginTop: offsets[ci] }}
          >
            {ci === 0 && (
              <div style={{ marginBottom: 8 }}>
                <h1 className="no-zoom" style={{ ...display, fontSize: "clamp(44px, 6vw, 88px)" }}>
                  Works
                </h1>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, opacity: 0.65, maxWidth: "22ch" }}>
                  Films, edits and creative direction, made in Lagos.
                </p>
              </div>
            )}
            {col.map((p, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.slug}
                src={p.thumbnail}
                alt=""
                style={{
                  width: "100%",
                  aspectRatio: p.category === "Edits" ? "3 / 4" : ["4 / 3", "1 / 1", "5 / 4"][(k + ci) % 3],
                  objectFit: "cover",
                  borderRadius: 22,
                  display: "block",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  const tall = project.category === "Edits";
  return (
    <div style={stage}>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 56, alignItems: "start" }}>
        <div>
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
            }}
          >
            {project.category}
          </span>
          <h1 className="no-zoom" style={{ ...display, fontSize: "clamp(30px, 3.4vw, 48px)", margin: "20px 0 14px" }}>
            {project.title}
          </h1>
          {[
            ["Client", project.client],
            ["Role", project.role],
            ["Year", project.year],
          ].map(([k, v]) => (
            <div key={k} style={{ marginTop: 16, fontFamily: "var(--font-body)" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>{k}</div>
              <div style={{ fontSize: 15, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt=""
            style={{
              width: tall ? "min(100%, 46vh)" : "100%",
              aspectRatio: tall ? "9 / 16" : "16 / 9",
              objectFit: "cover",
              borderRadius: 20,
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ServicesPreview() {
  const cards = [
    { n: "01", t: "Creative Direction", bg: "#FF7A00", ink: "#000" },
    { n: "02", t: "Video Production & Editing", bg: "#C6249B", ink: "#fff" },
    { n: "03", t: "Filmmaking & Documentary", bg: "#FFD34A", ink: "#000" },
  ];
  return (
    <div style={stage}>
      <h1 className="no-zoom" style={{ ...display, fontSize: "clamp(56px, 9vw, 130px)" }}>
        What I offer
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 48 }}>
        {cards.map((c) => (
          <div
            key={c.n}
            className="keep-colors"
            style={{
              width: 340,
              height: 420,
              borderRadius: 28,
              background: c.bg,
              color: c.ink,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, opacity: 0.7 }}>{c.n}</span>
            <h3 style={{ ...display, fontSize: 30 }}>{c.t}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPreview() {
  return (
    <div style={stage}>
      <h1 className="no-zoom" style={{ ...display, fontSize: "clamp(70px, 12vw, 170px)" }}>
        Let&rsquo;s
        <br />
        talk.
      </h1>
      <div style={{ display: "flex", gap: 14, marginTop: 56 }}>
        {SOCIALS.map((s) => (
          <div
            key={s.label}
            style={{
              width: 170,
              height: 150,
              borderRadius: 20,
              background: "#111",
              border: "1px solid rgba(245,244,240,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
              {s.icon}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericPreview({ title }: { title: string }) {
  return (
    <div style={{ ...stage, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1 className="no-zoom" style={{ ...display, fontSize: "clamp(56px, 10vw, 150px)", textAlign: "center" }}>
        {title}
      </h1>
    </div>
  );
}
