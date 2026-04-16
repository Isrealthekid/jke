"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { PLACEHOLDER_IMAGES } from "@/data/projects";

const tiers = [
  {
    name: "Essential",
    icon: "✦",
    tagline: "Perfect for individuals & startups",
    image: PLACEHOLDER_IMAGES[0],
    backColor: "#0d1117",
    includes: [
      "Social media content (10 posts/month)",
      "Basic video editing (1 project)",
      "Content calendar",
      "Monthly analytics report",
    ],
    cta: "Let's talk pricing",
    ctaHref: "/contact",
  },
  {
    name: "Professional",
    icon: "◉",
    tagline: "For growing brands",
    image: PLACEHOLDER_IMAGES[1],
    backColor: "#110d17",
    featured: true,
    includes: [
      "Full social media management",
      "Video production (3 projects/month)",
      "Content strategy & calendars",
      "Community management",
      "Analytics & reporting",
      "Priority turnaround",
    ],
    cta: "Most popular — Let's talk",
    ctaHref: "/contact",
  },
  {
    name: "Studio",
    icon: "⬡",
    tagline: "Full production partnership",
    image: PLACEHOLDER_IMAGES[2],
    backColor: "#0d1710",
    includes: [
      "Everything in Professional",
      "Film / documentary production",
      "Brand campaign direction",
      "Dedicated creative partner",
      "Quarterly strategy sessions",
      "Unlimited revisions",
    ],
    cta: "Book a call",
    ctaHref: "/contact",
  },
];

export default function PricingCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const cards = sticky.querySelectorAll<HTMLElement>(".pricing-card");
      if (cards.length !== 3) return;

      const positions = [
        { x: -300, y: 0 },
        { x: 0, y: -30 },
        { x: 300, y: 0 },
      ];

      // Timeline 1: Movement
      const tl1 = gsap.timeline({ paused: true });

      cards.forEach((card, i) => {
        tl1.fromTo(
          card,
          { y: -400, x: positions[i].x, opacity: 0, scale: 0.85 },
          {
            y: positions[i].y,
            x: positions[i].x,
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: "power3.out",
          },
          i * 0.03
        );
      });

      cards.forEach((card) => {
        tl1.to(
          card,
          {
            y: "+=80",
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.in",
          },
          0.55
        );
      });

      // Timeline 2: Flip
      const tl2 = gsap.timeline({ paused: true });

      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>(".pricing-inner");
        if (!inner) return;
        tl2.to(
          inner,
          { rotateY: 180, duration: 0.4, ease: "power3.out" },
          i * 0.1
        );
      });

      // ScrollTrigger
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: sticky,
          scrub: 1,
          start: "top top",
          end: "+=400%",
          onUpdate: (self) => {
            const p = self.progress;
            tl1.progress(p);
            const flipProgress = Math.max(0, Math.min(1, (p - 0.3) / 0.25));
            tl2.progress(flipProgress);
          },
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} style={{ height: "400vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="pricing-card"
            style={{
              position: "absolute",
              width: 280,
              height: 380,
              perspective: 1000,
              opacity: 0,
            }}
          >
            <div
              className="pricing-inner"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
              }}
            >
              {/* FRONT */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  overflow: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={tier.image}
                  alt={tier.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="280px"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                  }}
                />
                {/* Featured badge */}
                {tier.featured && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      padding: "4px 10px",
                      borderRadius: 100,
                      backgroundColor: "#c8ff00",
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#0a0a0a",
                    }}
                  >
                    Popular
                  </span>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 28,
                    left: 24,
                    right: 24,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{tier.icon}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 32,
                      color: "#f5f4f0",
                      margin: "8px 0 0",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(245,244,240,0.6)",
                      marginTop: 4,
                    }}
                  >
                    {tier.tagline}
                  </p>
                </div>
              </div>

              {/* BACK */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: tier.backColor,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    color: "#f5f4f0",
                    margin: 0,
                  }}
                >
                  {tier.name}
                </h3>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "20px 0",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "rgba(245,244,240,0.65)",
                        paddingLeft: 12,
                        borderLeft: "2px solid rgba(200,255,0,0.3)",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaHref}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 0",
                    borderRadius: 100,
                    backgroundColor: "#c8ff00",
                    color: "#0a0a0a",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {tier.cta} &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
