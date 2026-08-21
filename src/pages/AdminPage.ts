import { Page, Locator, expect } from "@playwright/test";

export class AdminPage {
  readonly page: Page;

  //Navigating to admin page

  private readonly adminLink: Locator;
  public readonly assertingAdminPage: Locator;

  //User Management

  //add user
  private readonly addNewUserBtn: Locator;
  private readonly userRole: Locator;
  private readonly userRoleOption: Locator;
  private readonly employeeNameHint: Locator;
  private readonly employeeName: Locator;
  private readonly statusSelector: Locator;
  private readonly statusValue: Locator;
  private readonly userName: Locator;

  private readonly passwordSelector: Locator;
  private readonly confirmPassword: Locator;
  private readonly saveButton: Locator;

  //Search User

  private readonly searchUserBtn: Locator;
  private readonly searchUserName: Locator;
  private readonly recordsFound: Locator;
  private readonly searchUserRole: Locator;
  private readonly searchUserRoleValue: Locator;
  private readonly userRoleRecord: Locator;
  private readonly searchEmployeeName: Locator;
  private readonly searchStatus: Locator;
  private readonly searchStatusValue: Locator;
  private readonly resetButton: Locator;

  //delete user

  private readonly checkboxDelete: Locator;
  private readonly deleteConfirmationSelector: Locator;
  private readonly deleteAlertButton: Locator;
  private readonly deleteIconButton: Locator;
  private readonly deletePopUp: Locator;
  public readonly assertingUserDeletion: Locator;

  //edit user
  private readonly editIconSelector: Locator;
  private readonly editUsername: Locator;
  private readonly editStatus: Locator;
  private readonly editStatusValue: Locator;
  private readonly editUserRole: Locator;
  private readonly editUserRoleValue: Locator;
  private readonly changePasswordBtn: Locator;
  private readonly editPassword: Locator;
  private readonly editConfirmPassword: Locator;
  private readonly saveEditBtn: Locator;
  private readonly successMessage: Locator;
  private readonly editedValue: Locator;

  constructor(page: Page) {
    this.page = page;

    this.adminLink = this.page.getByRole("link", { name: "Admin" });
    this.assertingAdminPage = this.page.getByRole("heading", {
      name: "/ User Management",
    });

    //add new user
    this.addNewUserBtn = this.page.getByText("Add", { exact: true });

    this.userRole = this.page.getByText("-- Select --").first();
    this.userRoleOption = this.page.getByRole("option", { name: "Admin" });

    this.employeeNameHint = this.page.getByRole("textbox", {
      name: "Type for hints...",
    });
    this.employeeName = this.page
      .locator(".oxd-autocomplete-option")
      .filter({ hasText: "Charles Carter" });

    this.statusSelector = this.page.getByText("-- Select --");
    this.statusValue = this.page.getByRole("option", { name: "Enabled" });

    this.userName = this.page.getByRole("textbox").nth(2);

    this.passwordSelector = this.page.getByRole("textbox").nth(3);
    this.confirmPassword = this.page.getByRole("textbox").nth(4);
    this.saveButton = this.page.getByRole("button", { name: "Save" });

    //search user

    this.searchUserBtn = this.page.getByRole("button", { name: "Search" });
    this.searchUserName = this.page.getByRole("textbox").nth(1);
    this.recordsFound = this.page.getByText("(1) Record Found", {
      exact: true,
    });

    this.searchUserRole = this.page
      .locator("div")
      .filter({ hasText: /^-- Select --$/ })
      .nth(2);
    this.searchUserRoleValue = this.page.getByRole("option", { name: "Admin" });
    this.userRoleRecord = this.page.getByText("(2) Records Found");

    this.searchStatus = this.page
      .locator("div")
      .filter({ hasText: /^-- Select --$/ })
      .nth(2);

    this.searchStatusValue = this.page
      .getByRole("listbox")
      .getByText("Enabled");

    this.searchEmployeeName = this.page.getByRole("textbox", {
      name: "Type for hints...",
    });

    this.resetButton = this.page.getByRole("button", { name: "Reset" });

    // delete User
    this.checkboxDelete = this.page
      .locator(
        ".oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon",
      )
      .first();

    this.deleteConfirmationSelector = page.getByRole("button", {
      name: " Delete Selected",
    });

    this.deleteAlertButton = this.page.getByRole("button", {
      name: " Yes, Delete",
    });

    this.deleteIconButton = this.page
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(3);

    this.deletePopUp = this.page.getByRole("button", {
      name: " Yes, Delete",
    });
    this.assertingUserDeletion = page.getByText("Success", {
      exact: true,
    });

    //edit user

    this.editIconSelector = this.page.locator(
      "div:nth-child(3) > .oxd-table-row > div:nth-child(6) > .oxd-table-cell-actions > button:nth-child(2)",
    );
    this.editUsername = this.page.getByRole("textbox").nth(2);
    this.editStatus = this.page
      .locator("div")
      .filter({ hasText: /^Enabled$/ })
      .nth(2);
    this.editStatusValue = this.page.getByRole("option", { name: "Disabled" });
    this.editUserRole = this.page
      .locator("div")
      .filter({ hasText: /^-- Select --$/ })
      .nth(2);
    this.editUserRoleValue = this.page.getByRole("option", { name: "ESS" });

    this.changePasswordBtn = this.page.locator(".oxd-icon.bi-check");

    this.editPassword = this.page.getByRole("textbox").nth(3);

    this.editConfirmPassword = this.page.getByRole("textbox").nth(4);

    this.saveEditBtn = this.page.getByRole("button", { name: "Save" });
    this.successMessage = this.page.getByText("SuccessSuccessfully Updated");

    this.editedValue = this.page.getByRole("row", {
      name: " saisankar12345 Admin",
    });
  }

