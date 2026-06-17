import { test, expect } from "@playwright/test";

test.describe("Employment Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await expect(page).toHaveTitle(/Hire.*Mamoyo Maids/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await expect(
      page.getByRole("heading", { name: /Hire a Trusted Maid/i })
    ).toBeVisible();
  });

  test("should display maid types", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await expect(page.locator("div").filter({ hasText: /^Live-In Maid$/ }).first()).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^Live-Out Maid$/ }).first()).toBeVisible();
    await expect(page.locator("div").filter({ hasText: /^Part-Time Helper$/ }).first()).toBeVisible();
  });

  test("should display 3-step process", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await expect(page.getByRole("heading", { name: "Tell Us What You Need" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "We Match You" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Interview & Hire" })).toBeVisible();
  });

  test("should display request form", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await expect(
      page.getByRole("heading", { name: /Request a Maid/i })
    ).toBeVisible();
    await expect(page.getByLabel(/Your Name/i)).toBeVisible();
    await expect(page.getByLabel(/Phone Number/i)).toBeVisible();
    await expect(page.getByLabel(/Maid Type Needed/i)).toBeVisible();
    await expect(page.getByLabel(/Preferred Maid Age/i)).toBeVisible();
  });

  test("should submit employment form", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await page.getByLabel(/Your Name/i).fill("Test Employer");
    await page.getByLabel(/Phone Number/i).fill("+263771234567");
    await page.getByLabel(/Maid Type Needed/i).selectOption("Live-In Maid");
    await page.getByLabel(/Preferred Maid Age/i).selectOption("26-35");
    await page.getByRole("button", { name: /Submit Request/i }).click();
    await expect(
      page.getByText("Request Received!")
    ).toBeVisible({ timeout: 10000 });
  });

  test("should not submit with empty required fields", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await page.getByRole("button", { name: /Submit Request/i }).click();
    await expect(
      page.getByText("Request Received!")
    ).not.toBeVisible();
  });

  test("should display Join Our Team section", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await expect(
      page.getByText("Looking to Join Our Team?")
    ).toBeVisible();
  });

  test("should display available maid profiles", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    await expect(page.getByText("Meet Our Available Maids")).toBeVisible();
    await expect(page.getByText("Sarah").first()).toBeVisible();
    await expect(page.getByText("Tendai").first()).toBeVisible();
    await expect(page.getByText("Chipo").first()).toBeVisible();
  });

  test("should have WhatsApp buttons on maid profiles", async ({ page }) => {
    await page.goto("/mamoyo-maids/employment");
    const profileWhatsApp = page.getByRole("link", { name: /Chat on WhatsApp/i });
    await expect(profileWhatsApp.first()).toBeVisible();
  });
});
