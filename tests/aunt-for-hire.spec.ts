import { test, expect } from "@playwright/test";

test.describe("Aunt for Hire Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/aunt-for-hire");
    await expect(page).toHaveTitle(/Aunt for Hire/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/aunt-for-hire");
    await expect(
      page.getByRole("heading", { name: /Aunt for Hire/i })
    ).toBeVisible();
  });

  test("should display service offerings", async ({ page }) => {
    await page.goto("/aunt-for-hire");
    await expect(page.getByText("Marriage Preparation")).toBeVisible();
    await expect(page.getByText("Family Mediation")).toBeVisible();
    await expect(page.getByText("Cultural Mentorship")).toBeVisible();
    await expect(page.getByText("Wedding Support")).toBeVisible();
  });

  test("should have WhatsApp CTA", async ({ page }) => {
    await page.goto("/aunt-for-hire");
    const whatsappLinks = page.getByRole("link", { name: /WhatsApp/i });
    await expect(whatsappLinks.first()).toBeVisible();
  });
});
