import { test, expect } from "@playwright/test";

test.describe("Services Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/services");
    await expect(page).toHaveTitle(/Services.*Mamoyo Services/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/services");
    await expect(
      page.getByRole("heading", { name: /Our Professional Services/i })
    ).toBeVisible();
  });

  test("should display all services", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByText("Home Cleaning").first()).toBeVisible();
    await expect(page.getByText("Deep Cleaning").first()).toBeVisible();
    await expect(page.getByText("Laundry & Ironing").first()).toBeVisible();
    await expect(page.getByText("Maid Training & Upskilling").first()).toBeVisible();
    await expect(page.getByText("Organizing & Decluttering").first()).toBeVisible();
    await expect(page.getByText("Move-in / Move-out Cleaning").first()).toBeVisible();
  });

  test("should have Book This Service buttons", async ({ page }) => {
    await page.goto("/services");
    const bookButtons = page.getByRole("link", { name: /Book This Service/i });
    await expect(bookButtons.first()).toBeVisible();
  });

  test("should have WhatsApp buttons", async ({ page }) => {
    await page.goto("/services");
    const whatsappButtons = page.getByRole("link", { name: /WhatsApp/i });
    await expect(whatsappButtons.first()).toBeVisible();
  });
});
