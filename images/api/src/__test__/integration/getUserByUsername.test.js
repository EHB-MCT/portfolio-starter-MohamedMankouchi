const request = require("supertest");
const app = require("../../app.js");
const knex = require("knex");
const db = knex(require("../../db/knexfile.js")[process.env.NODE_ENV]);

describe("GET /users/:username", () => {
  beforeAll(async () => {
    await db("users").insert({
      username: "test",
      password: "test",
    });
  });

  afterAll(async () => {
    await db("users").where("username", "test").del();
  });

  test("Should return user data", async () => {
    const response = await request(app).get(`/users/test`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Returning 404 if user doesn't exist", async () => {
    const randomUsername = "momo";
    const response = await request(app).get(`/users/${randomUsername}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });
});
