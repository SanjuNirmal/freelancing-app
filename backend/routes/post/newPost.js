const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const Post = require("../../models/Post");

router.get("/", async (req, res) => {
  res.send("New Post Route");
});

router.post("/", async (req, res) => {
  const postId = uuidv4();
  const newPost = new Post({
    postTitle: req.body.title,
    postContent: req.body.postContent,
    postId: postId,
  });

  try {
    const result = await newPost.save();

    res.status(201).json({
      status: "200 OK",
      message: "Post created Successfully",
      result: postId,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: err,
        errorMessage: err.message,
        message: "Post ID Duplication Error",
      });
    }
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the post",
    });
  }
});

module.exports = router;
