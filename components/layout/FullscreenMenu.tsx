"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMenu } from "./MenuContext";
import { menuPreviews } from "@/data/menuPreviews";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

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
            zIndex: 9997,
            backgroundColor: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
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
            {/* Left column — nav links (60%) */}
            <motion.nav
              variants={linksContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: 48,
                paddingRight: 24,
                gap: 4,
              }}
            >
              {menuPreviews.map((link, i) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      display: "block",
                      position: "relative",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(52px, 8vw, 100px)",
                      lineHeight: 1.1,
                      color: "#f5f4f0",
                      textDecoration: "none",
                      paddingBottom: 8,
                    }}
                  >
                    {/* Link text */}
                    <span style={{ position: "relative", display: "inline-block" }}>
                      {link.label}

                      {/* Hover underline — scaleX 0→1 */}
                      <motion.span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          backgroundColor: "#c8ff00",
                          originX: 0,
                          scaleX: 0,
                        }}
                        animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Right column — preview image (40%) */}
            <div
              style={{
                width: "40%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                {hoveredIndex !== null && (
                  <motion.div
                    key={hoveredIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{
                      position: "absolute",
                      inset: 48,
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={menuPreviews[hoveredIndex].image}
                      alt={menuPreviews[hoveredIndex].label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="40vw"
                    />
                    {/* Gradient overlay for readability */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(10,10,10,0.6), transparent)",
                      }}
                    />
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
              padding: "24px 48px",
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
                { label: "Instagram", href: "https://instagram.com" },
                { label: "TikTok", href: "https://tiktok.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
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
