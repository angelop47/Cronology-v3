const express = require("express");
const mongoose = require("mongoose");
const Rating = mongoose.model("Rating");

const router = express.Router();

// Crear una nueva valoración
router.post("/", async (req, res) => {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
