const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);
module.exports = File;
