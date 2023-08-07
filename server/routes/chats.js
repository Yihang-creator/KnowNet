var express = require('express');
var router = express.Router();
const Chat = require('../model/chat');
const Message = require('../model/message');
const User = require('../model/user');
const mongoose = require('mongoose');

module.exports = router;

router.get('/:userId1/:userId2', async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    const chats = await Chat.find({ users: userId1 });

    const otherUserIds = chats.map((chat) => {
      return chat.users.find((user) => user !== userId1);
    });

    const people = await User.find({ userId: { $ne: userId1 } });

    let chat = await Chat.findOne({
      users: { $all: [userId1, userId2] },
    }).populate('messages');

    if (!chat) {
      const newChatData = {
        users: [userId1, userId2],
        messages: [],
      };

      chat = new Chat(newChatData);

      await chat.save();
    }

    const messages = chat.messages.map((message) => {
      return {
        userId: message.userId,
        text: message.text,
        time: `${String(message.timestamp.getMonth() + 1).padStart(
          2,
          '0',
        )}-${String(message.timestamp.getDate()).padStart(
          2,
          '0',
        )} ${message.timestamp
          .toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          .toLowerCase()}`,
      };
    });

    return res.status(200).json({ messages, people });
  } catch (err) {
    console.error('Error fetching or creating chat:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/:userId1/:userId2', async (req, res) => {
  const { text } = req.body;
  const { userId1, userId2 } = req.params;

  try {
    let chat = await Chat.findOne({
      users: { $all: [userId1, userId2] },
    }).populate('messages');

    const message = new Message({
      _id: new mongoose.Types.ObjectId(),
      userId: userId1,
      text,
      timestamp: new Date(),
    });

    await message.save();

    chat.messages.push(message._id);
    await chat.save();

    return res
      .status(201)
      .json({ message: 'Message sent successfully.', data: message });
  } catch (err) {
    console.error('Error sending message:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
});
