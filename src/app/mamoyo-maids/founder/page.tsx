import type { Metadata } from "next";
import { FounderPage } from "./FounderPage";

export const metadata: Metadata = {
  title: "Meet Our Founder | Mamoyo Maids",
  description:
    "Meet Mamoyo, founder of Mamoyo Maids. Discover her story, vision, and passion for helping families live better.",
  openGraph: {
    title: "Meet Our Founder — Mamoyo Maids",
    description: "The story behind Mamoyo Maids and the woman who started it all.",
    images: [{ url: "/founder.jpg", width: 540, height: 960, alt: "Mamoyo — Founder of Mamoyo Maids" }],
  },
};

export default function Page() {
  return <FounderPage />;
}
