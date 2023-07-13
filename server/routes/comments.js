const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // import the uuid library
const Comment = require("../model/comment");
const User = require("../model/user");


router.post('/', [
    body('postId').notEmpty(),
    body('userId').notEmpty(),
    body('text').isLength({ min: 1 })
], async function(req, res, next) {
    // First validate and extract data from the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const text = req.body.text;
    const {postId, userId} = req.body; 

    console.log('postId1:', postId) 

    const newComment = new Comment({
        "commentId": uuidv4(),
        "postId": postId,
        "userId": userId,
        "text": text,
        "timestamp": new Date().toISOString(),
        "replies": [],
        "likes": 0
    });

    // Save the new comment to MongoDB
    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).send(err);
    }
});




router.delete('/:id', async function(req, res, next) { 
    const id = req.params.id;

    try {
        const deletedComment = await Comment.findOneAndDelete({ commentId: id });
        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        return res.status(200).json(deletedComment);
    } catch (err) {
        return res.status(500).send(err);
    }
});



router.post('/replies/:commentId/:userId/:replyTo', async function(req, res, next) { 
    const commentId = req.params.commentId;
    const { text: reply, isSecLevelComment } = req.body;

    const newReply = {
        "replyId": uuidv4(),
        "userId": req.params.userId,
        "replyTo": req.params.replyTo,
        "text": reply,
        "timestamp": new Date().toISOString(),
        "isSecLevelComment": isSecLevelComment,
        "likes": 0
    };

    try {
        // Find the comment by id and push the new reply to the replies array
        const updatedComment = await Comment.findOneAndUpdate(
            { commentId: commentId },
            { $push: { replies: newReply } },
            { new: true, useFindAndModify: false } // Return the updated comment
        );

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        return res.status(201).json(newReply);
    } catch (err) {
        return res.status(500).send(err);
    }
});


router.get('/', async function(req, res, next) {
    const postId = req.query.postId;

    if (typeof postId !== "string") {
        return res.status(400).json({ error: 'Invalid postId.' });
    }

    try {
        const comments = await Comment.find({ postId: postId });
        return res.status(200).json(comments);

    } catch (error) {
        console.error(`Error retrieving comments form post ${postId}:`, error);
        return res.status(500).json({ error: "Failed to retrieve the comments" });
    }
});

router.get('/getCommentDetail', async function(req, res, next) { // Note: the function is now async
    const postId = req.query.postId;
    console.log('postId:', postId)

    try {
        const relatedComments = await Comment
            .find({ postId: postId })
            .populate('userId', 'username') // assuming the user model has a username field
            .exec();

        if (!relatedComments) {
            return res.status(404).json({ error: 'No comments found for this post' });
        }

        // Populate each reply in each comment
        for (let comment of relatedComments) {
            for (let reply of comment.replies) {
                reply.user = await User.findOne({ userId: reply.userId });
                reply.replyToUser = reply.isSecLevelComment ? await User.findOne({ userId: reply.replyTo }) : {};
            }
        }

        return res.status(200).json(relatedComments);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get('/all', async function(req, res, next) {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (error) {
        console.error(`Error retrieving comments`, error);
        return res.status(500).json({ error: "Failed to retrieve the comments" });
    }
});


module.exports = router;


