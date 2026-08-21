import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
  readonly pageHeader: Locator;
  readonly sidebarMenuItems: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator("h6.oxd-topbar-header-breadcrumb-module");
    this.sidebarMenuItems = page.locator(".oxd-main-menu-item");
  }

  async expectLoaded() {
    await expect(this.pageHeader).toHaveText("Dashboard");
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async navigateTo(moduleName: string) {
    await this.page
      .getByRole("link", { name: moduleName, exact: true })
      .click();
  }
}
