const request = require("supertest");
const app = require("../app");

describe("API Tests", () => {

    test("GET / debe responder redirección", async () => {

    const response = await request(app)
        .get("/");

    expect(response.statusCode).toBe(302);

});

    test("GET /api/products sin token debe responder 401", async () => {

        const response = await request(app)
            .get("/api/products");

        expect(response.statusCode).toBe(401);

    });

});