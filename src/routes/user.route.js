const express = require("express");
const router = express.Router();
const User = require("../library/models/user.model");

const getRequest = require("../library/requests/get.request");
const postRequest = require("../library/requests/post.request");
const patchRequest = require("../library/requests/patch.request");
const deleteRequest = require("../library/requests/delete.request");

//GET ALL USERS
router.get("/users", async (req, res) => {
  getRequest.getAll(req, res, User);
});

//GET SINGLE USER BY ID
router.get("/users/:id", async (req, res) => {
  getRequest.getSingle(req, res, User);
});

//Post /user

router.post("/user", (req, res) => {
  //req body

  if (!req.body) {
    return res.status(404).send("Request body is missing - 404 error");
  }

  let model = new UserModel(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get me - logged user
router.get("/user/me", async (req, res) => {
  try {
    const me = req.user;
    console.log(me);
    console.log("me");
    res.status(200).send(me);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user - PUT REQUEST

router.put("/user", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("email missing - 400");
  }

  UserModel.findOneAndUpdate(
    {
      email: req.query.email,
    },
    req.body,
    { new: true, runValidators: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//update  user with patch - PUT REQUEST

router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name, email, age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send("Error: invalid body ");
  }

  try {
    if (!req.params.id) {
      return res.status(400).send("id missing - 400");
    }
    // const updatedUser = await UserModel.findOneAndUpdate(
    //   { _id: req.params.id },
    //   req.body,
    //   { new: true, runValidators: true }
    // );ako koristimo middleware pre ili neki drugi ovo ne mozemo ovako da update nego kao ispod
    const user = UserModel.findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    }); //ovako raditi za svaki slucaj ako budemo dodali middleware za ovu rutu

    if (!updatedUser) {
      res.status(404).send("user not found");
    } else {
      res.status(201).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete user - DELETE REQUEST

router.delete("/user/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("id missing - 400");
  }

  UserModel.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