  // ============================================================
  // NAVIGATION
  // ============================================================
  async goToAdminPage(): Promise<void> {
    await this.adminLink.click();
  }

  // ============================================================
  // USER MANAGEMENT  (/admin/viewSystemUsers)
  // ============================================================
  async addUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    await this.addNewUserBtn.click();

    // User Role
    await this.userRole.click();

    await this.userRoleOption.click();

    // Employee Name
    // Employee Name
    await this.employeeNameHint.click();
    await this.employeeNameHint.pressSequentially("Charles Carter", {
      delay: 150,
    });

    // Wait for the "Searching...." text to disappear AND a real option to appear
    const option = this.employeeName;
    await option.waitFor({ state: "visible", timeout: 10_000 });
    await option.click();

    // Confirm it actually got selected (no "Invalid" text)
    await expect(
      this.page.locator(".oxd-input-field-error-message"),
    ).toHaveCount(0);

    // Status
    await this.statusSelector.click();

    await this.statusValue.click();

    // Username
    await this.userName.click();
    await this.userName.fill(username);

    // Password
    await this.passwordSelector.click();
    await this.passwordSelector.fill(password);

    // Confirm Password
    await this.confirmPassword.click();
    await this.confirmPassword.fill(password);

    // Save
    this.saveButton.click();
  }

  //search by username
  async searchUserByUserName(username: string): Promise<void> {
    await this.searchUserName.click();
    await this.searchUserName.fill(username);

    await this.searchUserBtn.click();
  }

  //search by user role

  async searchUserByUserRole(): Promise<void> {
    await this.searchUserRole.click();

    await this.searchUserRoleValue.click();
    await this.searchUserBtn.click();
  }

  //search by employeename

  async searchUserByEmployeeName(username: string): Promise<void> {
    await this.searchEmployeeName.click();
    await this.searchEmployeeName.fill(username);

    await this.searchUserBtn.click();
  }
  async searchUserByUserStatus(username: string): Promise<void> {
    await this.searchStatus.click();
    await this.searchStatusValue.click();

    await this.resetButton.click();
    await this.searchUserBtn.click();
  }
  async getRowCount(): Promise<number> {
    const rows = this.page.locator(".oxd-table-body .oxd-table-card");

    return await rows.count();
  }
  async expectNoRecords(): Promise<void> {
    await expect(
      this.page.locator("span").filter({ hasText: "No Records Found" }),
    ).toBeVisible();
  }

  async deleteUserByCheckbox(): Promise<void> {
    await this.checkboxDelete.click();
    await this.deleteConfirmationSelector.click();
    await this.deleteAlertButton.click();
  }

  async deleteUserByIcon(): Promise<void> {
    await this.deleteIconButton.click();
    await this.deletePopUp.click();
  }
  async expectToast(message: string): Promise<void> {
    const toastMessage = this.page.getByText("Successfully Deleted");

    await expect(toastMessage).toContainText(message);
  }

  async editUser(): Promise<void> {
    await this.editIconSelector.click();

    await this.editUserRole.click();
    await this.editUserRoleValue.click();

    await this.editStatus.click();
    await this.editStatusValue.click();

    await this.changePasswordBtn.click();
    await this.editPassword.click();
    await this.editPassword.fill("thisissostupid!@1");

    await this.editConfirmPassword.click();
    await this.editConfirmPassword.fill("thisissostupid!@1");

    await this.saveEditBtn.click();
  }
}
