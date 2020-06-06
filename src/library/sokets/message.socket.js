const User = require("../models/user.model");

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

const getAllSentMessagesToReceiver = async (socket, data, message) => {
  try {
    const limit = Number.parseInt(data.limit) || 10;
    const offset = Number.parseInt(data.offset) || 0;
    const receiverID = data.receiverID;
    const senderID = data.senderID;

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
      throw new Error({ error: `${message} not found` });
    }

    socket.emit(message, sentData["sentMessages"]);
    // return sentData["sentMessages"];
  } catch (error) {
    console.log(error);
  }
};

const getAllReceiverMessagesFromSender = async (socket, data, message) => {
  try {
    const limit = Number.parseInt(data.limit) || 10;
    const offset = Number.parseInt(data.offset) || 0;
    const receiverID = data.receiverID;
    const senderID = data.senderID;

    const model2 = await User.findById(receiverID);

    const receivedData = await model2
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
      throw new Error({ error: `${message} not found` });
    }

    socket.emit(message, receivedData["receivedMessages"]);
    // return receivedData["receivedMessages"];
  } catch (error) {
    console.log(error);
  }
};

/////////////////
const getAllMessages = async (socket, data, message) => {
  try {
    const limit = Number.parseInt(data.limit) || 10;
    const offset = Number.parseInt(data.offset) || 0;
    const receiverID = data.receiverID;
    const senderID = data.senderID;

    const receiverID2 = data.receiverID2;
    const senderID2 = data.senderID2;

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
      throw new Error({ error: `${message} not found` });
    }

    const model2 = await User.findById(receiverID2);

    const receivedData = await model2
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

    const messData = [
      ...receivedData["receivedMessages"],
      ...sentData["sentMessages"],
    ];
    socket.emit(message, messData);

    // return sentData["sentMessages"];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUnreadMessagesNumber,
  getUnreadMessagesNumberFromSingleSender,
  getAllSentMessagesToReceiver,
  getAllReceiverMessagesFromSender,
  getAllMessages,
};
