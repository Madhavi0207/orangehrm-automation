import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AdminPage } from "../pages/AdminPage";
import { credentials } from "../data/testData";

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
  loggedInPage: DashboardPage; // dashboard after auto-login
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(credentials.valid.username, credentials.valid.password);
    const dashboard = new DashboardPage(page);
    await dashboard.expectLoaded();
    await use(dashboard);
  },
});

export { expect } from "@playwright/test";
