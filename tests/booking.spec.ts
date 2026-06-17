import { test, expect } from "@playwright/test";

test.describe("Booking Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/mamoyo-maids/booking");
    await expect(page).toHaveTitle(/Book.*Mamoyo Maids/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/mamoyo-maids/booking");
    await expect(
      page.getByRole("heading", { name: /How Booking Works/i })
    ).toBeVisible();
  });

  test("should display 3-step process", async ({ page }) => {
    await page.goto("/mamoyo-maids/booking");
    await expect(page.getByText("Pick Your Service")).toBeVisible();
    await expect(page.getByText("Select Date & Time")).toBeVisible();
    await expect(page.getByText("Confirm & Relax")).toBeVisible();
  });

  test("should display booking form", async ({ page }) => {
    await page.goto("/mamoyo-maids/booking");
    await expect(
      page.getByRole("heading", { name: /Book Your Service/i })
    ).toBeVisible();
    await expect(page.getByLabel(/Full Name/i)).toBeVisible();
    await expect(page.getByLabel(/Phone Number/i)).toBeVisible();
    await expect(page.getByLabel(/Service Needed/i)).toBeVisible();
    await expect(page.getByLabel(/Preferred Date/i)).toBeVisible();
    await expect(page.getByLabel(/Preferred Time/i)).toBeVisible();
  });

  test("should submit booking form", async ({ page }) => {
    await page.goto("/mamoyo-maids/booking");
    await page.getByLabel(/Full Name/i).fill("Test User");
    await page.getByLabel(/Phone Number/i).fill("+263771234567");
    await page.getByLabel(/Service Needed/i).selectOption("Home Cleaning");
    await page.getByLabel(/Preferred Date/i).fill("2026-06-15");
    await page.getByLabel(/Preferred Time/i).selectOption("9:00 AM");
    await page.getByRole("button", { name: /Book Now/i }).click();
    await expect(
      page.getByText("Booking Request Received!")
    ).toBeVisible({ timeout: 10000 });
  });

  test("should not submit with empty required fields", async ({ page }) => {
    await page.goto("/mamoyo-maids/booking");
    await page.getByRole("button", { name: /Book Now/i }).click();
    await expect(
      page.getByText("Booking Request Received!")
    ).not.toBeVisible();
  });
});
