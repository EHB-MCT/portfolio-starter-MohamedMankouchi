const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("./database.js");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const users = await knex("users").select();
  res.json(users);
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userRemoved = await knex("users").where("id", userId).del();
  if (userRemoved) {
    return res.send("User removed");
  } else {
    return res.send("User not found");
  }
});

app.post("/users", async (req, res) => {
  if (!req.body.username || !req.body.email) {
    return res.status(400).send("Please fill in the missing fields");
  }

  const newUser = {
    username: req.body.username,
    email: req.body.email,
  };

  await knex("users").insert(newUser);

  res.status(200).send("User successfully added");
});

app.put("/users/:id", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send("Please fill in the missing fields");
  }
  const userId = req.params.id;
  await knex("users")
    .where("id", userId)
    .update({ username: req.body.username });
  res.status(200).send("Username successfully changed");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
