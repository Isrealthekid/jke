"use client";

import { useEffect, useRef, useState } from "react";
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

/** YouTube ID from an embed URL, or null for TikTok / Instagram (those can't autoplay muted). */
function youtubeId(url?: string) {
  const m = url?.match(/youtube\.com\/embed\/([\w-]{11})/);
  return m ? m[1] : null;
}

/** Plays a YouTube clip silently on a loop, but only while its tile is on screen. */
function AutoClip({ id, tall }: { id: string; tall: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  // Phones and tablets keep still pictures: less data, less battery, and no player buttons showing.
  const [canPlay, setCanPlay] = useState(false);
  useEffect(() => {
    setCanPlay(window.matchMedia('(hover: hover) and (min-width: 900px)').matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (!e.isIntersecting) setReady(false);
    }, {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="stagger-clip" aria-hidden="true">
      {canPlay && visible && (
        <iframe
          className={tall ? "is-tall" : "is-wide"}
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3`}
          title=""
          tabIndex={-1}
          // The player paints black until the video starts, so it only fades in a moment after loading.
          onLoad={() => setTimeout(() => setReady(true), 1800)}
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
          allow="autoplay; encrypted-media"
        />
      )}
    </div>
  );
}

/** Bends the tiles like a fish-eye lens: bigger in the middle of the screen, smaller and tilted at the edges. */
function useFisheye(rootRef: React.RefObject<HTMLDivElement | null>, dep: unknown) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      root.querySelectorAll<HTMLElement>(".stagger-tile").forEach((tile) => {
        const lens = tile.firstElementChild as HTMLElement | null;
        if (!lens) return;
        const r = tile.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const dx = (r.left + r.width / 2 - vw / 2) / (vw / 2);
        const dy = (r.top + r.height / 2 - vh / 2) / (vh / 2);
        const k = vw < 700 ? 0.4 : 1; // softer on phones
        const d2 = Math.min(dx * dx + dy * dy, 2.2);
        const scale = 1.04 - 0.2 * d2 * k;
        const rotY = -dx * 16 * k;
        const rotX = dy * 12 * k;
        lens.style.transform = `perspective(1100px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      });
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rootRef, dep]);
}

/**
 * The Works page: staggered columns of rounded images, with the title and filters sitting in the
 * top-left corner. To add work, add it to data/projects.ts and it drops into the next free column.
 */
export default function WorkShowcase() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const cols = useColumnCount();
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);
  const rootRef = useRef<HTMLDivElement>(null);
  useFisheye(rootRef, `${active}-${cols}`);

  const columns: { p: Project; n: number }[][] = Array.from({ length: cols }, () => []);
  list.forEach((p, i) => columns[i % cols].push({ p, n: i }));

  return (
    <div className="stagger" ref={rootRef}>
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
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="stagger-tile"
                data-cursor="view"
                style={{ aspectRatio: shapes[(k + ci) % shapes.length] }}
              >
                <span className="stagger-lens">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumbnail} alt={p.title} loading="lazy" />
                  {youtubeId(p.videoUrl) && <AutoClip id={youtubeId(p.videoUrl)!} tall={tall} />}
                  <span className="stagger-cap">
                    <span className="stagger-cap-num">{String(n + 1).padStart(2, "0")}</span>
                    <span className="stagger-cap-title">{p.title}</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
