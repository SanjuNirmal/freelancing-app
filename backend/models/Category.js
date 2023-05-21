const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { collection: "Category" }
);

module.exports = mongoose.model("Category", categorySchema);
