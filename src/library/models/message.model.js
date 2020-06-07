const mongoose = require("mongoose");

const constants = require("../shared/constants");

const encrypt = constants.encrypt;
const decrypt = constants.decrypt;

const code = "123.1vaHd3v.123";

const SentMessageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    to: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
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

const ReceivedMessageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    from: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReceivedMessageSchema.pre("save", async function (next) {
  let myCipher = encrypt(code);
  const message = this;
  message.body = myCipher(message.body);
  next();
});

SentMessageSchema.pre("save", async function (next) {
  let myCipher = encrypt(code);
  const message = this;
  message.body = myCipher(message.body);
  console.log(message.body);
  next();
});

module.exports = {
  sent: mongoose.model("SentMessage", SentMessageSchema),
  received: mongoose.model("ReceivedMessage", ReceivedMessageSchema),
};
