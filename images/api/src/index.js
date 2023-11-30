<<<<<<< Updated upstream
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const knex = require("knex");
const db = knex(require("./db/knexfile.js")[process.env.NODE_ENV]);

app.use(express.json());
app.use(cors());
app.get("/users", async (req, res) => {
  const users = await db("users").select();
  res.json(users);
});

app.get("/", async (req, res) => {
  res.send({ message: "hello" });
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userRemoved = await db("users").where("id", userId).del();
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

  await db("users").insert(newUser);

  res.status(200).send("User successfully added");
});

app.put("/users/:id", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send("Please fill in the missing fields");
  }
  const userId = req.params.id;
  await db("users").where("id", userId).update({ username: req.body.username });
  res.status(200).send("Username successfully changed");
});
=======
const app = require("./app");
>>>>>>> Stashed changes

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
