const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const authMiddleware = require("../library/middleware/auth.middleware");

const Auth = require("../library/models/auth.model");
const User = require("../library/models/user.model");

router.post("/auth/register", async (req, res) => {
  try {
    const email = req.body.email;
    // const userExist = await Auth.findOne({
    //   email,
    // });
    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      res.status(400).send({ error: "User already exist!!!" });
      return;
    }

    // req.body.password = await bcrypt.hash(req.body.password, 8); //umesto u pre(save)...zato sto se i kod patch user promeni password
    // const registerData = await new Auth(req.body).save();
    const registerData = await new User(req.body).save();

    // await new User(req.body).save();
    const regToken = registerData.generateAuthToken();

    if (regToken) {
      res.status(200).send({ token: regToken });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    let reqEmail = req.body.email;
    let reqPassword = req.body.password;
    if (!reqEmail || !reqPassword) {
      throw new Error("404-email and password required");
    }

    // const userToken = await Auth.findByCredentials(Auth, reqEmail, reqPassword);
    const userToken = await User.findByCredentials(User, reqEmail, reqPassword);

    if (userToken) {
      // res.send(userToken);
      res.status(200).send({ token: userToken });
    } else {
      res.status(404).send("User not found, wrong email");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
