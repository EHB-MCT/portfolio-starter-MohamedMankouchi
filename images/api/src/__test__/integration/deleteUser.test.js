const request = require("supertest");
const app = require("../../app.js");
const knex = require("knex");
const db = knex(require("../../db/knexfile.js")[process.env.NODE_ENV]);

describe("DELETE /users", () => {
  beforeAll(async () => {
    await db("users").insert({
      username: "test",
      email: "test",
    });
  });

  test("Should return success message after removing user fom database", async () => {
    const response = await request(app).delete(`/users/test`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User removed");
    const checkUserExists = await db("users").where("username", "test").first();
    expect(checkUserExists).toBeUndefined();
  });

  test("Returning 404 if user doesn't exist", async () => {
    const randomUsername = "momo";
    const response = await request(app)
      .delete(`/users/${randomUsername}`)
      .send(randomUsername);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });
});
