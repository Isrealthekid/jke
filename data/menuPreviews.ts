import { PLACEHOLDER_IMAGES } from "./projects";

export interface MenuPreview {
  href: string;
  label: string;
  image: string;
}

export const menuPreviews: MenuPreview[] = [
  { href: "/", label: "Home", image: PLACEHOLDER_IMAGES[0] },
  { href: "/work", label: "Works", image: PLACEHOLDER_IMAGES[1] },
  { href: "/playground", label: "Playground", image: PLACEHOLDER_IMAGES[0] },
  // Opens the films site (a separate website), not a page of this one.
  { href: "https://films.thejoietv.com", label: "Films", image: PLACEHOLDER_IMAGES[2] },
  { href: "/services", label: "Services", image: PLACEHOLDER_IMAGES[0] },
  { href: "/contact", label: "Contact", image: PLACEHOLDER_IMAGES[1] },
];
