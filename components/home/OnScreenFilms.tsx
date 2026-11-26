"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export interface FeedFilm {
  id: number;
  title: string;
  genre: string;
  year: string;
  image: string;
  soon: boolean;
  isNew: boolean;
  releaseDate: string;
}

const FILMS_URL = "https://films.thejoietv.com";
const PINK = "#C6249B";
const MAX_ROWS = 6;

/**
 * The "On the screen" panel. On large screens this is a full-screen panel that slides up over the
 * "What I do" cards (and the Edits showcase then slides up over it), see .stack-panel in globals.css.
 */
export default function OnScreenFilms({ initial, feed }: { initial: FeedFilm[]; feed: string }) {
  const [films, setFilms] = useState(initial);

  // Ask films.thejoietv.com for its latest list, so this always matches that site.
  useEffect(() => {
    let alive = true;
    fetch(feed, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data || !Array.isArray(data.films) || !data.films.length) return;
        setFilms(data.films as FeedFilm[]);
        // The panel is part of a pinned scroll section, so let the scroll maths re-measure.
        requestAnimationFrame(() => ScrollTrigger.refresh());
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [feed]);

  const rows = films.slice(0, MAX_ROWS);
  const more = films.length - rows.length;

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
        {/* Series card: stacked pictures, links to the films site */}
        <a href={FILMS_URL} target="_blank" rel="noopener noreferrer" className="series-card">
          <span className="series-card-label">
            <i aria-hidden="true" />
            Click to see the films
          </span>
          <span className="poster-stack" aria-hidden="true">
            {films.slice(0, 4).map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={f.id} src={f.image} alt="" className={`poster poster-${i}`} />
            ))}
          </span>
          <span className="series-card-foot">
            <strong>Joie TV Productions</strong>
            <span>
              {films.length} {films.length === 1 ? "film" : "films"} &middot; films.thejoietv.com ↗
            </span>
          </span>
        </a>

        {/* The films, named exactly as on the films site */}
        <ol className="work-index">
          {rows.map((f, i) => (
            <li key={f.id}>
              <a href={FILMS_URL} target="_blank" rel="noopener noreferrer" className="work-row">
                <span className="work-row-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="work-row-title">{f.title}</span>
                <span className="work-row-meta">
                  {f.soon ? (f.releaseDate ? `Coming ${f.releaseDate}` : "Coming soon") : `Film · ${f.year}`}
                </span>
                <span className="work-row-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </li>
          ))}
          {more > 0 && (
            <li>
              <a href={FILMS_URL} target="_blank" rel="noopener noreferrer" className="work-row">
                <span className="work-row-num">+{more}</span>
                <span className="work-row-title">See all {films.length} films</span>
                <span className="work-row-meta">films.thejoietv.com</span>
                <span className="work-row-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}
