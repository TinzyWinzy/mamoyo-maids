import type { Metadata } from "next";
import { BookingPage } from "./BookingPage";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Book your professional home service in just 3 steps. Choose your service, select a date, and relax while Mamoyo Services takes care of the rest.",
};

export default function Booking() {
  return <BookingPage />;
}
