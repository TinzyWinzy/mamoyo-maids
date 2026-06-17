import type { Metadata } from "next";
import { TikTokPage } from "./TikTokPage";

export const metadata: Metadata = {
  title: "Follow Us on TikTok | Mamoyo Maids",
  description:
    "Follow Mamoyo Maids on TikTok for cleaning tips, marriage advice, and behind-the-scenes content.",
  openGraph: {
    title: "Mamoyo Maids on TikTok",
    description: "Follow us on TikTok for tips, tutorials, and family content.",
  },
};

export default function Page() {
  return <TikTokPage />;
}
