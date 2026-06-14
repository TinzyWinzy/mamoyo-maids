import type { Metadata } from "next";
import { FounderPage } from "./FounderPage";

export const metadata: Metadata = {
  title: "Meet Our Founder",
  description:
    "Meet Mamoyo, founder of Mamoyo Services. Discover her story, vision, and passion for helping families live better.",
  openGraph: {
    title: "Meet Our Founder — Mamoyo Services",
    description: "The story behind Mamoyo Services and the woman who started it all.",
    images: [{ url: "/founder.jpg", width: 540, height: 960, alt: "Mamoyo — Founder of Mamoyo Services" }],
  },
};

export default function Page() {
  return <FounderPage />;
}
