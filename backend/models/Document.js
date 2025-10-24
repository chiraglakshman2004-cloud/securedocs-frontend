const mongoose = require("mongoose");

const CATEGORIES = ["events", "circulars", "documents", "rules", "regulations"];

const documentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  uploader: { type: String, required: true },
  category: { type: String, enum: CATEGORIES, default: "documents", index: true },
  title: { type: String },
  description: { type: String },
  size: { type: Number },
  path: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);
module.exports = Document;
