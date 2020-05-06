const express = require("express");

const Post = require("../library/models/post.model");

const getRequest = require("../library/requests/get.request");
const postRequest = require("../library/requests/post.request");
const patchRequest = require("../library/requests/patch.request");
const deleteRequest = require("../library/requests/delete.request");

const router = new express.Router();

//GET ALL POSTS
router.get("/posts", async (req, res) => {
  getRequest.getAll(req, res, Post, "src", false);
});

//GET ALL POSTS BY TYPE
router.get("/posts/type", async (req, res) => {
  getRequest.getAll(req, res, Post, "type", true);
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
