const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
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
    category2: {
      type: String,
      required: true,
    },
    days: {
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
  { collection: "Job" }
);

module.exports = mongoose.model("Job", jobSchema);
