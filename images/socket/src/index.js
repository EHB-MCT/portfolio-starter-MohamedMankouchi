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

let users = [];
io.on("connection", async (socket) => {
  socket.on("connected", (username) => {
    console.log(username);
    const findExistingUser = users.find((el) => el.username == username);
    if (findExistingUser) {
      users = users.filter((el) => el.username != findExistingUser.username);
    }
    users.push({
      socketId: socket.id,
      username: username,
    });

    io.emit("activeUsers", { users, username });
  });
  socket.on("refreshData", async () => {
    let userslist = await db("users").select();
    io.emit("refresh", userslist);
  });
  socket.on("sendCreatedUser", async (data) => {
    console.log(data);
    let existingUser = await db("users")
      .where("username", data.username)
      .first();
    if (existingUser) {
      socket.emit("error", "User already exists");
      return;
    }
    await db("users").insert(data);
    let userslist = await db("users").select();
    console.log(userslist);
    io.emit("getCreatedUsers", userslist);
  });

  socket.on("disconnect", () => {
    console.log(`user with id ${socket.id}`);
    if (users.length != 0) {
      const user = users.find((el) => el.socketId == socket.id);
      if (user) {
        users = users.filter((el) => el.socketId != socket.id);
        io.emit("leftUser", { users, user });
      }
    }
  });
});

server.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
