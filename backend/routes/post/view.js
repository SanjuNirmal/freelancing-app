const express = require("express");
const router = express.Router();
require("dotenv").config();

const Post = require("../../models/Post");

router.get("/view_all", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({
      status: "202 OK",
      message: "Post fetched successfully",
      result: allPosts,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the post list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.get("/view_one/:userName", async (req, res) => {
  const postId = req.query.postId;
  try {
    const onePost = await Post.findOne({
      postID: postId,
    });
    res.status(200).json({
      status: "202 OK",
      message: "Post fetched successfully",
      result: onePost,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the user list",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
