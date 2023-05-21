const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const JobRoom = require("../../models/JobRoom");

router.get("/", async (req, res) => {
  res.send("New Job Room Route");
});

router.post("/", async (req, res) => {
  try {
    const postedUser = req.body.data.postedUser;
    // console.log(req.body.data.jobRoomArray);

    const newJob = new JobRoom({
      postedUser: req.body.data.postedUser,
      jobRoomArray: req.body.data.jobRoomArray,
    });

    //   console.log(newJob);

    const userFromDb = await JobRoom.findOne({
      postedUser: postedUser,
    }).lean();

    // console.log(userFromDb);

    if (!userFromDb) {
      const result = await newJob.save();

      res.status(201).json({
        status: "200 OK",
        message: "Job Room created Successfully",
        response: result,
      });
    } else {
      const result = await newJob.updateOne(
        {
          postedUser: postedUser,
        },
        { $push: { jobRoomArray: req.body.data.jobRoomArray } }
      );

      res.status(201).json({
        status: "200 OK",
        message: "Job Room Updated Successfully",
        response: result,
      });
    }
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

router.get("/view_one", async (req, res) => {
  const postedUser = req.body.data.postedUser;
  try {
    const oneJob = await JobRoom.findOne({
      postedUser: postedUser,
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

module.exports = router;
