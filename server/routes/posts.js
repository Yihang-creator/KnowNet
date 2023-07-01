var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
var { posts } = require("../data/posts.js");
var { users } = require("../data/users.js");

function getPostsPreview(posts) {
  let previews = [];
  for (const post of posts) {
    const { postId, userId, mediaType, mediaUrl, title } = post;
    const preview = { postId, userId, mediaType, mediaUrl, title };
    previews.push(preview)
  }
  return previews;
}

router.get("/", function (req, res, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  let postsPreview = getPostsPreview(posts);

  //support pagination
  if (!isNaN(page) && !isNaN(limit)) {
    const start = (page - 1) * limit;
    const end = page * limit;
    const results = postsPreview.slice(start, end);

    return res.setHeader("Content-Type", "application/json").send(results);

    // without pagination
  } else {
    return res.setHeader("Content-Type", "application/json").send(postsPreview);
  }
});

router.get("/:postId", function (req, res, next) {
  const foundPost = posts.find((post) => post.postId == req.params.postId);
  console.log(`Get Post request ${req.params.postId}`);
  return res
    .set("Content-Type", "application/json")
    .status(200)
    .send(foundPost);
});

router.post(
  "/",
  [
    body("mediaType").isIn(["image", "video"]),
    body("mediaUrl").isURL(),
    body("title").isLength({ min: 1 }),
    body("text").isLength({ min: 1 }),
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, mediaType, mediaUrl, title, text } = req.body;
    const newPost = {
      postId: uuidv4(), // generate a new ID
      userId: userId,
      mediaType: mediaType,
      mediaUrl: mediaUrl,
      title: title,
      text: text,
      like: [],
      comments: [],
      timestamp: new Date().toISOString(),
    };

    console.log(newPost);

    posts.push(newPost);

    res.status(201).json(newPost);
  }
);

module.exports = router;
