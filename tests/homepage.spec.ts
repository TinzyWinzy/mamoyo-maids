import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/WOBIC Employment Services/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Employment Partner/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Your Trusted Employment/i })
    ).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /WOBIC/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /WhatsApp/i }).first()).toBeVisible();
  });

  test("should display trust badges", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Police Cleared Staff")).toBeVisible();
    await expect(page.getByText("Trained Professionals")).toBeVisible();
    await expect(page.getByText("Satisfaction Guaranteed")).toBeVisible();
  });

  test("should display Why Choose Us section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /WOBIC Difference/i })
    ).toBeVisible();
    await expect(page.getByText("Police Clearance Guaranteed")).toBeVisible();
  });

  test("should display staff solutions", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("House Maids").first()).toBeVisible();
    await expect(page.getByText("Security").first()).toBeVisible();
  });

  test("should have CTA buttons", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Hire Staff Now/i }).first()
    ).toBeVisible();
  });
});
