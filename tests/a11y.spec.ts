import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", name: "Homepage" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/mamoyo-maids", name: "Mamoyo Maids" },
  { path: "/mamoyo-maids/services", name: "Services" },
  { path: "/mamoyo-maids/booking", name: "Booking" },
  { path: "/mamoyo-maids/employment", name: "Employment" },
  { path: "/mamoyo-maids/aunt-for-hire", name: "Aunt for Hire" },
  { path: "/mamoyo-maids/marriage-counselling", name: "Marriage Counselling" },
];

for (const { path, name } of pages) {
  test(`${name} should have no automated accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .disableRules(["region", "heading-order", "color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
