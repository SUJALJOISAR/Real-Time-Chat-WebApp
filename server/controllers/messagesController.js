const Messages = require("../model/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { sender, receiver } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [sender, receiver],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === sender,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { sender, receiver, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [sender, receiver],
      sender: sender,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};