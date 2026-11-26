"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMenu } from "./MenuContext";
import { menuItems, type MenuItem } from "@/data/menuPreviews";
import portrait from "@/app/images/joy2.webp";

const LINK_SIZE = "clamp(26px, min(5.4vw, calc((100dvh - 260px) / 6)), 72px)";

/* ------------------------------------------------------------------ */
/*  Animation constants                                                */
/* ------------------------------------------------------------------ */
const EASE = [0.76, 0, 0.24, 1] as const;
const PANEL_DURATION = 0.7;
const LINK_STAGGER = 0.08; // 80ms

/* ------------------------------------------------------------------ */
/*  Panel variants (clip-path from top)                                */
/* ------------------------------------------------------------------ */
const panelVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: PANEL_DURATION, ease: EASE, when: "afterChildren" },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: PANEL_DURATION, ease: EASE, when: "beforeChildren" },
  },
};

/* ------------------------------------------------------------------ */
/*  Nav link container (staggers children)                             */
/* ------------------------------------------------------------------ */
const linksContainerVariants = {
  closed: {
    transition: {
      staggerChildren: LINK_STAGGER,
      staggerDirection: -1, // reverse on close
    },
  },
  open: {
    transition: {
      staggerChildren: LINK_STAGGER,
      delayChildren: 0.25,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Individual link                                                    */
/* ------------------------------------------------------------------ */
const linkVariants = {
  closed: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.35, ease: EASE },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Bottom row                                                         */
/* ------------------------------------------------------------------ */
const bottomVariants = {
  closed: { opacity: 0, y: 20, transition: { duration: 0.25 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function FullscreenMenu() {
  const { isMenuOpen, closeMenu } = useMenu();
  const [hovered, setHovered] = useState<MenuItem | null>(null);
  const [worksOpen, setWorksOpen] = useState(false);
  const lastPointer = useRef("");
  const currentYear = new Date().getFullYear();

  // Start with the dropdown closed each time the menu opens.
  useEffect(() => {
    if (!isMenuOpen) {
      setWorksOpen(false);
      setHovered(null);
    }
  }, [isMenuOpen]);

  return (
    <AnimatePresence mode="wait">
      {isMenuOpen && (
        <motion.div
          key="fullscreen-menu"
          variants={panelVariants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{
            position: "fixed",
            inset: 0,
            height: "100dvh",
            zIndex: 9997,
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            paddingTop: 64,
            overflow: "hidden",
            overscrollBehavior: "none",
          }}
        >
          {/* ---- Main content area ---- */}
          <div
            style={{
              flex: 1,
              display: "flex",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Left column — nav links (60% desktop, 100% mobile) */}
            <motion.nav
              variants={linksContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="w-full md:w-[60%]"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                minHeight: 0,
                paddingLeft: "clamp(24px, 5vw, 48px)",
                paddingRight: 24,
                paddingTop: "clamp(8px, 2vh, 20px)",
                paddingBottom: "clamp(8px, 2vh, 20px)",
                gap: 0,
              }}
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={linkVariants}
                  onPointerLeave={(e) => {
                    if (item.children && e.pointerType === "mouse") setWorksOpen(false);
                  }}
                >
                  {item.children ? (
                    <>
                      {/* Dropdown parent: opens its sub-links */}
                      <button
                        type="button"
                        aria-expanded={worksOpen}
                        onPointerDown={(e) => {
                          lastPointer.current = e.pointerType;
                        }}
                        onClick={() => {
                          // A mouse click keeps it open (hover already opened it); touch and
                          // keyboard presses toggle it.
                          if (lastPointer.current === "mouse") setWorksOpen(true);
                          else setWorksOpen((o) => !o);
                          lastPointer.current = "";
                        }}
                        // Hovering with a mouse opens it. A touch tap must not (the tap's own click
                        // toggles it, so opening on touch-hover too would open and then re-close it).
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse") {
                            setHovered(item);
                            setWorksOpen(true);
                          }
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === "mouse") setHovered(null);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35em",
                          position: "relative",
                          fontFamily: "var(--font-display)",
                          fontSize: LINK_SIZE,
                          lineHeight: 1,
                          color: "#f5f4f0",
                          background: "none",
                          border: "none",
                          padding: "0 0 2px",
                          cursor: "none",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ position: "relative", display: "inline-block" }}>
                          {item.label}
                          <motion.span
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: 2,
                              backgroundColor: "#FF7A00",
                              originX: 0,
                              scaleX: 0,
                            }}
                            animate={{ scaleX: hovered === item || worksOpen ? 1 : 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                          />
                        </span>
                        <motion.span
                          aria-hidden="true"
                          animate={{ rotate: worksOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          style={{ fontSize: "0.4em", color: "#FF7A00", display: "inline-block" }}
                        >
                          &#9660;
                        </motion.span>
                      </button>

                      {/* Sub-links */}
                      <AnimatePresence initial={false}>
                        {worksOpen && (
                          <motion.div
                            key="works-children"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 10,
                                padding: "14px 0 6px",
                              }}
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href ?? "/"}
                                  onClick={closeMenu}
                                  onMouseEnter={() => setHovered(child)}
                                  onMouseLeave={() => setHovered(null)}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 600,
                                    fontSize: "clamp(14px, 1.5vw, 18px)",
                                    padding: "10px 22px",
                                    borderRadius: 999,
                                    border: "1.5px solid",
                                    borderColor: hovered === child ? "#FF7A00" : "rgba(245,244,240,0.35)",
                                    background: hovered === child ? "#FF7A00" : "transparent",
                                    color: hovered === child ? "#000" : "#f5f4f0",
                                    textDecoration: "none",
                                    transition: "all 0.25s ease",
                                  }}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href ?? "/"}
                      {...(item.href?.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={closeMenu}
                      onMouseEnter={() => setHovered(item)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        display: "block",
                        position: "relative",
                        fontFamily: "var(--font-display)",
                        fontSize: LINK_SIZE,
                        lineHeight: 1,
                        color: "#f5f4f0",
                        textDecoration: "none",
                        paddingBottom: 2,
                      }}
                    >
                      <span style={{ position: "relative", display: "inline-block" }}>
                        {item.label}
                        <motion.span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            backgroundColor: "#FF7A00",
                            originX: 0,
                            scaleX: 0,
                          }}
                          animate={{ scaleX: hovered === item ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        />
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            {/* Right column: a preview made from your own work (desktop only) */}
            <div
              className="hidden md:flex"
              style={{
                width: "40%",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                {hovered && (
                  <motion.div
                    key={hovered.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{
                      position: "absolute",
                      inset: 48,
                      borderRadius: 20,
                      overflow: "hidden",
                    }}
                  >
                    <PreviewPanel item={hovered} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ---- Bottom row ---- */}
          <motion.div
            variants={bottomVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              padding: "24px clamp(20px, 5vw, 48px)",
              borderTop: "1px solid rgba(245,244,240,0.08)",
            }}
          >
            {/* Left — Location & year */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#f5f4f0",
                opacity: 0.5,
                textTransform: "uppercase",
              }}
            >
              Lagos, Nigeria &mdash; {currentYear}
            </span>

            {/* Centre — availability */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "#f5f4f0",
                  opacity: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Open for projects
              </span>
            </div>

            {/* Right — Social links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              {[
                { label: "Instagram", href: "https://www.instagram.com/joie.egbuson/" },
                { label: "YouTube", href: "https://www.youtube.com/@thejoietv" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/joykarenate-egbuson/" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "#f5f4f0",
                    opacity: 0.5,
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.5";
                  }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/* ------------------------------------------------------------------ */
/*  Preview panel (what shows on the right when you hover a link)      */
/* ------------------------------------------------------------------ */
function Caption({ item, ink = "#ffffff" }: { item: MenuItem; ink?: string }) {
  const p = item.preview;
  return (
    <div style={{ color: ink }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.05 }}>
        {p.title ?? item.label}
      </div>
      {p.blurb && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, marginTop: 8, opacity: 0.75 }}>
          {p.blurb}
        </div>
      )}
    </div>
  );
}

const O = "#FF7A00", P = "#C6249B", Y = "#FFD34A", W = "#f5f4f0", D = "#2a2a2a";
type ClipTile = [string, string, string?];
const CLIP_SETS: Record<string, ClipTile[]> = {
  Home: [[O,"span 2","Editing"],[P,"span 1"],[Y,"span 1","Film"],[W,"span 1"],[O,"span 1"],[P,"span 2","The Joie TV"],[Y,"span 2","Lagos"],[D,"span 1"],[O,"span 1"]],
  Services: [[P,"span 1"],[O,"span 2","Creative Direction"],[W,"span 1"],[Y,"span 2","Concept & Vision"],[D,"span 1"],[P,"span 1","Mood Boards"],[O,"span 1"],[Y,"span 1"],[P,"span 2","Direction on Set"]],
  "My Works": [[Y,"span 1"],[P,"span 1"],[O,"span 2","Portfolio"],[O,"span 1"],[D,"span 2"],[W,"span 1"],[P,"span 2","Playground"],[Y,"span 1"],[O,"span 1"]],
  Portfolio: [[Y,"span 1"],[P,"span 1","Film"],[O,"span 2","Video Edits"],[O,"span 1"],[D,"span 2","Edits"],[W,"span 1"],[P,"span 2"],[Y,"span 1"],[O,"span 1"]],
  Playground: [[O,"span 1"],[Y,"span 2","Experiments"],[P,"span 1"],[P,"span 2","Extras"],[W,"span 1"],[O,"span 1"],[D,"span 1"],[O,"span 2","Tests"],[Y,"span 1"]],
  Films: [[D,"span 1"],[O,"span 1"],[P,"span 2","Resonance"],[Y,"span 2","I Love You"],[W,"span 1"],[O,"span 1","Knock Knock"],[P,"span 1"],[Y,"span 1"],[O,"span 2","Wake Up, Eat, Sleep, Repeat"]],
  Contact: [[W,"span 2","Say hello"],[Y,"span 1"],[P,"span 1","Email"],[O,"span 1"],[D,"span 1"],[Y,"span 2","WhatsApp"],[P,"span 2","Instagram"],[O,"span 1"],[W,"span 1"]],
};

function PreviewPanel({ item }: { item: MenuItem }) {
  const p = item.preview;
  const tiles = (CLIP_SETS[item.label] ?? CLIP_SETS.Home).map(([bg, span, label]) => ({ bg, span, label }));

  if (p.kind === "monitor") {
    // A miniature of the loader's Premiere-style program monitor.
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#FF7A00",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 28,
        }}
      >
        <div
          style={{
            background: "#1f1f1f",
            border: "2px solid #3b3b3b",
            borderRadius: 18,
            padding: 12,
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 12,
              color: "#cfcfcf",
              padding: "2px 4px 10px",
            }}
          >
            Program: The Joie TV
          </div>
          <div
            style={{
              background: "#000",
              borderRadius: 6,
              aspectRatio: "16 / 10",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                lineHeight: 1,
                color: "#fff",
              }}
            >
              The Joie TV
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 9,
                letterSpacing: "0.22em",
                color: "#fff",
              }}
            >
              EDITING · FILM
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 4px 2px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            <span style={{ color: "#FF7A00", fontVariantNumeric: "tabular-nums" }}>00:00:01:00</span>
            <span style={{ color: "#d8d8d8", letterSpacing: 4 }}>&#9664;&#9646; &#9654; &#9646;&#9654;</span>
            <span style={{ color: "#9a9a9a" }}>Fit</span>
          </div>
        </div>
        <Caption item={item} ink="#ffffff" />
      </div>
    );
  }

  if (p.kind === "clips") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 24,
          gap: 18,
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "1fr",
            gap: 10,
          }}
        >
          {tiles.map((t, i) => (
            <div
              key={i}
              className="keep-colors"
              style={{
                gridColumn: t.span,
                background: t.bg,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {t.label ? (
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    lineHeight: 1.05,
                    textAlign: "center",
                    padding: "0 10px",
                    color: t.bg === "#f5f4f0" || t.bg === "#FFD34A" ? "#000" : "#fff",
                  }}
                >
                  {t.label}
                </span>
              ) : (
              <span
                aria-hidden="true"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: `13px solid ${t.bg === "#f5f4f0" || t.bg === "#FFD34A" ? "#000" : "#fff"}`,
                  opacity: 0.85,
                }}
              />
              )}
            </div>
          ))}
        </div>
        <Caption item={item} />
      </div>
    );
  }

  if (p.kind === "card") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: p.color ?? "#FF7A00",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 28,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" style={{ width: "min(70%, 300px)", height: "auto" }} />
        <Caption item={item} ink={p.ink} />
      </div>
    );
  }

  if (p.kind === "portrait") {
    return (
      <>
        <Image
          src={portrait}
          alt=""
          fill
          sizes="40vw"
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 55%)",
          }}
        />
        <div style={{ position: "absolute", left: 28, right: 28, bottom: 26 }}>
          <Caption item={item} />
        </div>
      </>
    );
  }

  if (p.kind === "posters") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          padding: 28,
        }}
      >
        <span className="poster-stack" aria-hidden="true">
          {(p.images ?? []).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" className={`poster poster-${i}`} />
          ))}
        </span>
        <Caption item={item} />
      </div>
    );
  }

  // stills: a grid of frames from your projects
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 24,
        gap: 18,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          alignContent: "start",
        }}
      >
        {(p.images ?? []).slice(0, 4).map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 12 }}
          />
        ))}
      </div>
      <Caption item={item} />
    </div>
  );
}
