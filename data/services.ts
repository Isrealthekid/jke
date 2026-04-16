export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const services: Service[] = [
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Crafting distinctive visual identities that resonate.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    description: "Building immersive digital experiences.",
    features: ["UI/UX Design", "Frontend Development", "CMS Integration", "Performance Optimization"],
  },
  {
    id: "motion",
    title: "Motion & Animation",
    description: "Bringing ideas to life through movement.",
    features: ["Motion Graphics", "3D Animation", "Video Editing", "Interactive Animations"],
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$2,500",
    description: "Perfect for small projects and startups.",
    features: ["Brand Identity", "3 Concepts", "2 Revisions", "Source Files"],
  },
  {
    name: "Professional",
    price: "$7,500",
    description: "Comprehensive solutions for growing brands.",
    features: ["Full Branding", "Web Design", "5 Concepts", "Unlimited Revisions", "Source Files"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations.",
    features: ["Everything in Pro", "Motion Design", "Ongoing Support", "Priority Access"],
  },
];
