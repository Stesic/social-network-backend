const express = require("express");
const multer = require("multer");

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

router.patch("/users/:id/last-active", async (req, res) => {
  const allowedUpdates = ["lastActive"];
  patchRequest.update(req, res, User, allowedUpdates);
});

//DELETE SINGLE USER
router.delete("/users/:id", (req, res) => {
  deleteRequest.deleteOne(req, res, User);
});

///

const uploadFile = multer({
  // dest: "src/images",

  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    // console.log(req.params.id);
    const originalFileName = file.originalname.toLowerCase();
    if (!originalFileName.match(/\.(jpg|png|jfif)$/)) {
      cb(new Error("File must be .jpg or .png or .jfif"));
    }

    cb(null, true);
  },
});

router.post(
  "/users/:id/image",
  uploadFile.single("image"),
  async (req, res) => {
    try {
      const image = req.file.buffer;
      req.user.avatarUrl = image;
      const updatedUser = await req.user.save();

      if (updatedUser) {
        res.status(201).send({ data: "Image successfully added" });
      } else {
        res.status(400).send("Error: user image not added!");
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

module.exports = router;
