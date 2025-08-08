
//backend//api/reviews
const express = require("express");
const router = express.Router();
const Review = require("../models/Review");


router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
