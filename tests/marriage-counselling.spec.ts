import { test, expect } from "@playwright/test";

test.describe("Marriage Counselling Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/mamoyo-maids/marriage-counselling");
    await expect(page).toHaveTitle(/Marriage Counselling/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/mamoyo-maids/marriage-counselling");
    await expect(
      page.getByRole("heading", { name: /Marriage Counselling/i })
    ).toBeVisible();
  });

  test("should display service offerings", async ({ page }) => {
    await page.goto("/mamoyo-maids/marriage-counselling");
    await expect(page.getByText("Pre-Marital Counselling")).toBeVisible();
    await expect(page.getByText("Couples Therapy")).toBeVisible();
    await expect(page.getByText("Traditional Marriage Guidance")).toBeVisible();
  });

  test("should have WhatsApp CTA", async ({ page }) => {
    await page.goto("/mamoyo-maids/marriage-counselling");
    const whatsappLinks = page.getByRole("link", { name: /WhatsApp/i });
    await expect(whatsappLinks.first()).toBeVisible();
  });
});
