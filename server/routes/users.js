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
        password: "google-auth", // Esto es solo un marcador de posición, ya que la autenticación real se maneja por Firebase
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

module.exports = router;
