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
  // const limit = Number.parseInt(req.query.limit) || 10;
  // const offset = Number.parseInt(req.query.offset) || 0;
  // try {
  //   const posts = await Post.find().limit(limit).skip(offset);
  //   if (!posts) {
  //     return res.status(404).send("Posts not found");
  //   }
  //   res.status(200).send(posts);
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
  getRequest.getAll(req, res, Post);
});

//GET SINGLE POST BY ID
router.get("/posts/:id", async (req, res) => {
  // const postId = req.params.id;
  // try {
  //   const post = await Post.findById(postId);
  //   if (!post) {
  //     return res.status(404).send("Post not found");
  //   }
  //   res.status(200).send(post);
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
  getRequest.getSingle(req, res, Post);
});

//POST-CREATE NEW POST
router.post("/posts", async (req, res) => {
  // const post = new Post({
  //   ...req.body,
  //   owner: req.user._id,
  // });

  // try {
  //   await post.save();
  //   res.status(201).send(post);
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
  postRequest.postNew(req, res, Post);
});

//PATCH UPDATE POST
router.patch("/posts/:id", async (req, res) => {
  // const updates = Object.keys(req.body);
  // const allowedUpdates = ["type", "url"];

  // const isValidOperation = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );
  // if (!isValidOperation) {
  //   return res
  //     .status(400)
  //     .send("Error: invalid body. You can update only type and url field!!!");
  // }
  // try {
  //   if (!req.params.id) {
  //     return res.status(400).send("id missing - 400");
  //   }
  //   const post = await Post.findById(req.params.id);

  //   if (!post) {
  //     return res.status(404).send("post not found");
  //   }
  //   if (post.owner.toString() !== req.user._id.toString()) {
  //     return res.status(403).send("You are not allowed to change this post");
  //   }

  //   updates.forEach((update) => {
  //     post[update] = req.body[update];
  //   });
  //   post.owner = req.user._id;
  //   res.status(201).send(post);
  //   post.save();
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
  const allowedUpdates = ["type", "url"];
  patchRequest.update(req, res, Post, allowedUpdates);
});

//DELETE SINGLE POST
router.delete("/posts/:id", async (req, res) => {
  // const reqId = req.params.id;
  // if (!reqId) {
  //   return res.status(400).send("id missing - 400");
  // }

  // try {
  //   const post = await Post.findOne({
  //     _id: reqId,
  //   });

  //   if (post.owner.toString() !== req.user._id.toString()) {
  //     return res.status(403).send("You are not allowed to delete this post");
  //   }

  //   res.status(200).send(post);
  //   post.delete();
  //   post.save();
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
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
