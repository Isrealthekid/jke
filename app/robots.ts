import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://thejoietv.com/sitemap.xml",
    host: "https://thejoietv.com",
  };
}
