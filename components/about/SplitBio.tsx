"use client";

import { motion } from "framer-motion";

export default function SplitBio() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:gap-20">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-5xl uppercase text-brand-white md:text-7xl">
          About <span className="text-brand-accent">Us</span>
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="font-body text-lg leading-relaxed text-brand-white/80">
          We are a creative studio specializing in brand identity, web design,
          and motion graphics. Our approach combines strategic thinking with bold
          aesthetics to create memorable digital experiences.
        </p>
        <p className="mt-6 font-body text-lg leading-relaxed text-brand-white/80">
          Founded with the belief that great design should push boundaries, we
          work with ambitious brands to craft visual stories that leave lasting
          impressions.
        </p>
      </motion.div>
    </section>
  );
}
