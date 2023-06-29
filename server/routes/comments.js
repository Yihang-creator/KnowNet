const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // import the uuid library

const comments = [
    {
      "id": 1,
      "postId": 1,
      "userId": 2,
      "text": "I love this blog!",
      "timestamp": "2023-06-08T00:00:00Z",
      "replies": []
    },
    {
      "id": 2,
      "postId": 1,
      "userId": 1,
      "text": "I have a secret to tell you",
      "timestamp": "2023-06-08T00:05:00Z",
      "replies": [
        {
          "id": 4,
          "parentId": 2,
          "userId": 2,
          "text": "What is it?",
          "timestamp": "2023-06-08T00:06:00Z",
          "replies": []
        }
      ]
    },
    {
      "id": 3,
      "postId": 2,
      "userId": 1,
      "text": "Nice post!",
      "timestamp": "2023-06-08T00:10:00Z",
      "replies": []
    }
  ];



// get all comments under a post
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
        "id": uuidv4(),
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
    const index = comments.findIndex(comment => comment.id === id);

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

router.post('/:commentId/replies', function(req, res, next) {
    const commentId = parseInt(req.params.id);
    const reply = req.body;

    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    reply.id = uuidv4();
    reply.parentId = commentId;
    reply.timestamp = new Date().toISOString();

    comments[commentIndex].replies.push(reply);

    res.status(201).json(reply);
});

module.exports = router;


