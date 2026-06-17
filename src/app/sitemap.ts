import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1.0 },
    { path: "/mamoyo-maids", priority: 0.9 },
    { path: "/mamoyo-maids/services", priority: 0.8 },
    { path: "/mamoyo-maids/booking", priority: 0.8 },
    { path: "/mamoyo-maids/employment", priority: 0.8 },
    { path: "/mamoyo-maids/aunt-for-hire", priority: 0.8 },
    { path: "/mamoyo-maids/marriage-counselling", priority: 0.8 },
    { path: "/mamoyo-maids/founder", priority: 0.8 },
    { path: "/mamoyo-maids/tiktok", priority: 0.7 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));
}
