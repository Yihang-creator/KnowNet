var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Post = require('../model/post');
const { v4: uuidv4 } = require('uuid');

router.get('/', async function (req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
});

router.get('/getUserById/:userId', async function (req, res, next) {
  const { userId } = req.params;
  try {
    let user = await User.findOne({ userId });
    res.send(user);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
});

router.get('/:email', async function (req, res, next) {
  const { email } = req.params;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const _id = uuidv4();

      const userData = {
        userId: _id,
        username: email,
        userPhotoUrl: 'https://www.seekpng.com/ipng/u2q8r5t4i1y3w7e6_existing-user-default-avatar/',

        email: email,
        follow: [],
      };

      await User.create(userData);
      user = await User.findOne({ email });
    }

    res.json(user);
  } catch (error) {
    res.status(500).send('Error getting user');
  }
});

router.get('/:id/faf', async function (req, res, next) {
  const id = req.params.id;

  try {
    const user = await User.findOne({ userId: id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followers = await User.find({ follow: id });
    const followings = await User.find({ userId: { $in: user.follow } });

    res.json({ followers, followings });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/unfollow', async function (req, res, next) {
  const myId = req.params.id;
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.follow = user.follow.filter((id) => id !== userId);

    await user.save();

    return res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/follow', async function (req, res, next) {
  const myId = req.params.id;
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.follow.push(userId);

    await user.save();

    return res.status(200).json({ message: 'Followed successfully' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/block', async function (req, res, next) {
  const myId = req.params.id;
  const { blockedTags } = req.body;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.blockedTags) user.blockedTags = blockedTags;

    await user.save();

    return res.status(200).json({ message: 'Blocked Tags successfully' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', async function (req, res, next) {
  const myId = req.params.id;
  const { name, image } = req.body;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.username = name;

    if (image) user.userPhotoUrl = image;

    await user.save();

    return res.status(200).json({ message: 'Edit successfully' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/block', async function (req, res, next) {
  const myId = req.params.id;

  try {
    const user = await User.findOne({ userId: myId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const blockedTags = user.blockedTags;
    return res.status(200).json({ blockedTags });
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/like', async function (req, res, next) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    const likedPosts = await Post.find({ like: userId }) //find posts which has like containing userId
      .select(
        '_id userId username userPhotoUrl mediaType mediaUrl title like tags',
      );
    return res.setHeader('Content-Type', 'application/json').send(likedPosts);
  } catch (error) {
    console.error('Error retrieving liked posts:', error);
    return res.status(500).json({ error: 'Failed to retrieve liked posts' });
  }
});

module.exports = router;
