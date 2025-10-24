// Script to create a test user for SecureDocs Portal
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

async function createTestUser() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/securechat";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Create test users
    const testUsers = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user1", password: "password123", role: "user" },
      { username: "testuser", password: "testpass", role: "user" }
    ];

    for (const userData of testUsers) {
      try {
        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
          console.log(`⚠️  User '${userData.username}' already exists`);
        } else {
          const user = new User(userData);
          await user.save();
          console.log(`✅ Created user: ${userData.username} (${userData.role})`);
        }
      } catch (error) {
        console.log(`❌ Error creating user '${userData.username}':`, error.message);
      }
    }

    console.log("\n🎉 Test users created successfully!");
    console.log("\n📋 Valid Login Credentials:");
    console.log("👤 Admin: username='admin', password='admin123'");
    console.log("👤 User: username='user1', password='password123'");
    console.log("👤 User: username='testuser', password='testpass'");
    
    console.log("\n🧪 Invalid Login Credentials to Test:");
    console.log("❌ username='invaliduser', password='anything'");
    console.log("❌ username='admin', password='wrongpassword'");
    console.log("❌ username='', password=''");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

createTestUser();
