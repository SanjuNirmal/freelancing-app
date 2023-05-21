const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const Email = require("../../models/Email");
const sendEmail = require("../../helpers/email/mailSender");

router.get("/", async (req, res) => {
  res.send("New Email Route");
});

router.post("/", async (req, res) => {
  try {
    const event = {
      sender: req.body.dataForEmail.sender,
      email: req.body.dataForEmail.postedUser,
      subject: req.body.dataForEmail.title,
      emailBody: req.body.dataForEmail.content,
    };


    const result = await sendEmail.sendEmail(event);

    console.log("response from email sender", res);

    res.status(201).json({
      status: "200 OK",
      message: "Mail created Successfully",
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the new email",
    });
  }
});

module.exports = router;
