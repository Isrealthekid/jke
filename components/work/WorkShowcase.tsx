"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";

const FILTERS = ["All", "Film", "Video Edit", "Edits"] as const;

// How far each column is pushed down, so the tops of the columns step up and down.
const OFFSETS = [150, 40, 190, 0, 110];

// Shapes the tiles rotate through so neighbouring images are never the same height.
const SHAPES_WIDE = ["4 / 3", "1 / 1", "5 / 4"];
const SHAPES_TALL = ["3 / 4", "4 / 5", "9 / 14"];

function useColumnCount() {
  const [n, setN] = useState(4);
  useEffect(() => {
    const update = () => setN(window.innerWidth < 700 ? 2 : window.innerWidth < 1100 ? 3 : 4);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return n;
}

/**
 * The Works page: staggered columns of rounded images, with the title and filters sitting in the
 * top-left corner. To add work, add it to data/projects.ts and it drops into the next free column.
 */
export default function WorkShowcase() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const cols = useColumnCount();
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  const columns: { p: Project; n: number }[][] = Array.from({ length: cols }, () => []);
  list.forEach((p, i) => columns[i % cols].push({ p, n: i }));

  return (
    <div className="stagger">
      {columns.map((col, ci) => (
        <div
          key={ci}
          className="stagger-col"
          style={{ marginTop: ci === 0 ? 0 : OFFSETS[ci % OFFSETS.length] }}
        >
          {ci === 0 && (
            <div className="stagger-intro">
              <h1 className="stagger-title">Works</h1>
              <p className="stagger-lede">
                Films, edits and creative direction, made in Lagos.
              </p>
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
              </div>
              <div className="stagger-count">({String(list.length).padStart(2, "0")})</div>
            </div>
          )}
          {col.map(({ p, n }, k) => {
            const tall = p.category === "Edits";
            const shapes = tall ? SHAPES_TALL : SHAPES_WIDE;
            return (
              <Link key={p.slug} href={`/work/${p.slug}`} className="stagger-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  loading="lazy"
                  style={{ aspectRatio: shapes[(k + ci) % shapes.length] }}
                />
                <span className="stagger-cap">
                  <span className="stagger-cap-num">{String(n + 1).padStart(2, "0")}</span>
                  <span className="stagger-cap-title">{p.title}</span>
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
