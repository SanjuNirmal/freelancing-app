const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const Job = require("../../models/Job");

router.get("/", async (req, res) => {
  res.send("New Job Route");
});

router.post("/", async (req, res) => {
  const id = uuidv4();
  // console.log(req.body.data);

  const newJob = new Job({
    id: id,
    mainTitle: req.body.data.mainTitle,
    content: req.body.data.content,
    category: req.body.data.category,
    category2: req.body.data.category2,
    days: req.body.data.days,
    price: req.body.data.price,
    postedUser: req.body.data.postedUser,
    postedName: req.body.data.postedName,
  });

  try {
    const result = await newJob.save();

    res.status(201).json({
      status: "200 OK",
      message: "Job created Successfully",
      id: id,
      result: result,
      job: newJob,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: err,
        errorMessage: err.message,
        message: "Job ID Duplication Error",
      });
    }
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the new job",
    });
  }
});

module.exports = router;
