"use client";

import { useState } from "react";
import Link from "next/link";

interface Card {
  num: string;
  title: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  cta: string;
  bg: string;
  ink: string;
}

const cards: Card[] = [
  {
    num: "01",
    title: "Creative Direction",
    description:
      "Concept, look and feel — a clear creative vision that ties every piece of your work together.",
    deliverables: [
      "Creative concept & vision",
      "Brand look & feel",
      "Mood boards & references",
      "Scripts & storyboards",
      "Direction on set",
      "Campaign creative oversight",
    ],
    turnaround: "Per project or ongoing retainer",
    cta: "Let's talk pricing",
    bg: "#FF7A00",
    ink: "#000000",
  },
  {
    num: "02",
    title: "Video Production & Editing",
    description:
      "From commercial spots to event recaps — polished video that commands attention.",
    deliverables: [
      "Commercial videos",
      "Music videos",
      "Event highlight reels",
      "Corporate videos",
      "YouTube content",
      "Short-form (Reels/TikTok)",
    ],
    turnaround: "5–14 days per project",
    cta: "Most popular — Let's talk",
    bg: "#C6249B",
    ink: "#ffffff",
  },
  {
    num: "03",
    title: "Filmmaking & Documentary",
    description:
      "Narrative-driven films and documentaries — concept to final cut.",
    deliverables: [
      "Short films",
      "Brand documentaries",
      "Portrait films",
      "Concept development",
      "Direction",
      "Post-production",
    ],
    turnaround: "Project-based, discuss timeline",
    cta: "Book a call",
    bg: "#FFD34A",
    ink: "#000000",
  },
];

/**
 * Three medium cards in one row. Hovering a card (or tapping it on a phone) turns it over to show
 * what's included and a button to the contact page.
 */
export default function ServiceCards() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <div className="svc-cards">
      {cards.map((c) => (
        <div
          key={c.num}
          className={`svc-card${flipped === c.num ? " is-flipped" : ""}`}
          onClick={(e) => {
            // Taps flip on touch screens; links inside still work.
            if ((e.target as HTMLElement).closest("a")) return;
            setFlipped((f) => (f === c.num ? null : c.num));
          }}
        >
          <div className="svc-card-inner">
            {/* Front */}
            <div className="svc-face svc-front" style={{ background: c.bg, color: c.ink }}>
              <span className="svc-num">{c.num}</span>
              <div>
                <h3 className="svc-title">{c.title}</h3>
                <p className="svc-desc">{c.description}</p>
              </div>
            </div>

            {/* Back */}
            <div className="svc-face svc-back">
              <h3 className="svc-back-title" style={{ color: c.bg }}>
                {c.title}
              </h3>
              <ul className="svc-list">
                {c.deliverables.map((d) => (
                  <li key={d} style={{ borderLeftColor: c.bg }}>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="svc-turn">{c.turnaround}</p>
              <Link href="/contact" className="svc-cta" style={{ background: c.bg, color: c.ink }}>
                {c.cta} &rarr;
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
