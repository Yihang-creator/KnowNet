var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const posts = [
    {
      "id": 1,
      "userId": 1,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      "title": "Post Title 1",
      "text": "This is the content of post 1.",
      "like": 3
    },
    {
      "id": 2,
      "userId": 1,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "title": "Post Title 2",
      "text": "This is the content of post 2.",
      "like": 2
    },
    {
      "id": 3,
      "userId": 2,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
      "title": "Post Title 3",
      "text": "This is the content of post 3.",
      "like": 0
    },
    {
      "id": 4,
      "userId": 2,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "title": "Post Title 4",
      "text": "This is the content of post 4."
    },
    {
      "id": 5,
      "userId": 1,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
      "title": "Post Title 5",
      "text": "This is the content of post 5.",
      "like": 0
    },
    {
      "id": 6,
      "userId": 1,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "title": "Post Title 6",
      "text": "This is the content of post 6.",
      "like": 0
    },
    {
      "id": 7,
      "userId": 1,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
      "title": "Post Title 7",
      "text": "This is the content of post 7.",
      "like": 0
    },
    {
      "id": 8,
      "userId": 1,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      "title": "Post Title 8",
      "text": "This is the content of post 8.",
      "like": 0
    },
    {
      "id": 9,
      "userId": 1,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
      "title": "Post Title 9",
      "text": "This is the content of post 9.",
      "like": 0
    },
    {
      "id": 10,
      "userId": 1,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      "title": "Post Title 10",
      "text": "This is the content of post 10.",
      "like": 0
    },
    {
      "id": 11,
      "userId": 1,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
      "title": "Post Title 11",
      "text": "This is the content of post 11.",
      "like": 0
    },
    {
      "id": 12,
      "userId": 1,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      "title": "Post Title 12",
      "text": "This is the content of post 12.",
      "like": 0
    },
    {
      "id": 13,
      "userId": 1,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
      "title": "Post Title 13",
      "text": "This is the content of post 13.",
      "like": 0
    },
    {
      "id": 14,
      "userId": 1,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      "title": "Post Title 14",
      "text": "This is the content of post 14.",
      "like": 0
    },
    {
      "id": 17,
      "userId": 2,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
      "title": "Post Title 17",
      "text": "This is the content of post 17.",
      "like": 0
    },
    {
      "id": 18,
      "userId": 2,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      "title": "Post Title 18",
      "text": "This is the content of post 18.",
      "like": 0
    },
    {
      "id": 19,
      "userId": 2,
      "mediaType": "image",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
      "title": "Post Title 19",
      "text": "This is the content of post 19.",
      "like": 0
    },
    {
      "id": 20,
      "userId": 2,
      "mediaType": "video",
      "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "title": "Post Title 20",
      "text": "This is the content of post 20.",
      "like": 0
    }
];

router.get('/', function(req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    //support pagination
    if (!isNaN(page) && !isNaN(limit)) {
      const start = (page - 1) * limit;
      const end = page * limit;
      const results = posts.slice(start, end);
  
      return res
        .setHeader('Content-Type', 'application/json')
        .send(results);

    // without pagination
    } else {
      return res
        .setHeader('Content-Type', 'application/json')
        .send(posts);
    }
});

router.get('/:postId', function (req, res, next) {
    const foundPost = posts.find(post => post.id == req.params.postId);
    console.log(`Get Post request ${req.params.postId}`);
    return res
      .set('Content-Type', 'application/json')
      .status(200)
      .send(foundPost);
});

module.exports = router;