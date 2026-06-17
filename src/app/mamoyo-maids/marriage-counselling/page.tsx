import type { Metadata } from "next";
import { MarriageCounsellingPage } from "./MarriageCounsellingPage";

export const metadata: Metadata = {
  title: "Marriage Counselling | Mamoyo Maids",
  description:
    "Pre-marital and couples counselling to build strong, lasting relationships. Professional guidance for every stage of your marriage journey.",
};

export default function MarriageCounselling() {
  return <MarriageCounsellingPage />;
}
