var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
var { users } = require("../data/users.js");

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
        .select("_id userId mediaType mediaUrl title");

      return res
        .setHeader("Content-Type", "application/json")
        .send(postsPreview);
    } else {
      postsPreview = await Post.find().select(
        "_id userId mediaType mediaUrl title"
      );
      return res
        .setHeader("Content-Type", "application/json")
        .send(postsPreview);
    }
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

router.get("/:id/faf", async function (req, res) {
  const id = req.params.id;

  const user = users.find((user) => user.userId === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const followers = users.filter((user) => user.followings.includes(id));
  const followings = users.filter((user) => user.followers.includes(id));

  res.json({ followers: followers, followings: followings });
});

module.exports = router;
