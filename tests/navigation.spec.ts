import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between pages", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("banner").getByRole("link", { name: /Services/i }).click();
    await page.waitForURL(/\/services/);
    await expect(page).toHaveURL(/\/services/);

    await page.getByRole("banner").getByRole("link", { name: /About/i }).click();
    await page.waitForURL(/\/about/);
    await expect(page).toHaveURL(/\/about/);

    await page.getByRole("banner").getByRole("link", { name: /Contact/i }).click();
    await page.waitForURL(/\/contact/);
    await expect(page).toHaveURL(/\/contact/);

    await page.getByRole("banner").getByRole("link", { name: /Home/i }).click();
    await page.waitForURL(/\//);
    await expect(page).toHaveURL("/");
  });

  test("should have working logo link", async ({ page }) => {
    await page.goto("/services");
    await page.getByRole("banner").getByRole("link", { name: /Mamoyo Maids/i }).click();
    await page.waitForURL(/\//);
    await expect(page).toHaveURL("/");
  });
});

test.describe("Mobile Navigation", () => {
  test("should open and close mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /Toggle menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    await expect(
      page.getByRole("banner").getByRole("link", { name: /Cleaning Services/i })
    ).toBeVisible();

    await menuButton.click();
    await expect(
      page.getByRole("banner").getByRole("link", { name: /Cleaning Services/i })
    ).not.toBeVisible();
  });
});

test.describe("Footer", () => {
  test("should display footer content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("© 2026 Mamoyo Maids")).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText("Clean Spaces, Better Lives", { exact: true })).toBeVisible();
  });

  test("should have footer navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("contentinfo").getByRole("link", { name: /Cleaning Services/i })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByRole("link", { name: /Hire a Maid/i })).toBeVisible();
  });
});

test.describe("WhatsApp Integration", () => {
  test("should have WhatsApp links on homepage", async ({ page }) => {
    await page.goto("/");
    const whatsappLinks = page.getByRole("link", { name: /WhatsApp/i });
    await expect(whatsappLinks.first()).toBeVisible();
  });

  test("should have floating WhatsApp button", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByLabel("Chat on WhatsApp")
    ).toBeVisible();
  });
});
