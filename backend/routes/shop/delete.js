const express = require("express");
const router = express.Router();
require("dotenv").config();

const Shop = require("../../models/Shop");

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const userFromDb = await Shop.findOne({
      id: id,
    }).lean();
   

    if (userFromDb !== "") {
      const result = await Shop.deleteOne({ id: id });
    //   console.log("result from delete", result);
      return res.status(200).json({
        response: result,
      });
    } else {
      return res.status(400).json({
        message: "Shop item does not exists in the Collection",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while deleting the new job",
    });
  }
});

module.exports = router;
