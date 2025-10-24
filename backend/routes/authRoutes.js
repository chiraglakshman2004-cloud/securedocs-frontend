require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

console.log("verifyToken type:", typeof verifyToken);
console.log("verifyAdmin type:", typeof verifyAdmin);
console.log("User type:", typeof User);

// Register
router.post("/register", async (req, res) => {
  fs.appendFileSync("log.txt", "📨 /auth/register route hit\n");
  try {
    const { username, password, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "username and password required" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ error: "Username already exists" });

    const user = new User({ username, password, role: role || "user" });
    await user.save();
    res.status(201).json({
      message: "User registered",
      user: { _id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  fs.appendFileSync("log.txt", "🔐 /auth/login route hit\n");
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "default-secret-key",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Protected profile route", user: req.user });
});

// Admin-only
router.get("/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Welcome, admin!", user: req.user });
});

module.exports = router;
