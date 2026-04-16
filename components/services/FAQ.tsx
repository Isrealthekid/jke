"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What's your typical turnaround time?",
    a: "Social media content is delivered on a monthly retainer cycle. Video projects typically take 5–14 days depending on complexity. Film and documentary projects are scoped individually — we'll discuss timelines during the proposal stage.",
  },
  {
    q: "Do you work with clients outside Lagos?",
    a: "Absolutely. While I'm based in Lagos, I work with brands across Nigeria and internationally. Remote collaboration tools make it seamless — I've delivered projects for clients in London, Accra, and New York.",
  },
  {
    q: "What does your process look like?",
    a: "It starts with a conversation. We discuss your goals, I send a proposal with scope and timeline, and once aligned we move into production. You'll get regular check-ins and review rounds throughout.",
  },
  {
    q: "Can I hire you for just one project?",
    a: "Yes. While retainers are great for ongoing social media work, video production and filmmaking are available as one-off projects. No long-term commitment required.",
  },
  {
    q: "Do you handle the full production or just editing?",
    a: "Both. I can take a project from concept to final delivery — including pre-production planning, shooting, and post. Or if you already have footage, I'm happy to handle just the edit and post-production.",
  },
  {
    q: "What equipment do you use?",
    a: "I shoot on Sony FX6, BMPCC 6K, and Sony A7IV depending on the project. Post-production in DaVinci Resolve and Premiere Pro. Motion graphics in After Effects. I believe in using the right tool for the job, not the most expensive one.",
  },
  {
    q: "How do you handle revisions?",
    a: "Every project includes revision rounds — typically 2 for standard projects, unlimited for Studio-tier clients. I believe in getting it right, not getting it fast. That said, clear briefs help us nail it on the first try.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(245,244,240,0.35)",
          display: "block",
          marginBottom: 32,
        }}
      >
        Frequently Asked Questions
      </span>

      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            style={{
              borderTop: "1px solid rgba(245,244,240,0.06)",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "20px 0",
                background: "none",
                border: "none",
                cursor: "none",
                textAlign: "left",
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  color: "#f5f4f0",
                  flex: 1,
                }}
              >
                {faq.q}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  color: "rgba(245,244,240,0.3)",
                  flexShrink: 0,
                  transition: "transform 0.3s",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(245,244,240,0.55)",
                      paddingBottom: 20,
                      maxWidth: 640,
                    }}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
