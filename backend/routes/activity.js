const express = require("express");
const ActivityLog = require("../models/ActivityLog");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// GET /activity?user=alice&action=upload
router.get("/", verifyToken, async (req, res) => {
  try {
    const { user, action } = req.query;

    // Build dynamic filter
    const filter = {};
    if (user) filter.user = user;
    if (action) filter.action = action;

    // Restrict non-admins to their own logs
    if (req.user?.role !== "admin") {
      filter.user = req.user?.username;
    }

    const logs = await ActivityLog.find(filter)
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(logs);
  } catch (err) {
    console.error("Error fetching activity logs:", err);
    res.status(500).json({ message: "Server error while fetching logs" });
  }
});

module.exports = router;
