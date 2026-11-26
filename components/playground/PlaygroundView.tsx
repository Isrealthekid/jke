"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  carousels,
  motion,
  type PlaygroundCarousel,
  type PlaygroundMotion,
} from "@/data/playground";

const BRAND = ["#FF7A00", "#C6249B", "#FFD34A"];

type Open =
  | { kind: "slides"; carousel: PlaygroundCarousel; index: number }
  | { kind: "video"; clip: PlaygroundMotion }
  | null;

/** Fades things in as they scroll into view. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function PlaygroundView() {
  const [open, setOpen] = useState<Open>(null);

  return (
    <main className="pg-page">
      {/* ---- Intro ---- */}
      <section className="pg-intro">
        <p className="pg-eyebrow">Beyond the edit</p>
        <h1 className="pg-title no-zoom">Playground</h1>
        <p className="pg-lede">
          The things I make on the side. Carousel designs, light graphic design and motion
          graphics: work I don&rsquo;t really promote, but love making. Click a carousel to flip
          through it slide by slide.
        </p>
      </section>

      {/* ---- Carousels ---- */}
      <section className="pg-section">
        <header className="pg-head">
          <h2>Carousels</h2>
          <span>({String(carousels.length).padStart(2, "0")})</span>
        </header>
        <div className="pg-spreads">
          {carousels.map((c, i) => (
            <Spread
              key={c.id}
              carousel={c}
              accent={BRAND[i % BRAND.length]}
              onOpen={() => setOpen({ kind: "slides", carousel: c, index: 0 })}
            />
          ))}
        </div>
      </section>

      {/* ---- Motion ---- */}
      <section className="pg-section pg-motion">
        <header className="pg-head">
          <h2>Motion</h2>
          <span>({String(motion.length).padStart(2, "0")})</span>
        </header>
        <p className="pg-motion-note">Logo and outro animations. Hover to pause, click to watch with sound.</p>
        <MotionReel onOpen={(clip) => setOpen({ kind: "video", clip })} />
      </section>

      {open && <Lightbox open={open} setOpen={setOpen} onClose={() => setOpen(null)} />}
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  A carousel laid out flat as a fanned spread                        */
/* ------------------------------------------------------------------ */
function Spread({
  carousel,
  accent,
  onOpen,
}: {
  carousel: PlaygroundCarousel;
  accent: string;
  onOpen: () => void;
}) {
  const ref = useReveal<HTMLButtonElement>();
  const n = carousel.slides.length;
  const max = Math.max(n - 1, 1);

  return (
    <button
      ref={ref}
      type="button"
      className="pg-spread"
      onClick={onOpen}
      aria-label={`Open ${carousel.client}: ${carousel.title}, ${n} slides`}
      style={{ ["--accent" as string]: accent }}
    >
      <span className="pg-fan" style={{ ["--max" as string]: max, ["--mid" as string]: max / 2 }}>
        {carousel.slides.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={s.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="pg-slide"
            style={{ ["--i" as string]: i, zIndex: i === 0 ? n : n - i }}
          />
        ))}
      </span>
      <span className="pg-meta">
        <span className="pg-client">{carousel.client}</span>
        <span className="pg-name">{carousel.title}</span>
        <span className="pg-count">{n} slides &middot; view &rarr;</span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion: a slow drifting reel of little TVs                         */
/* ------------------------------------------------------------------ */
function MotionReel({ onOpen }: { onOpen: (clip: PlaygroundMotion) => void }) {
  // Twice over so the drift loops without a gap.
  const items = [...motion, ...motion];
  return (
    <div className="pg-reel">
      <div className="pg-track">
        {items.map((clip, i) => (
          <Tv
            key={`${clip.id}-${i}`}
            clip={clip}
            colour={BRAND[i % BRAND.length]}
            hidden={i >= motion.length}
            onOpen={() => onOpen(clip)}
          />
        ))}
      </div>
    </div>
  );
}

function Tv({
  clip,
  colour,
  hidden,
  onOpen,
}: {
  clip: PlaygroundMotion;
  colour: string;
  hidden: boolean;
  onOpen: () => void;
}) {
  const wrap = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Only play while it's on screen.
  useEffect(() => {
    const el = wrap.current;
    const v = video.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={wrap}
      type="button"
      className="pg-tv"
      onClick={onOpen}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : 0}
      aria-label={`Watch ${clip.title}`}
      style={{ ["--bezel" as string]: colour, aspectRatio: `${clip.w} / ${clip.h}` }}
    >
      <video
        ref={video}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <span className="pg-tv-label">{clip.title}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Full-screen viewer: one slide at a time, or one video              */
/* ------------------------------------------------------------------ */
function Lightbox({
  open,
  setOpen,
  onClose,
}: {
  open: NonNullable<Open>;
  setOpen: (o: Open) => void;
  onClose: () => void;
}) {
  const startX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) => {
      if (open.kind !== "slides") return;
      const len = open.carousel.slides.length;
      setOpen({ ...open, index: (open.index + d + len) % len });
    },
    [open, setOpen]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, step]);

  return (
    <div
      className="pg-lightbox"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      onClick={onClose}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
      }}
    >
      <button type="button" className="pg-close" onClick={onClose} aria-label="Close">
        &times;
      </button>

      {open.kind === "slides" ? (
        <>
          <p className="pg-lb-title" onClick={(e) => e.stopPropagation()}>
            <b>{open.carousel.client}</b> {open.carousel.title}
          </p>
          <button
            type="button"
            className="pg-nav pg-prev"
            aria-label="Previous slide"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            &larr;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={open.carousel.slides[open.index].src}
            className="pg-lb-img"
            src={open.carousel.slides[open.index].src}
            alt={`${open.carousel.title}, slide ${open.index + 1}`}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
          <button
            type="button"
            className="pg-nav pg-next"
            aria-label="Next slide"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            &rarr;
          </button>
          <div className="pg-dots" onClick={(e) => e.stopPropagation()}>
            <span className="pg-counter">
              {open.index + 1} / {open.carousel.slides.length}
            </span>
            {open.carousel.slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Slide ${i + 1}`}
                className={i === open.index ? "is-on" : undefined}
                onClick={() => setOpen({ ...open, index: i })}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="pg-lb-title" onClick={(e) => e.stopPropagation()}>
            <b>{open.clip.title}</b>
          </p>
          <video
            className="pg-lb-video"
            src={open.clip.src}
            poster={open.clip.poster}
            controls
            autoPlay
            loop
            playsInline
            onClick={(e) => e.stopPropagation()}
            style={{ aspectRatio: `${open.clip.w} / ${open.clip.h}` }}
          />
        </>
      )}
    </div>
  );
}
