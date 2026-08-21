import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

test.describe("Login", () => {
  test("should login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login("Admin", "admin123");

    await expect(page).toHaveURL(/dashboard/);
  });
});
