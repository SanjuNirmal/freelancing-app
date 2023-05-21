const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3420;

app.use(
  cors({
    origin: "*",
  })
);

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/build")));

// database connections
mongoose
  .connect(
    // "mongodb+srv://client:XJGE8ENyYP4qRjaB@freelancingapp.mgpdo.mongodb.net/freelancingDB?retryWrites=true&w=majority",
    "mongodb+srv://admin:48Q6JjtqHSojCUDu@freelancingapp.mgpdo.mongodb.net/freelancingDB?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: false }
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error", JSON.stringify(err));
  });

// Root Route
app.get("/", (req, res) => {
  res.send("Freelancer API");
});

// import routes
const registerRoute = require("./routes/userService/register");
const loginRoute = require("./routes/userService/signin");
const userRoute = require("./routes/userService/user");
const userUpdateRoute = require("./routes/userService/UpdateUser");
const jobRoute = require("./routes/jobs/newJob");
const jobRoomRoute = require("./routes/jobs/newJobRoom");
const jobViewRoute = require("./routes/jobs/view");
const emailRoute = require("./routes/email/sendEmail");
const jobDelete = require("./routes/jobs/delete");
const newShopRoute = require("./routes/shop/NewItem");
const shopViewRoute = require("./routes/shop/view");
const shopDeleteRoute = require("./routes/shop/delete");
const categoryViewRoute = require("./routes/category/view");
const itemCategoryViewRoute= require("./routes/itemCategory/view");

// use routes
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/user", userRoute);
app.use("/api/user/update", userUpdateRoute);
app.use("/api/job", jobRoute);
app.use("/api/job", jobViewRoute);
app.use("/api/job/get", jobDelete);
app.use("/api/job-room", jobRoomRoute);
app.use("/api/send-email", emailRoute);
app.use("/api/shop", newShopRoute);
app.use("/api/shop", shopViewRoute);
app.use("/api/shop", shopDeleteRoute);
app.use("/api/category", categoryViewRoute);
app.use("/api/item-category", itemCategoryViewRoute);

//listening from the server
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
