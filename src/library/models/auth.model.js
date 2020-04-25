const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email!!!");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 7,
    },
    firstName: {
      type: String,
      minlength: 2,
      required: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

AuthSchema.methods.generateAuthToken = function () {
  const user = this;
  const { _id, firstName, lastName, email, createdAt, updatedAt } = user;

  return jwt.sign(
    { _id, firstName, lastName, email, createdAt, updatedAt },
    "1vaHd3v"
  );
};

AuthSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
  next();
});

AuthSchema.statics.findByCredentials = async (model, email, password) => {
  const user = await model.findOne({
    email,
  });
  if (user) {
    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (isPasswordOk) {
      return user.generateAuthToken();
    } else {
      throw new Error("Unable to login");
    }
  } else {
    throw new Error("Unable to login");
  }
};

const AuthModel = mongoose.model("Register", AuthSchema);

module.exports = AuthModel;
