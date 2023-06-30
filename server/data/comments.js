let comments = [
    {
      "commentId": 1,
      "postId": 1,
      "userId": 2,
      "username": "hanze",
      "text": "I love this blog!",
      "timestamp": "2023-06-08T00:00:00Z",
      "replies": [{
        "replyId": 1,
        "userId": 2,
        "username": "hanze",
        "text": "What is it?",
        "timestamp": "2023-06-08T00:06:00Z",
      }]
    },
    {
      "commentId": 2,
      "postId": 1,
      "userId": 1,
      "username": "kunyi",
      "text": "I have a secret to tell you",
      "timestamp": "2023-06-08T00:05:00Z",
      "replies": []
    },
    {
      "commentId": 3,
      "postId": 2,
      "userId": 1,
      "username": "kunyi",
      "text": "Nice post!",
      "timestamp": "2023-06-08T00:10:00Z",
      "replies": []
    }
  ]

  module.exports.comments = comments;