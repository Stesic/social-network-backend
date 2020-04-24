const mongoose = require("mongoose");
const validator = require("validator");

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
    avatarUrs: {
      type: String,
      default: "https://via.placeholder.com/900x900",
    },
    about: {
      type: String,
      minlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

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

module.exports = mongoose.model("User", UserSchema);
