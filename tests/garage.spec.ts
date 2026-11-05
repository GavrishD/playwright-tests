import { test, expect } from "../fixtures/garage.fixture";

test("Authorized user can open Garage page", async ({ userGaragePage }) => {
  await expect(userGaragePage.garageTitle).toBeVisible();

  await expect(userGaragePage.addCarButton).toBeVisible();
});
