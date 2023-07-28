const mongoose = require("mongoose");
const data = require("../data/messages");

const chatSchema = new mongoose.Schema({
  users: [String],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const Chat = mongoose.model("Chat", chatSchema);

const sampleChat = {
  users: ["1", "2"],
  messages: data.messages.map((message) => message._id),
};

Chat.deleteMany({})
  .then(() => console.log("All chats deleted."))
  .then(() => {
    return Chat.create(sampleChat);
  })
  .then(() => {
    console.log("Data preloaded successfully");
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

module.exports = Chat;