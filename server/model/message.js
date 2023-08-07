const mongoose = require('mongoose');
const data = require('../data/messages');

const messageSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  text: String,
  timestamp: Date,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
