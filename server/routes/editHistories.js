const express = require("express");
const mongoose = require("mongoose");
const EditHistory = mongoose.model("EditHistory");

const router = express.Router();

// Crear un nuevo historial de edición
router.post("/", async (req, res) => {
  try {
    const editHistory = new EditHistory(req.body);
    await editHistory.save();
    res.status(201).json(editHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
