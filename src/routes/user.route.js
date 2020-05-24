const express = require("express");
const User = require("../library/models/user.model");

const getRequest = require("../library/requests/get.request");
const patchRequest = require("../library/requests/patch.request");
const deleteRequest = require("../library/requests/delete.request");

const router = express.Router();

//GET ALL USERS
router.get("/users", async (req, res) => {
  getRequest.getAll(req, res, User, "fullName", false);
});

//GET ME - LOGGED USER
router.get("/users/me/", async (req, res) => {
  try {
    const me = req.user;
    me.password = "*******";
    res.status(200).send(me);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//GET SINGLE USER BY ID
router.get("/users/:id", async (req, res) => {
  getRequest.getSingle(req, res, User);
});

//GET USER POSTS

router.get("/users/:id/posts", async (req, res) => {
  getRequest.getRelationAll(req, res, User, "posts");
});

//GET USER COMMENTS
router.get("/users/:id/comments", async (req, res) => {
  getRequest.getRelationAll(req, res, User, "comments");
});

//GET USER SENT MESSAGES
router.get("/users/:id/sent-messages", async (req, res) => {
  getRequest.getRelationAll(req, res, User, "sentMessages");
});

//GET USER RECEIVED MESSAGES
router.get("/users/:id/received-messages", async (req, res) => {
  getRequest.getRelationAll(req, res, User, "receivedMessages");
});

//PATCH UPDATE USER
router.patch("/users/:id", async (req, res) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "avatarUrl",
    "about",
    "prefix",
  ];
  patchRequest.update(req, res, User, allowedUpdates);
});

//DELETE SINGLE USER
router.delete("/users/:id", (req, res) => {
  deleteRequest.deleteOne(req, res, User);
});

module.exports = router;
