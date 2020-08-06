const express = require("express");
const multer = require("multer");

const Post = require("../library/models/post.model");
const Comment = require("../library/models/comment.model");

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
// router.post("/posts", async (req, res) => {
//   postRequest.postNew(req, res, Post);
// });

//PATCH UPDATE POST
router.patch("/posts/:id", async (req, res) => {
  const allowedUpdates = ["type", "src"];
  patchRequest.update(req, res, Post, allowedUpdates);
});

//DELETE SINGLE POST
router.delete("/posts/:id", async (req, res) => {
  deleteRequest.deleteOne(req, res, Post, Comment, "comments");
});

////
const uploadFile = multer({
  // dest: "src/images",

  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    // console.log(req.params.id);
    const originalFileName = file.originalname.toLowerCase();
    if (!originalFileName.match(/\.(jpg|png|jfif)$/)) {
      cb(new Error("File must be .img or .png"));
    }

    cb(null, true);
  },
});

router.post("/posts", uploadFile.single("image"), async (req, res) => {
  try {
    const postType = req.query.type;

    if (postType === "image") {
      const image = req.file.buffer;

      const imagePost = new Post({
        type: "image",
        src: image,
        owner: req.user._id,
      });

      await imagePost.save();
      res
        .status(201)
        .send({ data: "The record has been successfully created." });

      return;
    }

    postRequest.postNew(req, res, Post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
