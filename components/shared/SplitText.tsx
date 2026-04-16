"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface SplitTextProps {
  text: string;
  type?: "words" | "chars" | "lines";
  animation?: "slideUp" | "fadeIn" | "clipReveal";
  stagger?: number;
  delay?: number;
  scrub?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function SplitText({
  text,
  type = "words",
  animation = "clipReveal",
  stagger = 0.05,
  delay = 0,
  scrub = false,
  className = "",
  as: Tag = "div",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Split text into units
  const units =
    type === "chars"
      ? text.split("")
      : type === "lines"
        ? text.split("\n")
        : text.split(" ");

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const inners = container.querySelectorAll(".st-inner");

      const animProps = getAnimationProps(animation);

      if (scrub) {
        // Scroll-driven
        inners.forEach((inner, i) => {
          gsap.fromTo(inner, animProps.from, {
            ...animProps.to,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${i * 10}px 70%`,
              end: () => `top+=${i * 10 + 50}px 70%`,
              scrub: 0.5,
            },
          });
        });
      } else {
        // One-shot triggered on viewport enter
        gsap.fromTo(inners, animProps.from, {
          ...animProps.to,
          stagger,
          delay,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: type === "chars" ? 0 : "0 0.28em",
        margin: 0,
      }}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          style={{
            overflow: "hidden",
            display: "inline-block",
          }}
        >
          <span
            className="st-inner"
            style={{
              display: "inline-block",
              willChange: "transform",
            }}
          >
            {unit === " " ? "\u00A0" : unit}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function getAnimationProps(animation: string) {
  switch (animation) {
    case "slideUp":
      return {
        from: { y: "100%", opacity: 0 },
        to: { y: "0%", opacity: 1 },
      };
    case "fadeIn":
      return {
        from: { opacity: 0 },
        to: { opacity: 1 },
      };
    case "clipReveal":
    default:
      return {
        from: { yPercent: 100 },
        to: { yPercent: 0 },
      };
  }
}
