const User = require("../models/user.model");
const constants = require("../shared/constants");

const decrypt = constants.decrypt;
const code = constants.code;

const getUnreadMessagesNumber = async (socket, data, message) => {
  try {
    const receiverID = data.receiverID;

    const model = await User.findById(receiverID);
    const receivedData = await model
      .populate({
        path: "receivedMessages",
        match: { seen: false },
      })
      .execPopulate();
    if (!receivedData["receivedMessages"]) {
      throw new Error({ error: `${message} not found` });
    }
    const totalUnreadMessages = receivedData["receivedMessages"].length;
    socket.emit(message, totalUnreadMessages);
  } catch (error) {
    console.log(error);
  }
};

const getUnreadMessagesNumberFromSingleSender = async (
  socket,
  data,
  message
) => {
  try {
    const receiverID = data.receiverID;
    const senderID = data.senderID;
    const model = await User.findById(receiverID);

    const receivedData = await model
      .populate({
        path: "receivedMessages",
        match: { seen: false, from: senderID },
      })
      .execPopulate();
    if (!receivedData["receivedMessages"]) {
      throw new Error({ error: `${message} not found` });
    }
    const totalUnreadMessages = receivedData["receivedMessages"].length;
    socket.emit(message, totalUnreadMessages);
  } catch (error) {
    console.log(error);
  }
};

const getAllMessages = async (socket, data, message) => {
  try {
    const limit = Number.parseInt(data.limit) || 5;
    const offset = Number.parseInt(data.offset) || 0;
    const receiverID = data.receiverID;
    const senderID = data.senderID;

    const receiverID2 = data.receiverID2;
    const senderID2 = data.senderID2;

    const sentMessageModel = await User.findById(senderID);
    const sentData = await sentMessageModel
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
      throw new Error({ error: `${message} not found` });
    }

    const receivedMessageModel = await User.findById(receiverID2);

    const receivedData = await receivedMessageModel
      .populate({
        path: "receivedMessages",
        match: { from: senderID2 },
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
      throw new Error({ error: `${message} not found` });
    }

    const allMessages = [
      ...receivedData["receivedMessages"],
      ...sentData["sentMessages"],
    ];

    allMessages.forEach((message) => {
      const myDecipher = decrypt(code);
      message.body = myDecipher(message.body);
    });

    socket.emit(message, allMessages);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUnreadMessagesNumber,
  getUnreadMessagesNumberFromSingleSender,
  getAllMessages,
};
