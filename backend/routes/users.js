const express = require("express");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.find({}, "-password");
  res.json(users);
});

module.exports = router;
