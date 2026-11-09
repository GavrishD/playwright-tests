import { test, expect } from "@playwright/test";

test.use({
  storageState: "playwright/.auth/user.json",
});

test("Profile displays mocked user data", async ({ page }) => {
  const mockedProfile = {
    status: "ok",
    data: {
      userId: 404193,
      photoFilename: "default-user.png",
      name: "Hermione",
      lastName: "Granger",
    },
  };

  await page.route("**/api/users/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedProfile),
    });
  });

  await page.goto("/panel/profile");

  await expect(
    page.getByText("Hermione Granger", { exact: true })
  ).toBeVisible();
});
