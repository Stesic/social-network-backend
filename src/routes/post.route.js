const express = require("express");
const Post = require("../library/models/post.model");
const User = require("../library/models/user.model");

const router = new express.Router();
const getRequest = require("../library/requests/get.request");
const postRequest = require("../library/requests/post.request");
const patchRequest = require("../library/requests/patch.request");
const deleteRequest = require("../library/requests/delete.request");

//GET ALL POSTS
router.get("/posts", async (req, res) => {
  getRequest.getAll(req, res, Post, "src");
});

//GET SINGLE POST BY ID
router.get("/posts/:id", async (req, res) => {
  getRequest.getSingle(req, res, Post);
});

router.get("/posts/:id/comments", async (req, res) => {
  getRequest.getRelationAll(req, res, Post, "comments");
});

//POST-CREATE NEW POST
router.post("/posts", async (req, res) => {
  postRequest.postNew(req, res, Post);
});

//PATCH UPDATE POST
router.patch("/posts/:id", async (req, res) => {
  const allowedUpdates = ["type", "url"];
  patchRequest.update(req, res, Post, allowedUpdates);
});

//DELETE SINGLE POST
router.delete("/posts/:id", async (req, res) => {
  deleteRequest.deleteOne(req, res, Post);
});

module.exports = router;

// // all posts of specific user defined by id
// router.get("/posts/:id", authMiddleware, async (req, res) => {
//   const limit = Number.parseInt(req.query.limit) || 10;
//   const offset = Number.parseInt(req.query.offset) || 0;
//   const id = req.params.id;
//   try {
//     const user = await User.findById(id);

//     const userPosts = await user.populate("posts").execPopulate();
//     console.log(userPosts.posts);

//     if (!userPosts) {
//       res.status(404).send("Posts not found");
//       return;
//     }
//     res.status(200).send(userPosts.posts);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });
