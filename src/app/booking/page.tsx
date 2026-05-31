import type { Metadata } from "next";
import { BookingPage } from "./BookingPage";

export const metadata: Metadata = {
  title: "Book a Cleaning",
  description:
    "Book your professional cleaning service in just 3 steps. Choose your service, select a date, and relax while Mamoyo Maids takes care of the rest.",
};

export default function Booking() {
  return <BookingPage />;
}
