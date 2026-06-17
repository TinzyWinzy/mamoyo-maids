import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85, 90],
  },
  serverExternalPackages: ["playwright", "playwright-core"],
  outputFileTracingExcludes: {
    "*": ["node_modules/playwright", "node_modules/playwright-core"],
  },
};

export default nextConfig;
