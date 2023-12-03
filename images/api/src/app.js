const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const knex = require("knex");
const checkValidInput = require("./../src/__test__/unit/helper.js");
const db = knex(require("./db/knexfile.js")[process.env.NODE_ENV]);

app.use(express.json());
app.use(cors());
app.get("/users", async (req, res) => {
  const users = await db("users").select();
  res.status(200).json(users);
});

app.get("/users/:username", async (req, res) => {
  const username = req.params.username;
  const user = await db("users").where("username", username);

  if (user.length != 0) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ error: "User not found" });
});

app.delete("/users/:username", async (req, res) => {
  const username = req.params.username;

  const user = await db("users").where("username", username);
  if (user.length != 0) {
    await db("users").where("username", username).del();
    return res.status(200).json({ message: "User removed" });
  }

  return res.status(404).json({ error: "User not found" });
});

app.post("/users", async (req, res) => {
  if (!checkValidInput(req.body)) {
    return res.status(400).json({ error: "Please fill in the missing fields" });
  }

  const user = await db("users").where("username", req.body.username);

  if (user.length != 0) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    username: req.body.username,
    email: req.body.email,
  };
  await db("users").insert(newUser);
  res.status(200).json("User successfully added");
});

app.put("/users/:username", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send("Please fill in the missing fields");
  }
  const username = req.params.username;
  const user = await db("users").where("username", username);
  if (user.length == 0) {
    return res.status(404).json({ error: "User doesn't exists" });
  }
  await db("users").where("username", username).update({ username });
  res.status(200).json({ message: "Username successfully changed" });
});

module.exports = app;
