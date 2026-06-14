import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", name: "Homepage" },
  { path: "/services", name: "Services" },
  { path: "/booking", name: "Booking" },
  { path: "/contact", name: "Contact" },
  { path: "/about", name: "About" },
  { path: "/employment", name: "Employment" },
  { path: "/aunt-for-hire", name: "Aunt for Hire" },
  { path: "/marriage-counselling", name: "Marriage Counselling" },
];

for (const { path, name } of pages) {
  test(`${name} should have no automated accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
