import { test, expect } from "../fixtures/registration.fixture";

test.describe("Registration form", () => {
  test.describe.configure({ mode: "parallel" });

  test("Successful user registration", async ({ page, registrationPage }) => {
    const uniqueEmail = `anna${Date.now()}@example.com`;

    await registrationPage.fillRegistrationForm(
      "Anna",
      "Smith",
      uniqueEmail,
      "Password123",
      "Password123"
    );

    await registrationPage.submitRegistrationForm();

    await expect(page.getByRole("heading", { name: "Garage" })).toBeVisible();
  });

  test("Registration with empty Name", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm(
      "",
      "Smith",
      `anna${Date.now()}@example.com`,
      "Password123",
      "Password123"
    );

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
  });

  test("Registration with one character in Name", async ({
    registrationPage,
  }) => {
    await registrationPage.fillRegistrationForm(
      "A",
      "Smith",
      `anna${Date.now()}@example.com`,
      "Password123",
      "Password123"
    );

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
  });

  test("Registration with 21 characters in Name", async ({
    registrationPage,
  }) => {
    await registrationPage.fillRegistrationForm(
      "A".repeat(21),
      "Smith",
      `anna${Date.now()}@example.com`,
      "Password123",
      "Password123"
    );

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
  });

  test("Registration with numbers in Name", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm(
      "Anna123",
      "Smith",
      `anna${Date.now()}@example.com`,
      "Password123",
      "Password123"
    );

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
  });

  test("Registration with empty Last name", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm(
      "Anna",
      "",
      `anna${Date.now()}@example.com`,
      "Password123",
      "Password123"
    );

    await expect(registrationPage.lastNameInput).toHaveClass(/is-invalid/);
  });

  test("Registration with invalid Email", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm(
      "Anna",
      "Smith",
      "invalid-email",
      "Password123",
      "Password123"
    );

    await expect(registrationPage.emailInput).toHaveClass(/is-invalid/);
  });

  test("Registration with short Password", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm(
      "Anna",
      "Smith",
      `anna${Date.now()}@example.com`,
      "Pass1",
      "Pass1"
    );

    await expect(registrationPage.passwordInput).toHaveClass(/is-invalid/);
  });

  test("Registration with mismatched passwords", async ({
    registrationPage,
  }) => {
    await registrationPage.fillRegistrationForm(
      "Anna",
      "Smith",
      `anna${Date.now()}@example.com`,
      "Password123",
      "Password456"
    );

    await registrationPage.repeatPasswordInput.blur();

    await expect(registrationPage.repeatPasswordInput).toHaveClass(
      /is-invalid/
    );
  });

  test("Registration with empty Password", async ({ registrationPage }) => {
    await registrationPage.fillRegistrationForm(
      "Anna",
      "Smith",
      `anna${Date.now()}@example.com`,
      "",
      ""
    );

    await registrationPage.passwordInput.blur();

    await expect(registrationPage.passwordInput).toHaveClass(/is-invalid/);
  });
});
