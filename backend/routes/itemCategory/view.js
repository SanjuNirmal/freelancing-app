const express = require("express");
const router = express.Router();
require("dotenv").config();

const ItemCategory = require("../../models/ItemCategory");

router.get("/view_all", async (req, res) => {
  try {
    const allCategories = await ItemCategory.find();
    res.status(200).json({
      status: "202 OK",
      message: "Item Category fetched successfully",
      result: allCategories,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the Item Category list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.get("/view_one/:value", async (req, res) => {
  const value = req.query.value;
  try {
    const onePost = await ItemCategory.findOne({
        value: value,
    });
    res.status(200).json({
      status: "202 OK",
      message: "ItemCategory fetched successfully",
      result: onePost,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the Item Category list",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
