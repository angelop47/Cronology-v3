const express = require("express");
const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const router = express.Router();

// Crear una nueva categoría
router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("The 'name' field is required.");
    }

    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
