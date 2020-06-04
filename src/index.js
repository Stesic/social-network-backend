const express = require("express");

const http = require("http");
const socketIo = require("socket.io");

const cors = require("cors");
const User = require("./library/models/user.model");
require("./db/mongoose");

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");
const messageRoute = require("./routes/message.route");
const authMiddleware = require("./library/middleware/auth.middleware");

const messagesSockets = require("./library/sokets/message.socket");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger.json");

const app = express();

const PORT = process.env.PORT || 5500;

app.use(cors());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authMiddleware);

//to have access to req.body in entire project
app.use(express.json());

app.use(authRoute);
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(messageRoute);
app.use(express.static("public"));

//handle 404
app.use((req, res, next) => {
  res.status(404).send("page not fount, 404");
  next();
});

//handle 500
app.use((error, req, res, next) => {
  res.status(500).send({ error: error.message });
  next();
});

const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  // if (interval) {
  //   clearInterval(interval);
  // }
  // const token = socket.handshake.query.token;

  socket.on("unreadMessagesNumber", function (data) {
    interval = setInterval(
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
    interval = setInterval(
      () =>
        messagesSockets.getUnreadMessagesNumberFromSingleSender(
          socket,
          data,
          "unreadMessagesNumberFromSingleSender"
        ),
      2000
    );
  });

  // socket.on("allMessages", async function (data) {
  //   interval = setInterval(() => {
  //     messagesSockets.getAllSentMessagesToReceiver(
  //       socket,
  //       {
  //         senderID: data.senderID,
  //         receiverID: data.receiverID,
  //       },
  //       "allMessages"
  //     );
  //     messagesSockets.getAllReceiverMessagesFromSender(
  //       socket,
  //       {
  //         senderID: data.receiverID,
  //         receiverID: data.senderID,
  //       },
  //       "allMessages"
  //     );
  //   }, 2000);
  // });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

// app.listen(PORT, () => {
//   console.log(`Server has started on ${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
