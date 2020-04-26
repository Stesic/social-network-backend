const mongoose = require("mongoose");
const validator = require("validator");

const CommentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    body: {
      type: String,
      required: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
