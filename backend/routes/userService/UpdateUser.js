const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/Register");

router.get("/", async (req, res) => {
  res.send("user update Route");
});

router.post("/name", async (req, res) => {
  const userName = req.body.userName;
  const name = req.body.name;

  const userFromDb = await User.findOne({
    userName: userName,
  });

  if (!userFromDb) {
    return res.status(404).json({
      status: "error",
      error: error,
      errorMessage: error.message,
      message: "user not found",
    });
  }

  const id = userFromDb._id;

  try {
    const response = await User.updateOne(
      { _id: id },
      {
        $set: { name: name },
      }
    );

    res.status(200).json({
      status: "202 OK",
      message: "Name Updated successfully",
      result: response,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while updating the name",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.post("/description", async (req, res) => {
  const userName = req.body.userName;
  const description = req.body.description;

  const userFromDb = await User.findOne({
    userName: userName,
  });

  if (!userFromDb) {
    return res.status(404).json({
      status: "error",
      error: error,
      errorMessage: error.message,
      message: "user not found",
    });
  }

  const id = userFromDb._id;

  try {
    const response = await User.updateOne(
      { _id: id },
      {
        $set: { description: description },
      }
    );

    res.status(200).json({
      status: "202 OK",
      message: "Description Updated successfully",
      result: response,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while updating the description",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
