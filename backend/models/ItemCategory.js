const mongoose = require("mongoose");

const itemCategorySchema = mongoose.Schema(
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
  { collection: "ItemCategory" }
);

module.exports = mongoose.model("ItemCategory", itemCategorySchema);
