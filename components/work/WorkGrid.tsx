"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { useIsMobile } from "@/lib/useIsMobile";
import FilterBar from "./FilterBar";

/* ================================================================== */
/*  Work tile with 3D tilt + hover title bar                           */
/* ================================================================== */
function WorkTile({
  project,
  index,
  isWide,
}: {
  project: (typeof projects)[number];
  index: number;
  isWide: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rotateXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotateYTo = useRef<gsap.QuickToFunc | null>(null);

  const initCard = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    cardRef.current = el;
    rotateXTo.current = gsap.quickTo(el, "rotateX", {
      duration: 0.4,
      ease: "power2.out",
    });
    rotateYTo.current = gsap.quickTo(el, "rotateY", {
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || !rotateXTo.current || !rotateYTo.current) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYTo.current(x * 12);
    rotateXTo.current(-y * 12);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (imgRef.current)
      gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
    if (barRef.current)
      gsap.to(barRef.current, { y: "0%", duration: 0.4, ease: "power3.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rotateXTo.current) rotateXTo.current(0);
    if (rotateYTo.current) rotateYTo.current(0);
    if (imgRef.current)
      gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
    if (barRef.current)
      gsap.to(barRef.current, { y: "100%", duration: 0.3, ease: "power2.in" });
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        gridColumn: isWide ? "span 8" : "span 4",
        perspective: 1000,
      }}
      className="max-md:!col-span-1"
    >
      <div
        ref={initCard}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
          borderRadius: 4,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className={isWide ? "md:!aspect-[16/9]" : "md:!aspect-[3/4]"}
      >
        <Link
          href={`/work/${project.slug}`}
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          {/* Number overlay */}
          <span
            style={{
              position: "absolute",
              top: 16,
              left: 20,
              fontFamily: "var(--font-display)",
              fontSize: 80,
              color: "#f5f4f0",
              opacity: 0.12,
              lineHeight: 1,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            {num}
          </span>

          {/* Image */}
          <div
            ref={imgRef}
            style={{
              position: "absolute",
              inset: 0,
              willChange: "transform",
            }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              sizes={isWide ? "66vw" : "33vw"}
            />
          </div>

          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
          />

          {/* Mobile: always-visible title */}
          <div
            className="md:hidden"
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              zIndex: 3,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                color: "#f5f4f0",
                margin: 0,
              }}
            >
              {project.title}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "rgba(245,244,240,0.5)",
              }}
            >
              {project.role} &middot; {project.year}
            </span>
          </div>

          {/* Desktop: hover title bar slides up */}
          <div
            ref={barRef}
            className="hidden md:flex"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              transform: "translateY(100%)",
              background: "rgba(10,10,10,0.85)",
              backdropFilter: "blur(8px)",
              padding: "16px 24px",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 3,
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  color: "#f5f4f0",
                  margin: 0,
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "rgba(245,244,240,0.5)",
                }}
              >
                {project.role} &middot; {project.year}
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "#c8ff00",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              View &rarr;
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  WorkGrid                                                           */
/* ================================================================== */
export default function WorkGrid() {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Film",
    "Video Edit",
    "Social Content",
  ];

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      <FilterBar
        categories={categories}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(12, 1fr)",
          gap: isMobile ? 20 : 16,
          marginTop: 32,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            // Alternating: row 0 = wide+narrow, row 1 = narrow+wide, ...
            const row = Math.floor(i / 2);
            const isFirst = i % 2 === 0;
            const isWide = row % 2 === 0 ? isFirst : !isFirst;

            return (
              <WorkTile
                key={project.slug}
                project={project}
                index={i}
                isWide={isWide}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
