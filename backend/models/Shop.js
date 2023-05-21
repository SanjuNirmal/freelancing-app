const mongoose = require("mongoose");

const shopSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    mainTitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    postedUser: {
      type: String,
      required: true,
    },
    postedName: {
      type: String,
      required: true,
    },
  },
  { collection: "Shop" }
);

module.exports = mongoose.model("Shop", shopSchema);
