const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Ruta para manejar la autenticación con Google
router.post("/auth/google", async (req, res) => {
  const { name, email, photo } = req.body;

  try {
    // Buscar si el usuario ya existe
    let user = await User.findOne({ email });

    if (user) {
      // Si el usuario ya existe, actualizar los datos
      user.name = name;
      user.photo = photo;
      await user.save();
    } else {
      // Si el usuario no existe, crear un nuevo usuario
      user = new User({
        name,
        email,
        photo,
      });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    res.status(500).json({ message: "Error al guardar el usuario" });
  }
});

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

// Ruta para obtener un usuario específico por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
});

// Ruta para actualizar un usuario por ID
router.put("/:id", async (req, res) => {
  const { name, email, photo, description } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.photo = photo || user.photo;
    user.description = description || user.description;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

// Ruta para eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
});

module.exports = router;
