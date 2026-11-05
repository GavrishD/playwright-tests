import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("Authenticate test user", async ({ page }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error("Test user credentials are missing in .env");
  }

  await page.goto("/");

  await page.getByRole("button", { name: "Sign In" }).click();

  await page.locator("#signinEmail").fill(email);
  await page.locator("#signinPassword").fill(password);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/panel\/garage/);

  await page.context().storageState({ path: authFile });
});
