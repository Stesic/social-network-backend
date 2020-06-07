const http = require("http");
const socketIo = require("socket.io");
const messagesSockets = require("./message.socket");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  // const token = socket.handshake.query.token;
  let unrMessInt;
  let unrMessSenderInt;
  let allMessInt;
  socket.on("unreadMessagesNumber", function (data) {
    unrMessInt = setInterval(
      () =>
        messagesSockets.getUnreadMessagesNumber(
          socket,
          data,
          "unreadMessagesNumber"
        ),
      2000
    );
  });

  socket.on("unreadMessagesNumberFromSingleSender", function (data) {
    unrMessSenderInt = setInterval(
      () =>
        messagesSockets.getUnreadMessagesNumberFromSingleSender(
          socket,
          data,
          "unreadMessagesNumberFromSingleSender"
        ),
      2000
    );
  });

  socket.on("allMessages", async function (data) {
    allMessInt = setInterval(
      () => messagesSockets.getAllMessages(socket, data, "allMessages"),
      2000
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(unrMessInt);
    clearInterval(unrMessSenderInt);
    clearInterval(allMessInt);
  });
});

module.exports = server;
