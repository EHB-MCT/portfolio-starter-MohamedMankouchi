const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const knex = require("knex");
const db = knex(require("./db/knexfile")[process.env.NODE_ENV]);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

async function users() {
  const users = await db("users").select();
  console.log(users);
}
users();

io.on("connection", async (socket) => {
  console.log("connected");
});

server.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
