import { test as base } from "@playwright/test";
import { GaragePage } from "../pages/GaragePage";

type GarageFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<GarageFixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      baseURL: process.env.BASE_URL,
      httpCredentials: {
        username: process.env.HTTP_USERNAME ?? "",
        password: process.env.HTTP_PASSWORD ?? "",
      },
      storageState: "playwright/.auth/user.json",
    });

    const page = await context.newPage();
    const garagePage = new GaragePage(page);

    try {
      await garagePage.open();
      await use(garagePage);
    } finally {
      await context.close();
    }
  },
});

export { expect } from "@playwright/test";
