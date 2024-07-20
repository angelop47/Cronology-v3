const express = require("express");
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

const router = express.Router();

// Crear un nuevo comentario
router.post("/", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
