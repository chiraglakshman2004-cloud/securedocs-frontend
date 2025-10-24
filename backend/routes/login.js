const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid username" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { 
      userId: user._id, 
      username: user.username, 
      role: user.role 
    },
    process.env.JWT_SECRET || "default-secret-key",
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.role });
});

module.exports = router;
