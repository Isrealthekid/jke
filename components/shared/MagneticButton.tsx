"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  href,
  strength = 0.4,
  className = "",
  style,
  onClick,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = wrapperRef.current;
      const text = textRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Only activate within ~100px radius
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 100 + Math.max(rect.width, rect.height) / 2) return;

      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.3,
        ease: "power2.out",
      });

      if (text) {
        gsap.to(text, {
          x: dx * strength * 0.6,
          y: dy * strength * 0.6,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    gsap.to(wrapperRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, []);

  const inner = (
    <span
      ref={textRef}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: "inline-block", willChange: "transform", ...style }}
    >
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {inner}
        </Link>
      ) : (
        <button
          onClick={onClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "none",
            padding: 0,
          }}
        >
          {inner}
        </button>
      )}
    </div>
  );
}
