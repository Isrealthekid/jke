"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

/* The sliding panel — covers the screen during transitions */
const slideVariants = {
  initial: { y: "100%" },
  animate: { y: "-100%", transition: { duration: 0.45, ease: EASE, delay: 0.1 } },
  exit: { y: "0%", transition: { duration: 0.45, ease: EASE } },
};

/* The page content — fades in after the panel clears */
const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.45 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Slide panel */}
        <motion.div
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            backgroundColor: "#0a0a0a",
            pointerEvents: "none",
          }}
        />

        {/* Page content */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
