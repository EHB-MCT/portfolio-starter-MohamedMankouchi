require("dotenv").config();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "users",
  },
});

async function main() {
  try {
    const exists = await knex.schema.hasTable("users");
    if (!exists) {
      await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username");
        table.string("email");
      });
      await knex("users").insert([
        { username: "Tam", email: "tbastistini13@admin.ch" },
        { username: "Anna-diana", email: "acondie14@accuweather.com" },
        { username: "Danyelle", email: "dlevene15@zdnet.com" },
        { username: "Nana", email: "newin16@gnu.org" },
        { username: "Jammal", email: "jtowse17@mac.com" },
        { username: "Gery", email: "gwards18@furl.net" },
        { username: "Emmi", email: "edenton19@livejournal.com" },
        { username: "Leeland", email: "ldurtnall1a@51.la" },
        { username: "Michaelina", email: "msurman1b@fc2.com" },
        { username: "Forrest", email: "fhalsted1c@bing.com" },
        { username: "Wallace", email: "wgraveson1d@a8.net" },
      ]);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
module.exports = knex;
