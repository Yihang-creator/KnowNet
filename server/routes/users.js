var express = require("express");
var router = express.Router();
var { users } = require("../data/users.js");

const User = require("../model/user");
const { default: mongoose } = require("mongoose");

router.get("/", async function (req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
});

router.get("/:email", async function (req, res, next) {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error); // Pass errors to your error handler
  }
});

router.get("/:id/faf", async function (req, res, next) {
  const id = req.params.id;

  try {
    const user = await User.findOne({ userId: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followers = await User.find({ follow: id });
    const followings = await User.find({ userId: { $in: user.follow } });

    res.json({ followers, followings });
  } catch (error) {
    next(error); // Pass errors to your error handler
  }
});

router.patch("/:id/unfollow", async function (req, res, next) {
  const myId = req.params.id;
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.follow = user.follow.filter((id) => id !== userId);

    await user.save();

    return res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/follow", async function (req, res, next) {
  const myId = req.params.id;
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.follow.push(userId);

    await user.save();

    return res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    next(error); // Pass errors to your error handler
  }
});

router.patch("/:id/block", async function (req, res, next) {
  const myId = req.params.id;
  const { blockedTags } = req.body;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.blockedTags) user.blockedTags = blockedTags;

    await user.save();

    return res.status(200).json({ message: "Blocked Tags successfully" });
  } catch (error) {
    next(error); // Pass errors to your error handler
  }
});

router.get("/:id/block", async function (req, res, next) {
  const myId = req.params.id;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const blockedTags = user.blockedTags;
    return res.status(200).json({ blockedTags });
  } catch (error) {
    next(error); // Pass errors to your error handler
  }
});

module.exports = router;
