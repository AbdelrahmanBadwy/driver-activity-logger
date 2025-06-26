class UserActivity {
  constructor({ timestamp_ms, drowsy, distracted, yawning }) {
    this.timestamp_ms = timestamp_ms;
    this.drowsy = drowsy;
    this.distracted = distracted;
    this.yawning = yawning;
  }

  validate() {
    if (typeof this.timestamp_ms !== "number")
      throw new Error("timestamp_ms must be a number (milliseconds)");
    if (typeof this.drowsy !== "boolean")
      throw new Error("drowsy must be a boolean");
    if (typeof this.distracted !== "boolean")
      throw new Error("distracted must be a boolean");
    if (typeof this.yawning !== "boolean")
      throw new Error("yawning must be a boolean");
    return true;
  }
}

module.exports = UserActivity;
