const request = require("supertest");
const app = require("./../../app.js");
const knex = require("knex");
const db = knex(require("./../../db/knexfile.js")[process.env.NODE_ENV]);

describe("PUT /users/:id", () => {
  beforeAll(async () => {
    await db("users").insert({
      username: "test",
      email: "test",
      createdBy: "Admin",
    });
  });
  afterAll(async () => {
    await db("users").where("username", "Mohamed").del();
  });
  test("Returns success message when username has been updated", async () => {
    const updatedUsername = {
      username: "Mohamed",
    };

    const response = await request(app)
      .put(`/users/test`)
      .send(updatedUsername);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Username successfully changed");
    const checkUpdateInDb = await db("users").where("username", "Mohamed");
    expect(checkUpdateInDb).toBeInstanceOf(Array);
    expect(checkUpdateInDb[0]).toBeInstanceOf(Object);
  });

  test("Return 404 error if user doesn't exist", async () => {
    const updatedUsername = {
      username: "Mohamed",
    };
    const randomUsername = "momo";
    const response = await request(app)
      .put(`/users/${randomUsername}`)
      .send(updatedUsername);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User doesn't exists");
  });
});
