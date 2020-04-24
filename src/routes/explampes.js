const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");
//Post /user

router.post("/user", authMiddleware, (req, res) => {
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
router.get("/user", authMiddleware, async (req, res) => {
  try {
    if (!req.query.email) {
      const usersList = await UserModel.find();

      res.json(usersList);
      return;
    }

    const singleUser = await UserModel.findOne({
      email: req.query.email,
    });
    if (singleUser) {
      res.json(singleUser);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get me - logged user
router.get("/user/me", authMiddleware, async (req, res) => {
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

router.put("/user", authMiddleware, (req, res) => {
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

router.patch("/user/:id", authMiddleware, async (req, res) => {
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

router.delete("/user/:id", authMiddleware, (req, res) => {
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
