const express = require("express");

const nodemailer = require("nodemailer");
const uniqueString = require("unique-string");

const router = express.Router();
const User = require("../library/models/user.model");

router.post("/auth/register", async (req, res) => {
  try {
    const email = req.body.email;

    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      res.status(409).send({ error: "User already exist!!!" });
      return;
    }

    const registerData = await new User(req.body).save();

    const regToken = registerData.generateAuthToken();

    if (regToken) {
      res.status(200).send({ token: regToken });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    let reqEmail = req.body.email;
    let reqPassword = req.body.password;
    if (!reqEmail || !reqPassword) {
      res.status(400).send({ error: "Email and password required!!!" });
      return;
    }

    const userData = await User.findByCredentials(User, reqEmail, reqPassword);
    const userToken = userData.token;

    if (userToken) {
      res.status(200).send({ token: userToken });
    } else {
      res.status(404).send("User not found, wrong email!!!");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

async function sendNewPasswordToUser(email, newPassword) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "socialnetworkrobot@gmail.com", // generated ethereal user
      pass: "123.abc.123", // generated ethereal password
    },
  });
  // send mail
  let info = await transporter.sendMail({
    from: "<socialnetworkrobot@gmail.com>", // sender address
    to: email, // list of receivers  // reqBody.email
    subject: "Password reset", // Subject line
    //text: `Your new password is ${newPassword}. Login again https://social-network-front.netlify.app/`, // plain text body
    html: `<h5>Your new password is ${newPassword}</h5><p>Login again https://social-network-front.netlify.app/</p>`, // html body
  });
  return info;
}

router.patch("/auth/password/reset", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.status(404).send({ error: "User Not Exist" });
      return;
    }
    const uniquePass = uniqueString().substr(0, 8);
    user.password = uniquePass;
    user.save();
    sendNewPasswordToUser(email, user.password).catch(console.error);
    res
      .status(200)
      .send({ data: "Password changed! Check your mail for new password." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch("/auth/password/change", async (req, res) => {
  try {
    let reqEmail = req.body.email;
    let reqPassword = req.body.password;
    let newPassword = req.body.newPassword;
    const userData = await User.findByCredentials(User, reqEmail, reqPassword);
    const user = userData.user;

    if (user) {
      user.password = newPassword;
      user.save();
      res.status(200).send({ data: "Password changed!" });
    } else {
      res.status(404).send("User not found, wrong email");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
