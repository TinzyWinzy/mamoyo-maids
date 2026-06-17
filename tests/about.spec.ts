import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About.*WOBIC Employment Services/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /About WOBIC/i })
    ).toBeVisible();
  });

  test("should display mission statement", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /Connecting Talent with Opportunity/i })
    ).toBeVisible();
  });

  test("should display trust guarantee", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Police Cleared Staff")).toBeVisible();
    await expect(page.getByText("Quality Training")).toBeVisible();
  });

  test("should display brand section", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("WOBIC & Mamoyo Maids")).toBeVisible();
  });
});
