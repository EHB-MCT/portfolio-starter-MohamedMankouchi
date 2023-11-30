const request = require("supertest");
const app = require("./../../app.js");
describe("GET /users", () => {
  test("Returns all the user record", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
