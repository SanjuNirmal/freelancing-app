const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    userName: {
      type: "string",
      required: true,
      unique: true,
    },
    name: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    email: {
      required: true,
      type: "string",
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", registerSchema);
