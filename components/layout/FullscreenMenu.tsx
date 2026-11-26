"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMenu } from "./MenuContext";
import { menuItems, type MenuItem } from "@/data/menuPreviews";
import portrait from "@/app/images/joy-camera.jpg";

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
                <motion.div key={item.label} variants={linkVariants}>
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
                                flexDirection: "column",
                                gap: "0.35em",
                                padding: "10px 0 6px clamp(14px, 2vw, 28px)",
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
                                    gap: 14,
                                    alignSelf: "flex-start",
                                    fontFamily: "var(--font-display)",
                                    fontSize: `calc(${LINK_SIZE} * 0.55)`,
                                    lineHeight: 1,
                                    color: hovered === child ? "#FF7A00" : "rgba(245,244,240,0.85)",
                                    textDecoration: "none",
                                    transition: "color 0.25s ease",
                                  }}
                                >
                                  <span
                                    aria-hidden="true"
                                    style={{ width: 22, height: 2, background: "#FF7A00", display: "block" }}
                                  />
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

function PreviewPanel({ item }: { item: MenuItem }) {
  const p = item.preview;

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
