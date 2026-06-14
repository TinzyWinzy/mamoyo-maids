import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/booking",
    "/employment",
    "/aunt-for-hire",
    "/marriage-counselling",
    "/tiktok",
    "/about",
    "/contact",
  ];

  return pages.map((page) => ({
    url: `${SITE_CONFIG.url}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : page === "/services" ? 0.9 : 0.8,
  }));
}
