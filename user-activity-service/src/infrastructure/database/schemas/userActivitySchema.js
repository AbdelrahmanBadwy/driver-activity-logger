const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  activityType: {
    type: String,
    required: true,
    index: true,
  },
  metadata: {
    type: Object,
    default: {},
  },
  processedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  timestamp: {
    type: Date,
    required: true,
    index: true,
  },
});

// Create compound indexes for common queries
userActivitySchema.index({ userId: 1, timestamp: -1 });
userActivitySchema.index({ activityType: 1, timestamp: -1 });

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

module.exports = UserActivity;
