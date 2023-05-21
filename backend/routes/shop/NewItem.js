const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const Shop = require("../../models/Shop");

router.get("/", async (req, res) => {
  res.send("New Shop Route");
});

router.post("/", async (req, res) => {
  const id = uuidv4();
  // console.log(req.body.data);

  const newItem = new Shop({
    id: id,
    mainTitle: req.body.data.mainTitle,
    content: req.body.data.content,
    category: req.body.data.category,
    price: req.body.data.price,
    postedUser: req.body.data.postedUser,
    postedName: req.body.data.postedName,
  });

  try {
    const result = await newItem.save();

    res.status(201).json({
      status: "200 OK",
      message: "Shop Item created Successfully",
      id: id,
      result: result,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: err,
        errorMessage: err.message,
        message: "Shop Item ID Duplication Error",
      });
    }
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the new shop item",
    });
  }
});

module.exports = router;
