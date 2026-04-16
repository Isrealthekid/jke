"use client";

import { motion } from "framer-motion";
import { clients } from "@/data/clients";

export default function ClientLogos() {
  return (
    <section>
      <h3 className="mb-12 text-center font-body text-sm uppercase tracking-widest text-brand-white/40">
        Trusted By
      </h3>
      <div className="grid grid-cols-3 gap-8 md:grid-cols-6">
        {clients.map((client, i) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex items-center justify-center py-4 font-body text-sm text-brand-white/30"
          >
            {client.name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
