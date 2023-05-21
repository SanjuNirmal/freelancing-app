const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/Register");

router.get("/view_all", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "202 OK",
      message: "Users fetched successfully",
      result: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the user list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.get("/view_one/:userName", async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.params.userName,
    });

    res.status(200).json({
      status: "202 OK",
      message: "User fetched successfully",
      result: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the user list",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
