var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
var { users } = require("../data/users.js");

router.get("/", async function (req, res, next) {
  res.json({ users: users });
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

router.delete("/:id/followings", async function (req, res) {
  const userId = req.params.id;
  const { followingIds } = req.body;

  // Ensure followingIds is an array
  if (!Array.isArray(followingIds)) {
    return res.status(400).json({ error: "followingIds must be an array" });
  }

  // Find the user
  const userIndex = users.findIndex((user) => user.userId === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Filter out the IDs that need to be removed
  users[userIndex].followings = users[userIndex].followings.filter(
    (id) => !followingIds.includes(id)
  );

  users.forEach((user) => {
    if (followingIds.includes(user.userId)) {
      user.followers = user.followers.filter(
        (followerId) => followerId !== userId
      );
    }
  });

  return res.status(200).json({ message: "Followings removed successfully" });
});

module.exports = router;
