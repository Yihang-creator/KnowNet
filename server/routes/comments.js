const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // import the uuid library
var {comments} = require("../data/comments.js");


router.post('/', [
    body('postId').notEmpty(),
    body('userId').notEmpty(),
    body('text').isLength({ min: 1 })
], function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const text = req.body.text;
    const {postId, userId} = req.body;
    const newComment = {
        "commentId": uuidv4(),
        "postId": postId,
        "userId": userId,
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

// server.js

router.post('/replies/:commentId/:userId/:replyTo', function(req, res, next) {
  const commentId = req.params.commentId;
  const reply = req.body.text;

  const commentIndex = comments.findIndex(comment => comment.commentId === commentId);
  if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
  }

  const newReply = {
    "replyId": uuidv4(),
    "userId": req.params.userId,
    "replyTo": req.params.replyTo,
    "text": reply,
    "time": new Date().toISOString()
  }

  comments[commentIndex].replies.push(newReply);

  res.status(201).json(newReply);
});


router.get('/', function(req, res, next) {
  const postId = req.query.postId;

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid postId.' });
    }

    const relatedComments = comments.filter(comment => comment.postId === postId);

    return res.status(200).json(relatedComments);
});

module.exports = router;


