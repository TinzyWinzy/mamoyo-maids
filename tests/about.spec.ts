import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About.*Mamoyo Maids/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /Why Families Trust/i })
    ).toBeVisible();
  });

  test("should display mission statement", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /Clean Spaces, Better Lives/i })
    ).toBeVisible();
  });

  test("should display team members", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Tatenda Moyo")).toBeVisible();
    await expect(page.getByText("Nyasha Chikwanha")).toBeVisible();
  });

  test("should display trust guarantee", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Screened Staff")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Quality Assurance" })).toBeVisible();
  });

  test("should display testimonials", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /What Our.*Customers.*Say/i })
    ).toBeVisible();
  });
});
