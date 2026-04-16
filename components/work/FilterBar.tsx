"use client";

import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function FilterBar({
  categories,
  active,
  onChange,
}: FilterBarProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "8px 20px",
              borderRadius: 100,
              border: isActive
                ? "1px solid #f5f4f0"
                : "1px solid rgba(245,244,240,0.15)",
              backgroundColor: isActive ? "#f5f4f0" : "transparent",
              color: isActive ? "#0a0a0a" : "rgba(245,244,240,0.5)",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "none",
              transition: "background-color 0.25s, color 0.25s, border-color 0.25s",
            }}
          >
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
}
