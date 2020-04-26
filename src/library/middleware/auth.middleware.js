const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Auth = require("../models/auth.model");

const auth = async (req, res, next) => {
  try {
    if (req.path === "/auth/register" || req.path === "/auth/login") {
      next();
      return;
    }

    const authToken = req.header("Authorization").replace("Bearer ", "");
    const apiKey = req.header("x-api-key");

    const userData = jwt.verify(authToken, apiKey);

    const user = await User.findOne({
      email: userData.email,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed " });
  }
};

module.exports = auth;
