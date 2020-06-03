const User = require("../models/user.model");

const getUnreadMessagesNumber = async (socket, data, message) => {
  const receiverID = data.receiverID;

  const model = await User.findById(receiverID);

  const receivedData = await model
    .populate({
      path: "receivedMessages",
      match: { seen: false },
    })
    .execPopulate();
  // if (!receivedData["receivedMessages"]) {
  //   res.status(404).send({ error: `${req.path} not found` });
  //   return;
  // }
  const totalUnreadMessages = receivedData["receivedMessages"].length;
  socket.emit(message, totalUnreadMessages);
};

module.exports = { getUnreadMessagesNumber };
