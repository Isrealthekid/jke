"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const chars = containerRef.current.querySelectorAll(".char");
      gsap.from(chars, {
        y: 40,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {children.split("").map((char, i) => (
        <span key={i} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
