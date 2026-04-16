"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { services } from "@/data/services";

export default function ServiceTracks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tracks = containerRef.current?.querySelectorAll(".service-track");
      if (!tracks) return;

      tracks.forEach((track) => {
        gsap.from(track, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: "top 85%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-0">
      {services.map((service, i) => (
        <div
          key={service.id}
          className="service-track group border-t border-brand-white/10 py-12 transition-colors hover:border-brand-accent"
        >
          <div className="flex items-start justify-between gap-8">
            <div>
              <span className="font-body text-sm text-brand-white/30">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-4xl text-brand-white transition-colors group-hover:text-brand-accent md:text-5xl">
                {service.title}
              </h3>
              <p className="mt-3 max-w-md font-body text-brand-white/60">
                {service.description}
              </p>
            </div>
            <ul className="hidden space-y-2 md:block">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="font-body text-sm text-brand-white/40"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
