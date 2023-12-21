/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const userExists = await knex("users").select("*");
  if (userExists.length == 0) {
    await knex("users").insert([
      { username: "Tam", email: "tbastistini13@admin.ch", createdBy: "Admin" },
      {
        username: "Anna-diana",
        email: "acondie14@accuweather.com",
        createdBy: "Admin",
      },
      {
        username: "Danyelle",
        email: "dlevene15@zdnet.com",
        createdBy: "Admin",
      },
      { username: "Nana", email: "newin16@gnu.org", createdBy: "Admin" },
      { username: "Jammal", email: "jtowse17@mac.com", createdBy: "Admin" },
      { username: "Gery", email: "gwards18@furl.net", createdBy: "Admin" },
      {
        username: "Emmi",
        email: "edenton19@livejournal.com",
        createdBy: "Admin",
      },
      { username: "Leeland", email: "ldurtnall1a@51.la", createdBy: "Admin" },
      {
        username: "Michaelina",
        email: "msurman1b@fc2.com",
        createdBy: "Admin",
      },
      { username: "Forrest", email: "fhalsted1c@bing.com", createdBy: "Admin" },
      { username: "Wallace", email: "wgraveson1d@a8.net", createdBy: "Admin" },
    ]);
  }
};
