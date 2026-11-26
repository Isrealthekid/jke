import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const SITE = "https://thejoietv.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/playground", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ].map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.priority,
  }));
  const work = projects.map((p) => ({
    url: `${SITE}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...pages, ...work];
}
