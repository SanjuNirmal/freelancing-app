const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
    },
    skillCategory: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
  },
  { collection: "Profile" }
);

module.exports = mongoose.model("Profile", profileSchema);
