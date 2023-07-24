const express = require("express");
var router = express.Router()

let videoTree = {
    "1": {
      id: "1",
      url: "https://www.youtube.com/watch?v=52ZkFD-YlmY",
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
      options: []
    },
    "3": {
      id: "3",
      url: "https://www.youtube.com/watch?v=VUj1PbvnHS4",
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

module.exports = router;
