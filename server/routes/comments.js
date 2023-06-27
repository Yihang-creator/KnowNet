var express = require('express');
var router = express.Router();

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


router.get('/', function(req, res, next) {
    const postId = parseInt(req.query.postId);

    return res
        .setHeader('Content-Type', 'application/json')
        .send(comments.filter(comment => comment.postId === postId));
});


module.exports = router;