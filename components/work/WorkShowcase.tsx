"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

const FILTERS = ["All", "Film", "Video Edit", "Edits"] as const;

/**
 * The Works page grid: an even grid of equal cells on black, like a contact sheet. Wide work
 * (films, video edits) sits in its cell at its own proportions; vertical work (edits) fills the
 * cell. A small caption sits under each one.
 */
export default function WorkShowcase() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filters */}
      <div className="showcase-filters" role="tablist" aria-label="Filter works">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            className={active === f ? "is-active" : undefined}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
        <span className="showcase-count">({String(list.length).padStart(2, "0")})</span>
      </div>

      <div className="showcase-grid">
        {list.map((p, i) => {
          const vertical = p.category === "Edits";
          return (
            <Link key={p.slug} href={`/work/${p.slug}`} className="showcase-item">
              <span className="showcase-cell">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  loading="lazy"
                  className={vertical ? "is-fill" : "is-natural"}
                />
              </span>
              <span className="showcase-caption">
                <span className="showcase-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="showcase-title">{p.title}</span>
                <span className="showcase-meta">
                  {p.category} &middot; {p.year}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
