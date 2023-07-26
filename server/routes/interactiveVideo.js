const express = require("express");
var router = express.Router()
const { body, validationResult } = require('express-validator');

let videoTree = {
    "1": {
      id: "1",
      url: "https://www.youtube.com/watch?v=52ZkFD-YlmY",
      remain: 5,
      root: true,
      options: [
        {
          label: "Decline",
          nextVideoId: "2"
        },
        {
          label: "Answer",
          nextVideoId: "3"
        }
      ]
    },
    "2": {
      id: "2",
      url: "https://www.youtube.com/watch?v=CSyDiUbjtTE",
      remain: 0,
      root: false,
      options: []
    },
    "3": {
      id: "3",
      url: "https://www.youtube.com/watch?v=VUj1PbvnHS4",
      remain: 0,
      root: false,
      options: []
    }
    // Add more videos here
  };

router.get("/videoTree/:id", (req, res) => {
  const videoId = req.params.id;
  const videoObject = videoTree[videoId];

  if (videoObject) {
    res.json(videoObject);
  } else {
    res.status(404).json({ error: "Video not found." });
  }
});

router.post("/",[
        body('id').notEmpty().withMessage('ID is required'),
        body('attributes.url').isURL().withMessage('Invalid URL'),
        body('attributes.remain').isInt({ gt: -1 }).withMessage('Remain must be a positive integer'),
        body('children').isArray().withMessage('Children must be an array'),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const data = req.body;

        const rootNode = {
            id: data.id,
            url: data.attributes.url,
            remain: data.attributes.remain,
            root: true,
            options: data.children.map(child => ({ label: child.name, nextVideoId: child.id}))
        }
        videoTree[data.id] = rootNode;

        const formatNode = (node) => {
            videoTree[node.id] = {
                id: node.id,
                url: node.attributes.url,
                remain: node.attributes.remain,
                root: false,
                options: node.children.map(child => ({ label: child.name, nextVideoId: child.id }))
            };
            node.children.forEach(formatNode);
        };

        data.children.forEach(formatNode);
        console.log(videoTree);

        res.sendStatus(200);
})

module.exports = router;
