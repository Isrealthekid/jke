"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef } from "react";
import { useMenu } from "./MenuContext";
import FullscreenMenu from "./FullscreenMenu";

/* ------------------------------------------------------------------ */
/*  Page-name map                                                      */
/* ------------------------------------------------------------------ */
const pageNames: Record<string, string> = {
  "/": "Home",
  "/work": "Work",
  "/about": "About",
  "/services": "Services",
  "/contact": "Contact",
};

/* ------------------------------------------------------------------ */
/*  Hamburger line variants (framer-motion)                            */
/* ------------------------------------------------------------------ */
const topLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};

const middleLine = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

const lineTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const { isMenuOpen, toggleMenu } = useMenu();
  const pathname = usePathname();

  /* --- scroll tracking ------------------------------------------- */
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false); // past 80px
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    lastScrollY.current = latest;

    // backdrop trigger
    setHasScrolled(latest > 80);

    // hide / reveal
    if (latest > 200 && latest > previous) {
      setHidden(true); // scrolling DOWN past 200
    } else if (latest < previous) {
      setHidden(false); // scrolling UP
    }
  });

  /* --- derive page name ------------------------------------------ */
  const currentPage =
    pageNames[pathname] ??
    (pathname.startsWith("/work/") ? "Project" : "Page");

  return (
    <>
      <motion.header
        animate={{ y: hidden && !isMenuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9998,
          height: 64,
        }}
      >
        {/* Backdrop — fades in after 80px scroll */}
        <motion.div
          animate={{ opacity: hasScrolled && !isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,10,10,0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            pointerEvents: "none",
          }}
        />

        <nav
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            padding: "0 32px",
          }}
        >
          {/* ---- Left: Logo ---- */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              color: "#f5f4f0",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            JK
          </Link>

          {/* ---- Right cluster ---- */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {/* Current page label */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontVariant: "all-small-caps",
                letterSpacing: "0.1em",
                color: "#f5f4f0",
                opacity: 0.4,
              }}
            >
              {currentPage}
            </span>

            {/* Availability dot — desktop only */}
            <div
              className="hidden md:flex"
              style={{
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
                  opacity: 0.4,
                  fontVariant: "all-small-caps",
                }}
              >
                Available
              </span>
            </div>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 32,
                height: 32,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "none",
              }}
            >
              <motion.span
                variants={topLine}
                animate={isMenuOpen ? "open" : "closed"}
                transition={lineTransition}
                style={{
                  display: "block",
                  width: 28,
                  height: 1.5,
                  backgroundColor: "#f5f4f0",
                  transformOrigin: "center center",
                }}
              />
              <motion.span
                variants={middleLine}
                animate={isMenuOpen ? "open" : "closed"}
                transition={lineTransition}
                style={{
                  display: "block",
                  width: 28,
                  height: 1.5,
                  backgroundColor: "#f5f4f0",
                  marginTop: 5,
                  transformOrigin: "center center",
                }}
              />
              <motion.span
                variants={bottomLine}
                animate={isMenuOpen ? "open" : "closed"}
                transition={lineTransition}
                style={{
                  display: "block",
                  width: 28,
                  height: 1.5,
                  backgroundColor: "#f5f4f0",
                  marginTop: 5,
                  transformOrigin: "center center",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Pulsing dot keyframes */}
        <style jsx global>{`
          @keyframes pulse-dot {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.4;
              transform: scale(0.75);
            }
          }
        `}</style>
      </motion.header>

      <FullscreenMenu />
    </>
  );
}
