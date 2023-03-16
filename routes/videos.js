const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

const FILE_PATH = "./data/videos.json";

// Refactored function to read videos from file
const readVideos = () => {
  return JSON.parse(fs.readFileSync(FILE_PATH));
};

// Refactored route handler for getting all videos
router.get("/", (req, res) => {
  res.status(200).json(readVideos());
});

// Refactored route handler for getting a single video
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const video = readVideos().find((vid) => vid.id === id);

  if (!video) {
    return res.status(404).send("Video not found");
  }
  res.send(video);
});

// Refactored route handler for creating a new video
router.post("/", (req, res) => {
  const videoObj = req.body;
  const newVideo = {
    id: uuid(),
    timestamp: Date.now(),
    channel: "coolestUser1",
    image: "http://localhost:8000/dataImages/image-default.jpeg",
    views: "0",
    likes: "0",
    ...videoObj, // Use object spread to include additional properties from request body
  };

  const videosData = readVideos();
  videosData.push(newVideo);

  fs.writeFileSync(FILE_PATH, JSON.stringify(videosData));

  res.status(201).json(newVideo);
});

module.exports = router;
