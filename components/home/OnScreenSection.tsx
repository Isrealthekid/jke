import Link from "next/link";
import { projects } from "@/data/projects";

const FILMS_URL = "https://films.thejoietv.com";
const PINK = "#C6249B";

const films = projects.filter((p) => p.category === "Film");
// Just the four films for now; the full list lives on films.thejoietv.com.
const onScreen = films.slice(0, 4);

/**
 * "On the screen": the films series card plus an index of the first four films.
 * On large screens this is a full-screen panel that slides up over the "What I do" cards
 * (and the Edits showcase then slides up over it), see .stack-panel in globals.css.
 */
export default function OnScreenSection() {
  return (
    <section className="stack-panel">
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgb(var(--fg-rgb) / 0.45)",
        }}
      >
        Film &amp; video
      </p>
      <h2
        style={{
          margin: "10px 0 0",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 6.4vw, 96px)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: "var(--fg)",
        }}
      >
        On the <span style={{ color: PINK }}>screen</span>
      </h2>

      <div className="onscreen-grid">
        {/* Series card: stacked posters, links to the films site */}
        <a
          href={FILMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="series-card"
        >
          <span className="series-card-label">
            <i aria-hidden="true" />
            Click to see the films
          </span>
          <span className="poster-stack" aria-hidden="true">
            {films.slice(0, 4).map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={f.slug} src={f.thumbnail} alt="" className={`poster poster-${i}`} />
            ))}
          </span>
          <span className="series-card-foot">
            <strong>Joie TV Productions</strong>
            <span>
              {films.length}{" "}films &middot; films.thejoietv.com ↗
            </span>
          </span>
        </a>

        {/* Index of films and edits */}
        <ol className="work-index">
          {onScreen.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="work-row">
                <span className="work-row-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="work-row-title">{p.title}</span>
                <span className="work-row-meta">
                  {p.category} &middot; {p.year}
                </span>
                <span className="work-row-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
