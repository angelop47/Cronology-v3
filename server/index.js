const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cors = require("cors");

// Importar modelos
require("./models/User");
require("./models/Category");
require("./models/Event");
require("./models/Comment");
require("./models/Rating");
require("./models/EditHistory");

// Importar rutas
const userRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const eventRouter = require("./routes/events");
const commentRouter = require("./routes/comments");
const ratingRouter = require("./routes/ratings");
const editHistoryRouter = require("./routes/editHistories");

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
connectDB();

// Usar CORS
app.use(cors());

app.use(express.json());

// Usar las rutas
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/events", eventRouter);
app.use("/comments", commentRouter);
app.use("/ratings", ratingRouter);
app.use("/editHistories", editHistoryRouter);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Manejar el cierre de la aplicación
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
    mongoose.connection.close(false, () => {
      console.log("MongoDB disconnected");
      process.exit(0);
    });
  });
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Process interrupted");
    mongoose.connection.close(false, () => {
      console.log("MongoDB disconnected");
      process.exit(0);
    });
  });
});
