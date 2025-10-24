const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const loginRoutes = require("./routes/login");
const activityRoutes = require("./routes/activity");
const fileRoutes = require("./routes/fileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/users");

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());
app.use(cors());

// Health check
app.get("/ping", (req, res) => res.send("Server is alive and responding"));

// Routes
app.use("/auth", authRoutes); // Registration, login, profile, admin
app.use("/login", loginRoutes);
app.use("/upload", uploadRoutes); // File upload route
app.use("/files", fileRoutes); // File management routes
app.use("/activity", activityRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// MongoDB connection
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/securedocs";
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
