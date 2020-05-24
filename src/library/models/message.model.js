const mongoose = require("mongoose");

const SentMessageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
    },
    body: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ReceivedMessageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  sent: mongoose.model("SentMessage", SentMessageSchema),
  received: mongoose.model("ReceivedMessage", ReceivedMessageSchema),
};
