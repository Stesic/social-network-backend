const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

//Post /user

router.post("/user", (req, res) => {
  //req body
  console.log(req.body);

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

//get all users GET REQUEST
// router.get("/user", (req, res) => {
//   console.log("ivan");

//   UserModel.find()
//     .then((doc) => {
//       res.json(doc);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

//get single user by name GET REQUEST
router.get("/user", (req, res) => {
  if (!req.query.email) {
    UserModel.find()
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });

    return;
  }
  UserModel.findOne({
    email: req.query.email,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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
