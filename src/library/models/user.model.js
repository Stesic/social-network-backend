const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
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
      // lowercase: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      required: true,
      // lowercase: true,
    },
    avatarUrl: {
      type: String,
      default: "https://via.placeholder.com/900x900",
    },
    about: {
      type: String,
      minlength: 10,
    },
    fullName: {
      type: String,
    },
    prefix: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  user.fullName = `${user.firstName} ${user.lastName}`;
  next();
});

UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const { _id, firstName, lastName, email, createdAt, updatedAt } = user;
  return jwt.sign(
    { _id, firstName, lastName, email, createdAt, updatedAt },
    "1vaHd3v"
  );
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.password.includes("$")) {
    // is patch request
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.statics.findByCredentials = async (model, email, password) => {
  const user = await model.findOne({
    email,
  });

  if (user) {
    const isPasswordOk = await bcrypt.compare(password, user.password);
    console.log(isPasswordOk);

    if (isPasswordOk) {
      return user.generateAuthToken();
    } else {
      throw new Error("Unable to login");
    }
  } else {
    throw new Error("Unable to login");
  }
};

module.exports = mongoose.model("User", UserSchema);
