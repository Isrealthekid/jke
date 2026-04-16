"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2020", label: "Founded" },
  { value: "12", label: "Team Members" },
  { value: "50+", label: "Projects" },
  { value: "100%", label: "Passion" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="border border-brand-white/10 p-8 text-center"
        >
          <span className="font-display text-4xl text-brand-accent">
            {stat.value}
          </span>
          <p className="mt-2 font-body text-xs uppercase tracking-widest text-brand-white/60">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
