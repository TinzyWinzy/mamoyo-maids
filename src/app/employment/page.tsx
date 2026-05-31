import type { Metadata } from "next";
import { EmploymentPage } from "./EmploymentPage";

export const metadata: Metadata = {
  title: "Hire a Maid",
  description:
    "Find reliable, background-checked domestic workers and maids for your home. Mamoyo Maids connects you with trusted, trained professionals in Harare.",
};

export default function Employment() {
  return <EmploymentPage />;
}
