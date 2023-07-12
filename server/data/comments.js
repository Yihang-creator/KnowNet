let comments = [
  {
    "commentId": "1",
    "postId": "1",
    "userId": "2",
    "text": "I have a secret to tell you",
    "timestamp": "2023-06-08T00:00:00Z",
    "likes": "10",
    "replies": [{
      "replyId": "1",
      "userId": "1",
      "replyTo": "2",
      "text": "What is it?",
      "timestamp": "2023-06-08T00:06:00Z",
      "isSecLevelComment": false,
      "likes": "2",
    }, {
      "replyId": "2",
      "userId": "2",
      "replyTo": "1",
      "text": "I love this Bunny!",
      "timestamp": "2023-06-08T00:06:00Z",
      // "isSecLevelComment": true, // This is a second level comment
      "likes": "3",
    }]
  },
  {
    "commentId": "2",
    "postId": "1",
    "userId": "1",
    "text": "This is a good one!",
    "timestamp": "2023-06-08T00:05:00Z",
    "likes": "10",
    "replies": []
  },
  {
    "commentId": "3",
    "postId": "2",
    "userId": "1",
    "text": "Nice post!",
    "timestamp": "2023-06-08T00:10:00Z",
    "likes": "10",
    "replies": []
  }
]

module.exports.comments = comments;