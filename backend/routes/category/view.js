const express = require("express");
const router = express.Router();
require("dotenv").config();

const Category = require("../../models/Category");

router.get("/view_all", async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json({
      status: "202 OK",
      message: "Category fetched successfully",
      result: allCategories,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the catregory list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.get("/view_one/:value", async (req, res) => {
  const value = req.query.value;
  try {
    const onePost = await Category.findOne({
        value: value,
    });
    res.status(200).json({
      status: "202 OK",
      message: "Category fetched successfully",
      result: onePost,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the category list",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
