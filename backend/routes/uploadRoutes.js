const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document");
const ActivityLog = require("../models/ActivityLog");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Limit: 20MB and simple file filter as a safety
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

// router previously had: const upload = multer({ storage });

router.post("/", verifyToken, upload.single("file"), async (req, res) => {
  try {
    console.log("📤 Upload request received");
    console.log("File:", req.file);
    console.log("User:", req.user);
    
    if (!req.file) {
      console.log("❌ No file in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const allowed = ["events", "circulars", "documents", "rules", "regulations"];
    let { category, title, description } = req.body;
    if (!allowed.includes(category)) category = "documents";

    const doc = new Document({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      uploader: req.user.username,
      category,
      title: title || undefined,
      description: description || undefined,
    });
    
    console.log("💾 Saving document to database:", doc);
    await doc.save();
    console.log("✅ Document saved successfully");

    await ActivityLog.create({
      action: `Uploaded ${req.file.originalname} (${category})`,
      user: req.user.username,
    });
    console.log("✅ Activity log created");

    res
      .status(200)
      .json({ message: `${req.file.originalname} uploaded successfully!`, category });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
