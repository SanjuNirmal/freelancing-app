const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (event) => {
  try {
    let mailOptions = {
      from: process.env.MAIL_ADDRESS,
      to: event.email,
      subject: event.subject,
      text: event.emailBody,
    };

    console.log("mailOptions", mailOptions);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail(mailOptions);

    let response = {
      message: "Email sent successfully",
    };

    return response;
  } catch (error) {
    let errorMessage = {
      message: "error occurred while sending mail",
      error: error.message,
    };
    console.log(error);

    return errorMessage;
  }
};

module.exports.sendEmail = sendEmail;
