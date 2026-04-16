"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { pricingTiers } from "@/data/services";

export default function PricingCards() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {pricingTiers.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className={clsx(
            "border p-8",
            tier.highlighted
              ? "border-brand-accent bg-brand-accent/5"
              : "border-brand-white/10"
          )}
        >
          <h3 className="font-display text-2xl text-brand-white">{tier.name}</h3>
          <p className="mt-2 font-body text-sm text-brand-white/60">
            {tier.description}
          </p>
          <p className="mt-6 font-display text-4xl text-brand-accent">
            {tier.price}
          </p>
          <ul className="mt-8 space-y-3">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="font-body text-sm text-brand-white/80"
              >
                {feature}
              </li>
            ))}
          </ul>
          <button
            className={clsx(
              "mt-8 w-full py-3 font-body text-sm uppercase tracking-widest transition-colors",
              tier.highlighted
                ? "bg-brand-accent text-brand-black hover:bg-brand-accent/80"
                : "border border-brand-white/20 text-brand-white hover:border-brand-accent hover:text-brand-accent"
            )}
          >
            Get Started
          </button>
        </motion.div>
      ))}
    </div>
  );
}
