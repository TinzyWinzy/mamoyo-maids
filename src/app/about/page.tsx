import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us | WOBIC Employment Services",
  description:
    "Learn about WOBIC Employment Services — our mission, our team, and why hundreds of families and businesses trust us for recruitment and staff placement in Harare.",
};

export default function About() {
  return <AboutPage />;
}
