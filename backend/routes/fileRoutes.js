const express = require("express");
const Document = require("../models/Document");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const files = await Document.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Failed to fetch files" });
  }
});

module.exports = router;
