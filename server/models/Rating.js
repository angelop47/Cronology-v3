const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rating", ratingSchema);
