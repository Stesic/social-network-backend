const express = require("express");
const User = require("../library/models/user.model");
const Messages = require("../library/models/message.model");
ObjectID = require("mongodb").ObjectID;

const SentMessage = Messages.sent;
const ReceivedMessage = Messages.received;

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
  const receiverID = req.params.receiverID;
  const senderID = req.params.senderID;
  //
  try {
    const model = await User.findById(senderID);

    const sentData = await model
      .populate({
        path: "sentMessages",
        options: {
          sort: {
            createdAt: 1, // -1 desc, 1 asc
          },
        },
        match: { to: receiverID },
      })
      .execPopulate();

    if (!sentData["sentMessages"]) {
      res.status(404).send({ error: `${req.path} not found` });
      return;
    }

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
  //
  try {
    const model = await User.findById(receiverID);

    const receivedData = await model
      .populate({
        path: "receivedMessages",
        options: {
          sort: {
            createdAt: 1, // -1 desc, 1 asc
          },
        },
        match: { from: senderID },
      })
      .execPopulate();
    if (!receivedData["receivedMessages"]) {
      res.status(404).send({ error: `${req.path} not found` });
      return;
    }

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

module.exports = router;
