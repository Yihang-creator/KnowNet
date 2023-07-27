const express = require("express");
var router = express.Router()
const { body, validationResult } = require('express-validator');
const Post = require('../model/post');
const { v4: uuidv4 } = require('uuid');

// let videoTree = {
//     "1": {
//       id: "1",
//       url: "https://www.youtube.com/watch?v=52ZkFD-YlmY",
//       LeadTimeField: 5,
//       root: true,
//       options: [
//         {
//           label: "Decline",
//           nextVideoId: "2"
//         },
//         {
//           label: "Answer",
//           nextVideoId: "3"
//         }
//       ]
//     },
//     "2": {
//       id: "2",
//       url: "https://www.youtube.com/watch?v=CSyDiUbjtTE",
//       LeadTimeField: 0,
//       root: false,
//       options: []
//     },
//     "3": {
//       id: "3",
//       url: "https://www.youtube.com/watch?v=VUj1PbvnHS4",
//       LeadTimeField: 0,
//       root: false,
//       options: []
//     }
//     // Add more videos here
//   };

router.post("/",[
        body('id').notEmpty().withMessage('ID is required'),
        body('attributes.url').isURL().withMessage('Invalid URL'),
        body('attributes.LeadTimeField').isInt({ gt: -1 }).withMessage('LeadTimeField must be a positive integer'),
        body('children').isArray().withMessage('Children must be an array'),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const data = req.body;

        console.log(data);

        let interactiveVideos = [];

        const rootNode = {
            id: data.id,
            url: data.attributes.url,
            LeadTimeField: data.attributes.LeadTimeField,
            root: true,
            options: data.children.map(child => ({ label: child.name, nextVideoId: child.id}))
        }
        interactiveVideos.push(rootNode);

        const formatNode = (node) => {
            interactiveVideos.push({
                id: node.id,
                url: node.attributes.url,
                LeadTimeField: node.attributes.LeadTimeField,
                root: false,
                options: node.children.map(child => ({ label: child.name, nextVideoId: child.id }))
            });
            node.children.forEach(formatNode);
        };

        data.children.forEach(formatNode);

        const newPost = new Post({
            _id: uuidv4(), // generate a new ID
            userId: data.userId,
            mediaType: data.mediaType,
            mediaUrl: data.mediaUrl,
            text: data.text,
            title: data.title,
            like: [],
            comments: [],
            timestamp: new Date().toISOString(),
            interactiveVideos: interactiveVideos,
        })

        try {
            const createdPost = await newPost.save();
            console.log("New post created:", createdPost);
            return res.status(201).json(createdPost);
          } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ error: "Failed to create post" });
        }
})

router.put("/:postId",[
    body('id').notEmpty().withMessage('ID is required'),
    body('attributes.url').isURL().withMessage('Invalid URL'),
    body('attributes.LeadTimeField').isInt({ gt: -1 }).withMessage('LeadTimeField must be a positive integer'),
    body('children').isArray().withMessage('Children must be an array'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;

    console.log(data);

    const updatePost = await Post.findById(req.params.postId);

    if (!updatePost) {
        return res.status(404).json({ error: "Post not found" });
    }

    let interactiveVideos = [];

    const rootNode = {
        id: data.id,
        url: data.attributes.url,
        LeadTimeField: data.attributes.LeadTimeField,
        root: true,
        options: data.children.map(child => ({ label: child.name, nextVideoId: child.id}))
    }
    interactiveVideos.push(rootNode);

    const formatNode = (node) => {
        interactiveVideos.push({
            id: node.id,
            url: node.attributes.url,
            LeadTimeField: node.attributes.LeadTimeField,
            root: false,
            options: node.children.map(child => ({ label: child.name, nextVideoId: child.id }))
        });
        node.children.forEach(formatNode);
    };

    data.children.forEach(formatNode);


    updatePost.interactiveVideos = interactiveVideos;
    updatePost.timestamp =  new Date().toISOString();
    updatePost.userId = data.userId;
    updatePost.mediaUrl = data.mediaUrl;
    updatePost.text = data.text;
    updatePost.title =  data.title;
    
    try {
        const updatedPost = await updatePost.save();
        console.log("post updated:", updatePost);
        return res.status(200).json(updatedPost);
      } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ error: "Failed to update post" });
    }
})

module.exports = router;
