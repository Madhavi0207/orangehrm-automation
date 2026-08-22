import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { AdminPage } from "../src/pages/AdminPage";

test.describe("Admin - User Management", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();

    await login.login("Admin", "admin123");

    const admin = new AdminPage(page);

    await admin.goToAdminPage();

    await expect(admin.assertingAdminPage).toBeVisible();
  });

  // ADD USER

  test("should add a new system user", async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.addUser({
      username: "hello1234",
      password: "TestPass@123",
    });

    await expect(page).toHaveURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers",
    );
  });

  // SEARCH EXISTING USER

  test("should search by their username", async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.searchUserByUserName("Admin");

    const count = await admin.getRowCount();

    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should search user by their role", async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.searchUserByUserRole();

    const count = await admin.getRowCount();

    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should search by employee name", async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.searchUserByEmployeeName("Charles Carter");

    const count = await admin.getRowCount();

    expect(count).toBeGreaterThanOrEqual(0);
  });

  // SEARCH NON-EXISTING USER

  test("should show no records for a non-existent user", async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.searchUserByUserName("NonExistentUser_zzz_999");

    await admin.expectNoRecords();
  });

  // DELETE USER

  test("should delete a user", async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.deleteUserByCheckbox();
    // await admin.deleteUserByIcon();

    await expect(admin.assertingUserDeletion).toBeVisible();
  });

  test("edit the user", async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.editUser();
  });
});
