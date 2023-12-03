/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const userExists = await knex("users").select("*");
  if (userExists.length == 0) {
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
};
