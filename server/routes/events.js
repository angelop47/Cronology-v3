const express = require("express");
const mongoose = require("mongoose");
const Event = mongoose.model("Event");

const router = express.Router();

// Obtener todos los eventos con detalles de la categoría
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("categoryId", "name");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un evento por su ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo evento
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un evento por su ID
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un evento por su ID
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
