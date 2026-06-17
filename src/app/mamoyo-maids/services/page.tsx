import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Our Services | Mamoyo Maids",
  description:
    "Professional home cleaning, deep cleaning, laundry, organizing, maid training, and move-in/move-out services. Book your service today with Mamoyo Maids.",
};

export default function Services() {
  return <ServicesPage />;
}
