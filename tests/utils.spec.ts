import { test, expect } from "@playwright/test";
import { getWhatsAppUrl, getPhoneUrl, getWhatsAppWebUrl } from "../src/lib/utils";

test.describe("getWhatsAppUrl", () => {
  test("formats basic URL", () => {
    expect(getWhatsAppUrl("+263771234567")).toBe(
      "whatsapp://send?phone=263771234567"
    );
  });

  test("formats URL with message", () => {
    expect(getWhatsAppUrl("+263771234567", "Hello!")).toBe(
      "whatsapp://send?phone=263771234567&text=Hello!"
    );
  });

  test("encodes message with special characters", () => {
    const url = getWhatsAppUrl("+263771234567", "Hello & goodbye?");
    expect(url).toContain("text=Hello%20%26%20goodbye%3F");
  });

  test("strips non-numeric characters from phone", () => {
    expect(getWhatsAppUrl("+263 (77) 123-4567")).toBe(
      "whatsapp://send?phone=263771234567"
    );
  });

  test("handles empty message gracefully", () => {
    const url = getWhatsAppUrl("+263771234567");
    expect(url).not.toContain("&text=");
  });
});

test.describe("getWhatsAppWebUrl", () => {
  test("formats basic URL", () => {
    expect(getWhatsAppWebUrl("+263771234567")).toBe(
      "https://wa.me/263771234567"
    );
  });

  test("formats URL with message", () => {
    expect(getWhatsAppWebUrl("+263771234567", "Hello!")).toBe(
      "https://wa.me/263771234567?text=Hello!"
    );
  });
});

test.describe("getPhoneUrl", () => {
  test("formats tel URL with plus", () => {
    expect(getPhoneUrl("+263771234567")).toBe("tel:+263771234567");
  });

  test("preserves plus sign", () => {
    expect(getPhoneUrl("+263 (77) 123-4567")).toBe("tel:+263771234567");
  });

  test("handles number without plus", () => {
    expect(getPhoneUrl("0771234567")).toBe("tel:0771234567");
  });
});
