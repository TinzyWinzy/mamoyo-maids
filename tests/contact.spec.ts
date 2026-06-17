import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact.*WOBIC Employment Services/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: /Let.*Find Your Ideal Staff/i })
    ).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("link", { name: /Phone \+/i }).first()).toBeVisible();
    await expect(page.getByText("info@wobic.co.zw").first()).toBeVisible();
  });

  test("should display operating hours", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Operating Hours" })).toBeVisible();
  });

  test("should display inquiry form", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: /Quick Inquiry/i })
    ).toBeVisible();
    await expect(page.getByLabel(/Name/i)).toBeVisible();
    await expect(page.getByLabel(/Phone/i)).toBeVisible();
    await expect(page.getByLabel(/Message/i)).toBeVisible();
  });

  test("should submit inquiry form", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/Name/i).fill("Test User");
    await page.getByLabel(/Phone/i).fill("+263771234567");
    await page.getByLabel(/Message/i).fill("Test inquiry message");
    await page.getByRole("button", { name: /Send Inquiry/i }).click();
    await expect(
      page.getByText("Message Sent!")
    ).toBeVisible();
  });

  test("should not submit with empty required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Send Inquiry/i }).click();
    await expect(
      page.getByText("Message Sent!")
    ).not.toBeVisible();
  });
});
