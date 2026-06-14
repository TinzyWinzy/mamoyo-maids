import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mamoyo Services — our mission, our team, and why hundreds of families trust us for home care and family services in Harare.",
};

export default function About() {
  return <AboutPage />;
}
