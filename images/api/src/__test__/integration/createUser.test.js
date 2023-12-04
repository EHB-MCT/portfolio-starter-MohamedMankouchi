const request = require("supertest");
const app = require("../../app.js");
const knex = require("knex");
const db = knex(require("../../db/knexfile.js")[process.env.NODE_ENV]);

describe("POST /users", () => {
  afterAll(async () => {
    await db("users").where("username", "mohamed").del();
  });
  test("Gets back success message when creating user", async () => {
    const user = {
      username: "mohamed",
      email: "mo@gmail.com",
      createdBy: "Admin",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(200);
    expect(response.body).toBe("User successfully added");
  });

  test("Gets 400 back when fields are empty", async () => {
    const user = {
      username: "",
      email: "",
      createdBy: "",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Please fill in the missing fields",
    });
  });

  test("Gets 400 back when user already exists in the db", async () => {
    const user = {
      username: "mohamed",
      email: "mo@gmail.com",
      createdBy: "Admin",
    };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "User already exists" });
  });
});
