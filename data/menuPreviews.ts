import { PLACEHOLDER_IMAGES } from "./projects";

export interface MenuPreview {
  href: string;
  label: string;
  image: string;
}

export const menuPreviews: MenuPreview[] = [
  { href: "/", label: "Home", image: PLACEHOLDER_IMAGES[0] },
  { href: "/work", label: "Work", image: PLACEHOLDER_IMAGES[1] },
  { href: "/about", label: "About", image: PLACEHOLDER_IMAGES[2] },
  { href: "/services", label: "Services", image: PLACEHOLDER_IMAGES[0] },
  { href: "/contact", label: "Contact", image: PLACEHOLDER_IMAGES[1] },
];
