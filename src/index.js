const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");
const authMiddleware = require("./library/middleware/auth.middleware");

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

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
