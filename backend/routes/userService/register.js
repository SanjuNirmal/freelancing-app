const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/Register");

router.get("/", async (req, res) => {
  res.send("Register Route");
});

router.post("/", async (req, res) => {
  const userName = req.body.data.email;
  const pwd = req.body.data.password;

  console.log(req.body.data);

  if (!userName || typeof userName !== "string") {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid user name" });
  }

  if (!pwd || typeof pwd !== "string") {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid user name" });
  }

  if (pwd.length < 8) {
    return res.status(400).json({
      status: "error",
      error: "Password should be at least 8 characters",
    });
  }

  const hashedPassword = await bcrypt.hash(pwd, 10);

  const register = new User({
    name: req.body.data.name,
    userName: req.body.data.email,
    password: hashedPassword,
    description: req.body.data.description,
    email: req.body.data.email,
  });

  try {
    const result = await register.save();
    const webToken = jwt.sign(
      {
        userName: register.userName,
      },
      process.env.JWT_SECRET
    );

    console.log("result", result);

    res.status(200).json({
      status: "200 OK",
      token: webToken,
      message: "User created Successfully",
      result: result,
    });
  } catch (err) {
    console.log("error", err);

    if (err.code === 11000) {
      return res.status(400).json({
        error: err,
        errorMessage: err.message,
        message: "User Name Duplication Error",
      });
    }
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the user",
    });
  }
});

module.exports = router;
