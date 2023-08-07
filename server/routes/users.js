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

router.get('/getOrCreate/:email/:name', async function (req, res, next) {
  const { email, name } = req.params;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const _id = uuidv4();

      const userData = {
        userId: _id,
        username: name,
        userPhotoUrl:
          'data:image/png;base64,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',

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

    // Track changes to apply to posts
    const updates = {};

    if (name) {
      user.username = name;
      updates.username = name;
    }

    if (image) {
      user.userPhotoUrl = image;
      updates.userPhotoUrl = image;
    }

    await user.save();

    if (Object.keys(updates).length > 0) {
      await Post.updateMany({ userId: myId }, { $set: updates });
    }

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
