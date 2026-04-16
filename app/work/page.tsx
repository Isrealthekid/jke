import { projects } from "@/data/projects";
import BodakCards from "@/components/work/BodakCards";
import WorkGrid from "@/components/work/WorkGrid";

export const metadata = {
  title: "Work — JK Egbuson",
};

export default function WorkPage() {
  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ padding: "120px 48px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.5)",
            }}
          >
            Work
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "rgba(245,244,240,0.3)",
            }}
          >
            ({String(projects.length).padStart(2, "0")})
          </span>
        </div>
      </div>

      {/* Bodak cards scroll section */}
      <BodakCards />

      {/* Work grid */}
      <div style={{ padding: "80px 48px 120px" }}>
        <WorkGrid />
      </div>
    </main>
  );
}
