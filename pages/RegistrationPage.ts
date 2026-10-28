import type { Page, Locator } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly signInButton: Locator;
  readonly registrationButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.registrationButton = page.getByRole("button", {
      name: "Registration",
    });
    this.registerButton = page.getByRole("button", {
      name: "Register",
      exact: true,
    });
  }

  async openRegistrationForm(): Promise<void> {
    await this.page.goto("/");
    await this.signInButton.click();
    await this.registrationButton.click();
  }

  async fillRegistrationForm(
    name: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async submitRegistrationForm(): Promise<void> {
    await this.registerButton.click();
  }
}
