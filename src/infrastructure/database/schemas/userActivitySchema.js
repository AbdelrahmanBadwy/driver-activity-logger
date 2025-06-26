const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  timestamp_ms: {
    type: Number,
    required: true,
    index: true,
  },
  drowsy: {
    type: Boolean,
    required: true,
  },
  distracted: {
    type: Boolean,
    required: true,
  },
  yawning: {
    type: Boolean,
    required: true,
  },
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

module.exports = UserActivity;
