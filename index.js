const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("./database.js");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
