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

// const Post = require("./library/models/post.model");
// const User = require("./library/models/user.model");
// const Auth = require("./library/models/auth.model");
// const Comment = require("./library/models/comment.model");
// const main = async () => {
//   // await User.deleteMany({});
//   User.collection.drop();
//   // Post.collection.drop();
//   Auth.collection.drop();
//   // Comment.collection.drop();
// };
// main();
// const main = async () => {
//   //find post owner
//   // const post = await Post.findById("5ea1507fc45e241f78bf62b1");
//   // const postOwner = await post
//   //   .populate({
//   //     path: "owner",
//   //     match: "req.query....",
//   //     options: {
//   //       limit: parseInt(req.query.limit),
//   //       skip: parseInt(req.query.skip), //preksakanje stranica
//   //       offset: parseInt(req.query.offset),
//   //       sort: {
//   //         createdAt: -1, // -1 desc, 1 asc
//   //       },
//   //     },
//   //   })
//   //   .execPopulate();

//   // find user posts
//   const user = await User.findById("5ea3fca7a4856017b024b66d");
//   const userPosts = await user.populate("posts").execPopulate();
//   const comm = await userPosts.populate("comments").execPopulate();
//   // console.log(userPosts.posts);
//   // console.log(user.comments);
//   // console.log(user.posts);
//   console.log(userPosts.posts);
// };
// main();
