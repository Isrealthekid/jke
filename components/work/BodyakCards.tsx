"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface BodyakCard {
  title: string;
  description: string;
}

const cards: BodyakCard[] = [
  { title: "Strategy", description: "Research-driven approach to every project." },
  { title: "Design", description: "Pixel-perfect craft with bold aesthetics." },
  { title: "Development", description: "Clean code, smooth interactions." },
  { title: "Delivery", description: "On time, on budget, beyond expectations." },
];

export default function BodyakCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = containerRef.current?.querySelectorAll(".bodyak-card");
      if (!items) return;

      items.forEach((item, i) => {
        gsap.from(item, {
          rotateX: 15,
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          delay: i * 0.1,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bodyak-card border border-brand-white/10 p-8 transition-colors hover:border-brand-accent"
        >
          <h3 className="font-display text-2xl text-brand-accent">{card.title}</h3>
          <p className="mt-3 font-body text-sm text-brand-white/60">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
