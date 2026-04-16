import { PLACEHOLDER_IMAGES } from "./projects";

export interface Client {
  name: string;
  logo: string;
}

export const clients: Client[] = [
  { name: "Alpha Inc.", logo: PLACEHOLDER_IMAGES[0] },
  { name: "Beta Studios", logo: PLACEHOLDER_IMAGES[1] },
  { name: "Gamma Corp", logo: PLACEHOLDER_IMAGES[2] },
  { name: "Delta Labs", logo: PLACEHOLDER_IMAGES[0] },
  { name: "Epsilon Group", logo: PLACEHOLDER_IMAGES[1] },
  { name: "Zeta Ventures", logo: PLACEHOLDER_IMAGES[2] },
];
