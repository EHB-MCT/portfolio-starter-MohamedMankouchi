/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const userExists = await knex("users").select("*");
  if (userExists.length == 0) {
    await knex("users").insert([
      { username: "Tam", password: "123" },
      { username: "Anna-diana", password: "123" },
      { username: "Danyelle", password: "123" },
      { username: "Nana", password: "123" },
      { username: "Jammal", password: "123" },
      { username: "Gery", password: "123" },
      { username: "Emmi", password: "123" },
      { username: "Leeland", password: "123" },
      { username: "Michaelina", password: "123" },
      { username: "Forrest", password: "123" },
      { username: "Wallace", password: "123" },
    ]);
  }
};
