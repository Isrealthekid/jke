import type { ReactNode } from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** The social links used on the home page's first screen and in the footer. */
export const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@JoieTVProductions",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" {...stroke} />
        <path d="M10 9.2v5.6l4.8-2.8L10 9.2Z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/joie.egbuson/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
        <circle cx="12" cy="12" r="4.2" {...stroke} />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joykarenate-egbuson/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" {...stroke} />
        <path d="M8 10.5V16M8 7.6v.1M12 16v-5.5M12 12.5c0-1.3 1-2 2.1-2S16 11.2 16 12.6V16" {...stroke} />
      </>
    ),
  },
];
