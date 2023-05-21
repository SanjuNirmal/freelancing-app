const mongoose = require("mongoose");

const emailSchema = mongoose.Schema(
  {
    postedUser: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "Email" }
);

module.exports = mongoose.model("Email", emailSchema);
