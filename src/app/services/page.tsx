import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Professional home cleaning, deep cleaning, laundry, organizing, and move-in/move-out cleaning services. Book your service today with Mamoyo Maids.",
};

export default function Services() {
  return <ServicesPage />;
}
