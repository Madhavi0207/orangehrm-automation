import { test, expect } from '../src/utils/fixtures';
import { newUser } from '../src/data/testData';

test.describe('Admin Module - User Management', () => {
  test.beforeEach(async ({ loggedInPage, adminPage }) => {
    await loggedInPage.navigateTo('Admin');
    await adminPage.expectLoaded();
  });

  test('should load Admin > User Management page @smoke', async ({ adminPage }) => {
    await expect(adminPage.addButton).toBeVisible();
    await expect(adminPage.searchButton).toBeVisible();
  });

  test('should search for existing Admin user @smoke', async ({ adminPage }) => {
    await adminPage.searchByUsername('Admin');
    const rowCount = await adminPage.getResultRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('should show "No Records Found" for non-existent user @negative', async ({ adminPage }) => {
    await adminPage.searchByUsername('NonExistentUser_zzz_999');
    await expect(adminPage.noRecordsFound).toBeVisible();
  });

  test('should reset search filters', async ({ adminPage }) => {
    await adminPage.searchUsernameInput.fill('Admin');
    await adminPage.resetButton.click();
    await expect(adminPage.searchUsernameInput).toHaveValue('');
  });

  test('should create a new system user and verify it appears in search @critical', async ({ adminPage }) => {
    const user = newUser();
    await adminPage.addUser(user);
    await adminPage.expectToastContains('Successfully Saved');

    await adminPage.open();
    await adminPage.searchByUsername(user.username);
    const rowCount = await adminPage.getResultRowCount();
    expect(rowCount).toBe(1);
  });

  test('should validate required fields on Add User form @negative', async ({ adminPage }) => {
    await adminPage.addButton.click();
    await adminPage.waitForSpinnerToDisappear();
    await adminPage.saveButton.click();
    const errors = adminPage.page.locator('.oxd-input-field-error-message');
    await expect(errors.first()).toBeVisible();
  });

  test('should cancel Add User form without saving', async ({ adminPage }) => {
    await adminPage.addButton.click();
    await adminPage.waitForSpinnerToDisappear();
    await adminPage.cancelButton.click();
    await expect(adminPage.addButton).toBeVisible();
  });

  test('should delete a created user @critical', async ({ adminPage }) => {
    const user = newUser();
    await adminPage.addUser(user);
    await adminPage.expectToastContains('Successfully Saved');

    await adminPage.open();
    await adminPage.searchByUsername(user.username);
    await adminPage.deleteFirstSearchResult();
    await adminPage.expectToastContains('Successfully Deleted');

    await adminPage.open();
    await adminPage.searchByUsername(user.username);
    await expect(adminPage.noRecordsFound).toBeVisible();
  });
});
