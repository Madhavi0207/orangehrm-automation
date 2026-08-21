import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly loadingSpinner: Locator;
  readonly toastMessage: Locator;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
    this.toastMessage = page.locator(".oxd-toast-content");
    this.userDropdown = page.locator(".oxd-userdropdown-tab");
    this.logoutLink = page.getByRole("menuitem", { name: "Logout" });
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForSpinnerToDisappear() {
    await this.loadingSpinner
      .waitFor({ state: "detached", timeout: 15_000 })
      .catch(() => {});
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }

  async expectToastContains(text: string) {
    await expect(this.toastMessage).toContainText(text, { timeout: 10_000 });
  }

  async searchByText(searchIcon: Locator) {
    await searchIcon.click();
  }
}
