import type { Metadata } from "next";
import { MamoyoMaidsPage } from "./MamoyoMaidsPage";

export const metadata: Metadata = {
  title: "Mamoyo Maids — Domestic & Home Services",
  description:
    "Professional home cleaning, maid placement, maid training, marriage counselling, and cultural advisory services under WOBIC Employment Services.",
};

export default function MamoyoMaids() {
  return <MamoyoMaidsPage />;
}
