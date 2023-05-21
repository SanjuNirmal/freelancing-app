const mongoose = require("mongoose");

const gigSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    categoryOne: {
      type: String,
      required: true,
    },
    categoryTwo: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    metadata: {
      type: String,
      required: true,
    },
    searchTag: [
      {
        type: String,
        required: true,
      },
    ],
    packageName: [
      {
        name: { type: String, required: true },
      },
    ],
    packageDescription: [
      {
        description: { type: String, required: true },
      },
    ],
    deliveryTime: [
      {
        days: { type: String, required: true },
      },
    ],
    numberOfPages: [
      {
        pagesnum: { type: String, required: true },
      },
    ],
    numberOfProducts: [
      {
        productsum: { type: String, required: true },
      },
    ],
    customization: [
      {
        name: { type: Boolean, required: true },
      },
    ],
    responsiveDesign: [
      {
        name: { type: Boolean, required: true },
      },
    ],
    contentUpload: [
      {
        name: { type: Boolean, required: true },
      },
    ],
    rvisions: [
      {
        name: { type: String, required: true },
      },
    ],
    price: [
      {
        name: { type: Number, required: true },
      },
    ],
    image: {
      type: String,
      required: true,
    },
  },
  { collection: "Gig" }
);

module.exports = mongoose.model("Gig", gigSchema);
