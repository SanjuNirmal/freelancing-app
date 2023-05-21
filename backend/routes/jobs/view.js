const express = require("express");
const router = express.Router();
require("dotenv").config();

const Job = require("../../models/Job");

router.get("/view_all", async (req, res) => {
  try {
    const allJobs = await Job.find();
    res.status(200).json({
      status: "202 OK",
      message: "Job fetched successfully",
      result: allJobs,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the Job list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.get("/view_one", async (req, res) => {
  const postId = req.body.data.id;
  try {
    const oneJob = await Job.findOne({
      id: postId,
    });
    res.status(200).json({
      status: "202 OK",
      message: "Job fetched successfully",
      result: oneJob,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the Job list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.post("/view_by_user", async (req, res) => {
  const userName = req.body.userName;
  try {
    const allJobs = await Job.find();
    let jobList = [];

    for (let index = 0; index < allJobs.length; index++) {
      if (allJobs[index].postedUser === userName) {
        // console.log("available");
        jobList.push(allJobs[index]);
      } else {
        // console.log("null");
      }
    }

    res.status(200).json({
      status: "202 OK",
      message: "Job fetched successfully",
      result: jobList,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the Job list",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
