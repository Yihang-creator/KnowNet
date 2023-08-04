const express = require('express');
const { Server } = require('socket.io');
const Chat = require('../model/chat');
const Message = require('../model/message');
const User = require('../model/user');
const mongoose = require('mongoose');

const userSockets = {};

const attachSocketServer = (httpServer) => {
  io = new Server(httpServer, {
    path: '/socket/chat',
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;

    userSockets[userId] = socket;

    socket.on('privateMessage', async ({ recipientUserId, message }) => {
      console.log(message);

      await insertMessageIntoDb(userId, recipientUserId, message);
      const recipientSocket = userSockets[recipientUserId];
      if (recipientSocket) {
        recipientSocket.emit('privateMessage', {
          senderUserId: userId,
          message,
        });
      }
    });
  });
};

const insertMessageIntoDb = async (senderUserId, recipientUserId, text) => {
  try {
    console.log(senderUserId);
    console.log(recipientUserId);
    let chat = await Chat.findOne({
      users: { $all: [senderUserId, recipientUserId] },
    }).populate('messages');

    const message = new Message({
      _id: new mongoose.Types.ObjectId(),
      userId: senderUserId,
      text: text,
      timestamp: new Date(),
    });

    await message.save();

    chat.messages.push(message._id);
    await chat.save();

    console.log({ message: 'Message sent successfully.', data: message });
  } catch (err) {
    console.error('Error sending message:', err);
  }
};

module.exports = {
  attachSocketServer: attachSocketServer,
};
