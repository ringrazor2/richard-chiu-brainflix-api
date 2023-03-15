const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

const FILE_PATH = "./data/videos.json";

const readVideos = () => {
  const videosData = JSON.parse(fs.readFileSync(FILE_PATH));
  return videosData;
};

router.get("/", (req, res) => {
  const videosData = readVideos();
  res.status(200).json(videosData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const videosData = readVideos();
  const video = videosData.find((vid) => vid.id === id);

  if (!video) {
    res.status(404).send("Video not found");
  }
  res.send(video);
});

router.post("/", (req, res) => {
  const videoObj = req.body;
  const newVideo = {
    id: uuid(),
    title: videoObj.title,
    description: videoObj.description,
    timestamp: Date.now(),
    image: "https://i.imgur.com/MMDMgD7.jpg",
    views: "739,945",
    likes: "98,352",
  };

  const videosData = readVideos();
  videosData.push(newVideo);

  fs.writeFileSync(FILE_PATH, JSON.stringify(videosData));

  res.status(201).json(newVideo);
});

module.exports = router;
