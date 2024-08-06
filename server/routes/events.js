const express = require("express");
const mongoose = require("mongoose");
const Event = mongoose.model("Event");
const User = require("../models/User"); //

const router = express.Router();

// Ruta para obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("categoryId");
    console.log("Eventos obtenidos sin usuario:", events);

    // Buscar el nombre del usuario basado en el userEmail
    const eventsWithUserNames = await Promise.all(
      events.map(async (event) => {
        const user = await User.findOne({ email: event.userEmail });
        console.log(`Usuario encontrado para el evento ${event._id}:`, user);
        return {
          ...event._doc, // _doc contiene los datos originales del documento
          userName: user ? user.name : "Sin usuario",
        };
      })
    );

    console.log("Eventos obtenidos con usuario:", eventsWithUserNames);
    res.status(200).json(eventsWithUserNames);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los eventos", error: error.message });
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
  const { name, date, categoryId, description, image, userEmail } = req.body;

  try {
    const event = new Event({
      name,
      date,
      categoryId,
      description,
      image,
      userEmail, // Guardar el email del usuario aquí
    });
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
