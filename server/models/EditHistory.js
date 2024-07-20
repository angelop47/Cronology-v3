const mongoose = require("mongoose");

const editHistorySchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  editDate: { type: Date, default: Date.now },
  previousName: { type: String, required: true },
  previousDate: { type: Date, required: true },
  previousCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  previousDescription: { type: String, required: true },
  previousImage: { type: String, required: true },
});

module.exports = mongoose.model("EditHistory", editHistorySchema);
