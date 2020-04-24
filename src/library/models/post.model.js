const mongoose = require("mongoose");
const validator = require("validator");

const PostSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
    },
    url: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "owner",
});

module.exports = mongoose.model("Post", PostSchema);
