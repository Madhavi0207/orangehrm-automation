import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  readonly orangeHrmLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.getByRole("textbox", { name: "Username" });
    this.passwordInput = this.page.getByRole("textbox", { name: "Password" });
    this.loginButton = this.page.getByRole("button", { name: "Login" });

    this.orangeHrmLogo = this.page.getByAltText("client brand banner");
  }

  async open() {
    await this.page.goto("/web/index.php/auth/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
