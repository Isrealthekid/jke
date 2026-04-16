import Lenis from "@studio-freight/lenis";

export function createLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  return lenis;
}

export type { Lenis };
