const express = require("express");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/authMiddleware");
const File = require("../models/File");

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🔐 Upload route (protected)
router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const fileDoc = new File({
      filename: req.file.filename,
      path: req.file.path,
      uploadedBy: req.user.userId,
      uploadedAt: new Date(),
    });

    await fileDoc.save();

    res.status(200).json({
      message: "File uploaded and saved",
      file: {
        id: fileDoc._id,
        filename: fileDoc.filename,
        path: fileDoc.path,
        uploadedAt: fileDoc.uploadedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to save file metadata" });
  }
});

// 🔍 List files uploaded by current user
router.get("/list", verifyToken, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.userId }).sort({
      uploadedAt: -1,
    });

    res.status(200).json({
      message: "Files retrieved",
      files: files.map((file) => ({
        id: file._id,
        filename: file.filename,
        path: file.path,
        uploadedAt: file.uploadedAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve files" });
  }
});

const fs = require("fs");

// 📥 Download a file by ID
router.get("/download/:id", verifyToken, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ error: "File not found" });
    if (file.uploadedBy.toString() !== req.user.userId)
      return res.status(403).json({ error: "Access denied" });

    const filePath = path.join(__dirname, "..", file.path);
    res.download(filePath, file.filename);
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
});
// 🗑️ Delete a file by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ error: "File not found" });
    if (file.uploadedBy.toString() !== req.user.userId)
      return res.status(403).json({ error: "Access denied" });

    // Delete file from disk
    fs.unlinkSync(path.join(__dirname, "..", file.path));

    // Delete metadata from DB
    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" });
  }
});

module.exports = router;
