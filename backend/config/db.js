const mongoose = require("mongoose");
const fs = require("fs");

const connectDB = async () => {
  try {
    // ✅ No need for deprecated options now
    const conn = await mongoose.connect("mongodb://localhost:27017/securedocs");

    fs.appendFileSync(
      "log.txt",
      `✅ MongoDB connected: ${conn.connection.host}\n`
    );
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (error) {
    fs.appendFileSync(
      "log.txt",
      `❌ MongoDB connection error: ${error.message}\n`
    );
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
