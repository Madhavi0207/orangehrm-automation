import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  readonly pageHeader: Locator;
  readonly addButton: Locator;
  readonly searchUsernameInput: Locator;
  readonly searchUserRoleDropdown: Locator;
  readonly searchStatusDropdown: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly userTableRows: Locator;
  readonly noRecordsFound: Locator;
  readonly recordCount: Locator;

  // Add/Edit User form
  readonly userRoleDropdown: Locator;
  readonly employeeNameInput: Locator;
  readonly statusToggle: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('h6.oxd-topbar-header-breadcrumb-module');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchUsernameInput = page.locator('.oxd-table-filter-area .oxd-input').first();
    this.searchUserRoleDropdown = page.locator('.oxd-table-filter-area').getByText('-- Select --').first();
    this.searchStatusDropdown = page.locator('.oxd-table-filter-area').getByText('-- Select --').last();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.userTableRows = page.locator('.oxd-table-card');
    this.noRecordsFound = page.getByText('No Records Found');
    this.recordCount = page.locator('.orangehrm-horizontal-padding span').first();

    this.userRoleDropdown = page.locator('.oxd-select-text').first();
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');
    this.statusToggle = page.locator('.oxd-select-text').nth(1);
    this.usernameField = page.locator('input[name="userName"]');
    this.passwordField = page.locator('input[name="password"]');
    this.confirmPasswordField = page.locator('input[name="confirmPassword"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async open() {
    await this.goto('/web/index.php/admin/viewSystemUsers');
    await this.waitForSpinnerToDisappear();
  }

  async expectLoaded() {
    await expect(this.pageHeader).toHaveText('Admin');
  }

  async searchByUsername(username: string) {
    await this.searchUsernameInput.fill(username);
    await this.searchButton.click();
    await this.waitForSpinnerToDisappear();
  }

  async addUser(opts: {
    role: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
  }) {
    await this.addButton.click();
    await this.waitForSpinnerToDisappear();

    await this.userRoleDropdown.click();
    await this.page.getByRole('option', { name: opts.role }).click();

    await this.employeeNameInput.fill(opts.employeeName);
    await this.page.locator('.oxd-autocomplete-option').first().click();

    await this.statusToggle.click();
    await this.page.getByRole('option', { name: opts.status }).click();

    await this.usernameField.fill(opts.username);
    await this.passwordField.fill(opts.password);
    await this.confirmPasswordField.fill(opts.password);

    await this.saveButton.click();
  }

  async deleteFirstSearchResult() {
    await this.page.locator('.oxd-table-card .bi-trash, .oxd-icon.bi-trash').first().click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  }

  async getResultRowCount(): Promise<number> {
    await this.waitForSpinnerToDisappear();
    return this.userTableRows.count();
  }
}
