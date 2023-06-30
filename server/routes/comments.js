const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // import the uuid library
var {comments} = require("../data/comments.js");
var {users} = require("../data/users.js");

function findUserName(userId) {
  for (const user of users) {
    if (user.userId ===  userId) {
      return user.username;
    }
  }
}


router.post('/', [
    body('postId').notEmpty(),
    body('userId').notEmpty(),
    body('text').isLength({ min: 1 })
], function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const postId = parseInt(req.body.postId);
    const userId = parseInt(req.body.userId);
    const text = req.body.text;

    const newComment = {
        "commentId": uuidv4(),
        "postId": postId,
        "userId": userId,
        "username": findUserName(userId),
        "text": text,
        "timestamp": new Date().toISOString(),
        "replies": []
    };

    comments.push(newComment);

    res.status(201).json(newComment);
});

router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.commentId === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    const [deletedComment] = comments.splice(index, 1);

    return res.status(200).json(deletedComment);
});


router.get('/', function(req, res, next) {
  const postId = parseInt(req.query.postId);

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid postId.' });
    }

    const relatedComments = comments.filter(comment => comment.postId === postId);

    return res.status(200).json(relatedComments);
});

// server.js

router.post('/:commentId/:userId/replies', function(req, res, next) {
  const commentId = parseInt(req.params.id);
  const reply = req.body;

  const commentIndex = comments.findIndex(comment => comment.id === commentId);
  if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
  }

  const newReply = {
    "replyId": uuidv4(),
    "userId": userId,
    "username": findUserName(userId),
    "text":reply,
    "time": new Date().toISOString()
  }

  comments[commentIndex].replies.push(reply);

  res.status(201).json(reply);
});

module.exports = router;


