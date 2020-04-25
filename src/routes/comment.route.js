const express = require("express");
const Comment = require("../library/models/comment.model");

const router = new express.Router();
const getRequest = require("../library/requests/get.request");
const postRequest = require("../library/requests/post.request");
const patchRequest = require("../library/requests/patch.request");
const deleteRequest = require("../library/requests/delete.request");

//GET ALL COMMENTS
router.get("/comments", async (req, res) => {
  getRequest.getAll(req, res, Comment, "body");
});

//GET SINGLE COMMENT BY ID
router.get("/comments/:id", async (req, res) => {
  getRequest.getSingle(req, res, Comment);
});

//POST-CREATE NEW COMMENT
router.post("/comments", async (req, res) => {
  postRequest.postNew(req, res, Comment);
});

//PATCH UPDATE COMMENT
router.patch("/comments/:id", async (req, res) => {
  const allowedUpdates = ["body"];
  patchRequest.update(req, res, Comment, allowedUpdates);
});

//DELETE SINGLE COMMENT
router.delete("/comments/:id", async (req, res) => {
  deleteRequest.deleteOne(req, res, Comment);
});

module.exports = router;
