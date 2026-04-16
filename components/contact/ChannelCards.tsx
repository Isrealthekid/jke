"use client";

import { motion } from "framer-motion";

const channels = [
  { label: "Email", value: "hello@jke.studio", href: "mailto:hello@jke.studio" },
  { label: "Twitter", value: "@jke_studio", href: "#" },
  { label: "Instagram", value: "@jke.studio", href: "#" },
  { label: "LinkedIn", value: "JKE Studio", href: "#" },
];

export default function ChannelCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {channels.map((channel, i) => (
        <motion.a
          key={channel.label}
          href={channel.href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="group border border-brand-white/10 p-6 transition-colors hover:border-brand-accent"
        >
          <span className="font-body text-xs uppercase tracking-widest text-brand-white/40">
            {channel.label}
          </span>
          <p className="mt-2 font-display text-xl text-brand-white transition-colors group-hover:text-brand-accent">
            {channel.value}
          </p>
        </motion.a>
      ))}
    </div>
  );
}
