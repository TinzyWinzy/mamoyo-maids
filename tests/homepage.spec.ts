import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Mamoyo Maids/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Your Trusted Maids/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Clean Homes/i })
    ).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /Home/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Services/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Book Now/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /About/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Contact/i }).first()).toBeVisible();
  });

  test("should display trust badges", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Background Checked Staff")).toBeVisible();
    await expect(page.getByText("Reliable Scheduling")).toBeVisible();
    await expect(page.getByText("Satisfaction Guaranteed")).toBeVisible();
  });

  test("should display Why Choose Us section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /The Mamoyo Difference/i })
    ).toBeVisible();
    await expect(page.getByText("Trusted Professionals")).toBeVisible();
  });

  test("should display featured services", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Home Cleaning").first()).toBeVisible();
    await expect(page.getByText("Deep Cleaning").first()).toBeVisible();
  });

  test("should display testimonials", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /What Our.*Customers.*Say/i })
    ).toBeVisible();
  });

  test("should have CTA buttons", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Book Your Cleaning Today/i }).first()
    ).toBeVisible();
  });
});
