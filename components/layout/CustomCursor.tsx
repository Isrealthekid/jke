"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Store quickTo setters in a ref so we create them once
  const quickTo = useRef<{
    dotX: gsap.QuickToFunc;
    dotY: gsap.QuickToFunc;
    ringX: gsap.QuickToFunc;
    ringY: gsap.QuickToFunc;
  } | null>(null);

  const applyHoverListeners = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // --- pointer targets: <a>, <button>, [data-cursor="pointer"] ---
    const pointerTargets = document.querySelectorAll(
      'a, button, [data-cursor="pointer"]'
    );

    const onPointerEnter = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.8, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.35, ease: "power3.out" });
    };

    const onPointerLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.4, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: "power3.out" });
      label.textContent = "";
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    pointerTargets.forEach((el) => {
      el.addEventListener("mouseenter", onPointerEnter);
      el.addEventListener("mouseleave", onPointerLeave);
    });

    // --- view targets: <img>, [data-cursor="view"] ---
    const viewTargets = document.querySelectorAll(
      'img, [data-cursor="view"]'
    );

    const onViewEnter = () => {
      gsap.to(ring, { scale: 4, opacity: 0.8, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.35, ease: "power3.out" });
      label.textContent = "View";
      gsap.to(label, { opacity: 1, duration: 0.2 });
    };

    const onViewLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.4, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: "power3.out" });
      label.textContent = "";
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    viewTargets.forEach((el) => {
      el.addEventListener("mouseenter", onViewEnter);
      el.addEventListener("mouseleave", onViewLeave);
    });

    return () => {
      pointerTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onPointerEnter);
        el.removeEventListener("mouseleave", onPointerLeave);
      });
      viewTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onViewEnter);
        el.removeEventListener("mouseleave", onViewLeave);
      });
    };
  }, []);

  useEffect(() => {
    // Hide cursor on touch devices
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursor elements (hidden by default via CSS for coarse pointers)
    dot.style.display = "block";
    ring.style.display = "block";

    // Hide the native cursor on body
    document.body.style.cursor = "none";

    // Create quickTo instances — these give ultra-smooth lag
    quickTo.current = {
      dotX: gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" }),
      dotY: gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" }),
      ringX: gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" }),
      ringY: gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" }),
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!quickTo.current) return;
      quickTo.current.dotX(e.clientX);
      quickTo.current.dotY(e.clientY);
      quickTo.current.ringX(e.clientX);
      quickTo.current.ringY(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Apply hover listeners and get cleanup fn
    let cleanupHover = applyHoverListeners();

    // Re-bind hover listeners when DOM changes (page transitions)
    // Debounce to avoid firing hundreds of times during GSAP animations
    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        cleanupHover?.();
        cleanupHover = applyHoverListeners();
      }, 300);
    });
    observer.observe(document.body, { childList: true, subtree: false });

    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener("mousemove", onMouseMove);
      cleanupHover?.();
      observer.disconnect();
      document.body.style.cursor = "";
    };
  }, [applyHoverListeners]);

  return (
    <>
      {/* Dot — 8px filled white circle */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#fff",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          display: "none",
        }}
      />

      {/* Ring — 36px white border circle */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid #fff",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          ref={labelRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#fff",
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        />
      </div>
    </>
  );
}
