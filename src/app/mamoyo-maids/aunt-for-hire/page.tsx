import type { Metadata } from "next";
import { AuntForHirePage } from "./AuntForHirePage";

export const metadata: Metadata = {
  title: "Aunt for Hire | Mamoyo Maids",
  description:
    "Traditional marriage mentorship and cultural guidance for your wedding preparations. Our Aunt for Hire service provides wisdom, support, and family mediation.",
};

export default function AuntForHire() {
  return <AuntForHirePage />;
}
