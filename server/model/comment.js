const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  replyId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  replyTo: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  isSecLevelComment: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [
    {
      type: String,
    },
  ],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [
    {
      type: String,
    },
  ],
  replies: [replySchema]
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;