const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());
app.use(cors());

// Health check
app.get("/ping", (req, res) => res.send("Server is alive and responding"));

// Routes
app.use("/auth", authRoutes); // Registration, login, profile, admin
app.use("/files", uploadRoutes); // File upload route
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use("/files", uploadRoutes);
app.use("/uploads", express.static("uploads")); // to serve files directly

// MongoDB connection
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/securechat";
const port = process.env.PORT || 5000;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
