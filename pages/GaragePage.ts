import { Page, Locator } from "@playwright/test";

export class GaragePage {
  readonly page: Page;
  readonly garageTitle: Locator;
  readonly addCarButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.garageTitle = page.getByRole("heading", {
      name: "Garage",
    });

    this.addCarButton = page.getByRole("button", {
      name: "Add car",
    });
  }

  async open(): Promise<void> {
    await this.page.goto("/panel/garage");
  }
}
