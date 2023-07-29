const mongoose = require("mongoose");

const messages = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: "1",
    text: "Hello!",
    timestamp: new Date("2023-07-01T12:00:00"),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: "2",
    text: "Hi there!",
    timestamp: new Date("2023-07-01T12:01:00"),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: "1",
    text: "How are you?",
    timestamp: new Date("2023-07-01T12:02:00"),
  },
];

module.exports.messages = messages;
