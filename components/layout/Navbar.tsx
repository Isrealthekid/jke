"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import { useMenu } from "./MenuContext";
import FullscreenMenu from "./FullscreenMenu";

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

  /* --- scroll tracking ------------------------------------------- */
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false); // past 80px

  // The bar stays on screen at all times (so the "Work with me" button is always reachable).
  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 80); // backdrop trigger
  });

  return (
    <>
      <motion.header
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
            background: "rgba(0,0,0,0.7)",
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
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          {/* ---- Left: Logo ---- */}
          <Link
            href="/"
            aria-label="The Joie TV — home"
            style={{ display: "block", lineHeight: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="The Joie TV"
              className="site-logo logo-on-dark"
              style={{ height: 38, width: "auto", display: "block" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dark.png"
              alt=""
              aria-hidden="true"
              className="site-logo logo-on-light"
              style={{ height: 38, width: "auto", display: "none" }}
            />
          </Link>

          {/* ---- Right cluster ---- */}
          <div
            className="gap-4 md:gap-6"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Always-on call to action (with the availability dot) */}
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 36,
                padding: "0 16px",
                borderRadius: 999,
                backgroundColor: "#f5f4f0",
                color: "#000000",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              Work with me
            </Link>

            {/* Floating menu pill */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                height: 36,
                padding: "0 14px",
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#f5f4f0",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
                cursor: "none",
              }}
            >
              <span>{isMenuOpen ? "Close" : "Menu"}</span>
              <span
                aria-hidden="true"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
              <motion.span
                variants={topLine}
                animate={isMenuOpen ? "open" : "closed"}
                transition={lineTransition}
                style={{
                  display: "block",
                  width: 18,
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
                  width: 18,
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
                  width: 18,
                  height: 1.5,
                  backgroundColor: "#f5f4f0",
                  marginTop: 5,
                  transformOrigin: "center center",
                }}
              />
              </span>
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
