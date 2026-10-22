import { test, expect } from "@playwright/test";

test.describe("Registration form", () => {
  test("Successful user registration", async ({ page }) => {
    const email = `aqa-${Date.now()}@test.com`;
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();
    await expect(page.locator("#signupName")).toBeVisible();

    await page.locator("#signupName").fill("Daria");
    await page.locator("#signupLastName").fill("Test");
    await page.locator("#signupEmail").fill(email);
    await page.locator("#signupPassword").fill("Test12345");
    await page.locator("#signupRepeatPassword").fill("Test12345");

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeEnabled();

    await page.getByRole("button", { name: "Register", exact: true }).click();

    await expect(page).toHaveURL(/\/panel\/garage/);
  });

  test("Registration with empty Name", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const nameInput = page.locator("#signupName");

    await nameInput.fill("Daria");
    await nameInput.clear();
    await page.locator("#signupLastName").click();

    await expect(page.getByText("Name required")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with one character in Name", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const nameInput = page.locator("#signupName");

    await nameInput.fill("D");
    await page.locator("#signupLastName").click();

    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with 21 characters in Name", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const nameInput = page.locator("#signupName");
    const longName = "D".repeat(21);

    await nameInput.fill(longName);
    await page.locator("#signupLastName").click();

    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with numbers in Name", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const nameInput = page.locator("#signupName");

    await nameInput.fill("Daria123");
    await page.locator("#signupLastName").click();

    await expect(page.getByText("Name is invalid")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with empty Last name", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const lastNameInput = page.locator("#signupLastName");

    await lastNameInput.fill("Test");
    await lastNameInput.clear();
    await page.locator("#signupEmail").click();

    await expect(page.getByText("Last name required")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with invalid Email", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const emailInput = page.locator("#signupEmail");

    await emailInput.fill("invalidemail.com");
    await page.locator("#signupPassword").click();

    await expect(page.getByText("Email is incorrect")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with short Password", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const passwordInput = page.locator("#signupPassword");

    await passwordInput.fill("Test123");
    await page.locator("#signupRepeatPassword").click();

    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with mismatched passwords", async ({ page }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    await page.locator("#signupPassword").fill("Test12345");
    await page.locator("#signupRepeatPassword").fill("Test54321");

    await page.locator("#signupName").click();

    await expect(page.getByText("Passwords do not match")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });

  test("Registration with Password without uppercase letter", async ({
    page,
  }) => {
    await page.goto("https://qauto.forstudy.space/");

    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("button", { name: "Registration" }).click();

    const passwordInput = page.locator("#signupPassword");

    await passwordInput.fill("test12345");
    await page.locator("#signupRepeatPassword").click();

    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Register", exact: true })
    ).toBeDisabled();
  });
});
