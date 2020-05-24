const express = require("express");
const User = require("../library/models/user.model");
const Messages = require("../library/models/message.model");

const SentMessage = Messages.sent;
const ReceivedMessage = Messages.received;

const router = express.Router();

router.post("/messages/send", async (req, res) => {
  const senderID = req.body.senderID;
  const msgBody = req.body.body;
  const receiverID = req.body.receiverID;
  console.log(req.body);

  if (!senderID || !msgBody || !receiverID) {
    res.status(400).send({ data: "Bad request!!!" });
    return;
  }
  const senderModel = new SentMessage({
    owner: senderID,
    to: receiverID,
    body: msgBody,
  });
  const receiverModel = new ReceivedMessage({
    owner: receiverID,
    from: senderID,
    body: msgBody,
  });

  try {
    await senderModel.save();
    await receiverModel.save();
    res.status(201).send({ data: "Message sent successfully!!!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
