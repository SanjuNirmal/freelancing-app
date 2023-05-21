const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    postTitle: {
      type: "string",
      required: true,
      unique: true,
    },
    postContent: {
      type: "string",
      required: true,
    },
    postID: {
      type: "string",
      required: true,
    },
  },
  { collection: "Post" }
);

module.exports = mongoose.model("Post", postSchema);
