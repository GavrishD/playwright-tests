import { test, expect } from "@playwright/test";

test.use({
  storageState: "playwright/.auth/user.json",
});

test.describe("Cars API - POST /api/cars", () => {
  test("Should create a car with valid data", async ({ request }) => {
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 1000,
    };

    let carId: number | undefined;

    try {
      const response = await request.post("/api/cars", {
        data: carData,
      });

      const responseBody = await response.json();

      carId = responseBody.data?.id;

      expect(response.status()).toBe(201);
      expect(responseBody.status).toBe("ok");
      expect(responseBody.data.carBrandId).toBe(carData.carBrandId);
      expect(responseBody.data.carModelId).toBe(carData.carModelId);
      expect(responseBody.data.mileage).toBe(carData.mileage);
    } finally {
      if (carId !== undefined) {
        const deleteResponse = await request.delete(`/api/cars/${carId}`);

        expect(deleteResponse.ok()).toBeTruthy();
      }
    }
  });

  test("Should reject car with invalid brand ID", async ({ request }) => {
    const invalidCarData = {
      carBrandId: 0,
      carModelId: 1,
      mileage: 1000,
    };

    const response = await request.post("/api/cars", {
      data: invalidCarData,
    });

    const responseBody = await response.json();

    console.log("Invalid brand response status:", response.status());
    console.log("Invalid brand response body:", responseBody);

    expect(response.status()).toBe(404);
    expect(responseBody.status).toBe("error");
    expect(responseBody.message).toBe("Brand not found");
  });

  test("Should reject car with negative mileage", async ({ request }) => {
    const invalidCarData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: -1,
    };

    const response = await request.post("/api/cars", {
      data: invalidCarData,
    });

    const responseBody = await response.json();

    console.log("Negative mileage response status:", response.status());
    console.log("Negative mileage response body:", responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody.status).toBe("error");
    expect(responseBody.message).toBe("Mileage has to be from 0 to 999999");
  });
});
