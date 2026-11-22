import Link from "next/link";
import { projects } from "@/data/projects";

const YELLOW = "#FFD34A";

const social = projects.filter((p) => p.category === "Social Content");

/** "On social": the social content projects as a grid of cards. */
export default function OnSocialSection() {
  return (
    <section
      style={{
        backgroundColor: "#000000",
        padding: "0 clamp(20px, 5vw, 48px) clamp(72px, 10vw, 140px)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(245,244,240,0.45)",
        }}
      >
        Content &amp; campaigns
      </p>
      <h2
        style={{
          margin: "12px 0 0",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(56px, 11vw, 160px)",
          lineHeight: 0.9,
          letterSpacing: "-0.01em",
          color: "#f5f4f0",
        }}
      >
        On <span style={{ color: YELLOW }}>social</span>
      </h2>

      <div className="social-grid">
        {social.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="social-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumbnail} alt="" />
            <span className="social-card-title">{p.title}</span>
            <span className="social-card-meta">{p.year}</span>
          </Link>
        ))}
      </div>

      <a
        href="https://www.instagram.com/joie.egbuson/"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-link"
        style={{
          display: "inline-block",
          marginTop: 40,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#f5f4f0",
          textDecoration: "none",
        }}
      >
        Follow @joie.egbuson ↗
      </a>
    </section>
  );
}
