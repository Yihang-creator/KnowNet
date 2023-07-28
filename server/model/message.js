const mongoose = require("mongoose");
const data = require("../data/messages");

const messageSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  text: String,
  timestamp: Date,
});

const Message = mongoose.model("Message", messageSchema);

Message.deleteMany({})
  .then(() => console.log("All messages deleted."))
  .then(() => {
    return Message.create(data.messages);
  })
  .then(() => {
    console.log("Data preloaded successfully");
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

module.exports = Message;
