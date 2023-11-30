/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const userExists = await knex("users").select("*");
  if (userExists.length == 0) {
    await knex("users").insert([
      { username: "Tam", password: "tbastistini13@admin.ch" },
      { username: "Anna-diana", password: "acondie14@accuweather.com" },
      { username: "Danyelle", password: "dlevene15@zdnet.com" },
      { username: "Nana", password: "newin16@gnu.org" },
      { username: "Jammal", password: "jtowse17@mac.com" },
      { username: "Gery", password: "gwards18@furl.net" },
      { username: "Emmi", password: "edenton19@livejournal.com" },
      { username: "Leeland", password: "ldurtnall1a@51.la" },
      { username: "Michaelina", password: "msurman1b@fc2.com" },
      { username: "Forrest", password: "fhalsted1c@bing.com" },
      { username: "Wallace", password: "wgraveson1d@a8.net" },
    ]);
  }
};
