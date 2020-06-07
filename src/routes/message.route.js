const express = require("express");
const User = require("../library/models/user.model");
const Messages = require("../library/models/message.model");
ObjectID = require("mongodb").ObjectID;

const SentMessage = Messages.sent;
const ReceivedMessage = Messages.received;

const constants = require("../library/shared/constants");

const decrypt = constants.decrypt;
const code = constants.code;

const router = express.Router();

router.post("/messages/send", async (req, res) => {
  const senderID = req.body.senderID;
  const msgBody = req.body.body;
  const receiverID = req.body.receiverID;

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
    seen: false,
  });

  try {
    await senderModel.save();
    await receiverModel.save();
    res.status(201).send({ data: "Message sent successfully!!!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//GET USER SENT MESSAGES TO SINGLE RECEIVER
router.get("/messages/sent/:senderID/:receiverID", async (req, res) => {
  const limit = Number.parseInt(req.query.limit) || 10;
  const offset = Number.parseInt(req.query.offset) || 0;
  const receiverID = req.params.receiverID;
  const senderID = req.params.senderID;

  //
  try {
    const model = await User.findById(senderID);

    const sentData = await model
      .populate({
        path: "sentMessages",
        match: { to: receiverID },
        options: {
          limit: parseInt(limit),
          skip: parseInt(offset),
          sort: {
            createdAt: -1, // -1 desc, 1 asc
          },
        },
      })
      .execPopulate();

    if (!sentData["sentMessages"]) {
      res.status(404).send({ error: `${req.path} not found` });
      return;
    }

    sentData["sentMessages"].forEach((message) => {
      const myDecipher = decrypt(code);
      message.body = myDecipher(message.body);
    });

    res.status(200).send({
      data: sentData["sentMessages"],
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//GET USER RECEIVED MESSAGES FROM SINGLE SENDER
router.get("/messages/received/:senderID/:receiverID", async (req, res) => {
  const receiverID = req.params.receiverID;
  const senderID = req.params.senderID;

  const limit = Number.parseInt(req.query.limit) || 10;
  const offset = Number.parseInt(req.query.offset) || 0;
  //
  try {
    const model = await User.findById(receiverID);

    const receivedData = await model
      .populate({
        path: "receivedMessages",
        match: { from: senderID },
        options: {
          limit: parseInt(limit),
          skip: parseInt(offset),
          sort: {
            createdAt: -1, // -1 desc, 1 asc
          },
        },
      })
      .execPopulate();
    if (!receivedData["receivedMessages"]) {
      res.status(404).send({ error: `${req.path} not found` });
      return;
    }

    receivedData["receivedMessages"].forEach((message) => {
      const myDecipher = decrypt(code);
      message.body = myDecipher(message.body);
    });

    res.status(200).send({
      data: receivedData["receivedMessages"],
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//GET USER UNREAD MESSAGES NUMBER
router.get("/messages/unread/:receiverID", async (req, res) => {
  const receiverID = req.params.receiverID;
  //
  try {
    const model = await User.findById(receiverID);

    const receivedData = await model
      .populate({
        path: "receivedMessages",
        match: { seen: false },
      })
      .execPopulate();
    if (!receivedData["receivedMessages"]) {
      res.status(404).send({ error: `${req.path} not found` });
      return;
    }
    const totalUnreadMessages = receivedData["receivedMessages"].length;
    res.status(200).send({
      data: totalUnreadMessages,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//GET USER UNREAD MESSAGES NUMBER FROM SINGLE SENDER
router.get("/messages/unread/:senderID/:receiverID", async (req, res) => {
  const receiverID = req.params.receiverID;
  const senderID = req.params.senderID;

  try {
    const model = await User.findById(receiverID);

    const receivedData = await model
      .populate({
        path: "receivedMessages",
        match: { seen: false, from: senderID },
      })
      .execPopulate();
    if (!receivedData["receivedMessages"]) {
      res.status(404).send({ error: `${req.path} not found` });
      return;
    }
    const totalUnreadMessages = receivedData["receivedMessages"].length;
    res.status(200).send({
      data: totalUnreadMessages,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//READ ALL MESSAGES FROM SINGLE SENDER
router.patch("/messages/read/:senderID/:receiverID", async (req, res) => {
  const receiverID = req.params.receiverID;
  const senderID = req.params.senderID;

  try {
    const model = await User.findById(receiverID);

    const receivedData = await model
      .populate({
        path: "receivedMessages",
        match: { seen: false, from: senderID },
      })
      .execPopulate();
    if (!receivedData["receivedMessages"]) {
      res.status(404).send({ error: `${req.path} not found` });
      return;
    }
    receivedData["receivedMessages"].forEach(async (receivedMsg) => {
      const messageID = receivedMsg._id;
      const messageModel = await ReceivedMessage.findById(messageID);
      messageModel.seen = true;
      messageModel.save();
    });
    res.status(200).send({
      data: "All messages are read successfully",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
