var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const Post = require("../model/post");

router.get("/", async function (req, res, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    let postsPreview = [];
    
    // Support pagination
    if (!isNaN(page) && !isNaN(limit)) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      postsPreview = await Post.find()
        .skip(startIndex)
        .limit(limit)
        .select("_id userId username userPhotoUrl mediaType mediaUrl title like tags");

      return res
        .setHeader("Content-Type", "application/json")
        .send(postsPreview);
    } else {
      postsPreview = await Post.find().select("_id userId username userPhotoUrl mediaType mediaUrl title like tags");
      return res
        .setHeader("Content-Type", "application/json")
        .send(postsPreview);
    }
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

router.get("/:postId", async function (req, res, next) {
  try {
    const foundPost = await Post.findById(req.params.postId);
    console.log(`Get Post request ${req.params.postId}`);
    // console.log(foundPost);
    return res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .send(foundPost);
  } catch (error) {
    console.error(`Error retrieving post ${req.params.postId}:`, error);
    return res.status(500).json({ error: "Failed to retrieve the post" });
  }
});

router.get("/:postId/interactiveVideo/:videoId", async (req, res) => {
  const postId = req.params.postId; // postId
  const videoId = req.params.videoId; // nodeId

  try {
    const foundPost = await Post.findById(postId);
    const foundInteractiveVideo = foundPost.interactiveVideos.find(item => item.id === videoId)
    return res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .send(foundInteractiveVideo);
  } catch (error) {
    console.error(`Error retrieving post ${postId}:`, error);
    return res.status(500).json({ error: "Failed to retrieve the post" });
  }
});

router.post(
  "/",
  [
    body("mediaType").isIn(["image", "video"]),
    body("mediaUrl").isURL(),
    body("title").isLength({ min: 1 }),
    body("text").isLength({ min: 1 }),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, username, mediaType, mediaUrl, title, text, tags, userPhotoUrl} = req.body;

    const newPost = new Post({
      _id: uuidv4(), // generate a new ID
      userId,
      username,
      mediaType,
      mediaUrl,
      title,
      text,
      userPhotoUrl,
      like: [],
      comments: [],
      tags: tags,
      timestamp: new Date().toISOString(),
    });

    try {
      const createdPost = await newPost.save();
      console.log("New post created:", createdPost);
      return res.status(201).json(createdPost);
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Failed to create post" });
    }
  }
);

router.put(
  "/:postId",
  [
    body("mediaType").isIn(["image", "video"]),
    body("mediaUrl").isURL(),
    body("title").isLength({ min: 1 }),
    body("text").isLength({ min: 1 }),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, username, mediaType, mediaUrl, title, like, text, userPhotoUrl} = req.body;

    try {
      const post = await Post.findById(req.params.postId); // find the post by ID

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Update the post's properties
      post.mediaType = mediaType;
      post.mediaUrl = mediaUrl;
      post.title = title;
      post.text = text;
      post.like = like;

      const updatedPost = await post.save(); // save the updated post

      console.log("Post updated:", updatedPost);
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      return res.status(500).json({ error: "Failed to update post" });
    }
  }
);

router.delete(
    "/:postId",
    async function (req, res, next) {
      try {
        const post = await Post.findById(req.params.postId); // find the post by ID

        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        await Post.findByIdAndRemove(req.params.postId); // remove the post

        console.log("Post deleted");
        return res.status(200).json({message: "Post deleted successfully"});
      } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ error: "Failed to delete post" });
      }
    }
);

module.exports = router;
