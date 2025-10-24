const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String }
});

const ActivityLog = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);
module.exports = ActivityLog;
