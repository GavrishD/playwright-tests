import { test as base, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";

type RegistrationFixtures = {
  registrationPage: RegistrationPage;
};

export const test = base.extend<RegistrationFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await use(registrationPage);
  },
});

export { expect };
