const UserActivityRepository = require("../../infrastructure/repositories/userActivityRepository");
const logger = require("../../shared/logger");

class ActivityProcessorService {
  async processActivity(activity) {
    try {
      logger.debug(`Processing activity: ${JSON.stringify(activity)}`);
      // Validate structure
      if (
        typeof activity.timestamp_ms !== "number" ||
        typeof activity.drowsy !== "boolean" ||
        typeof activity.distracted !== "boolean" ||
        typeof activity.yawning !== "boolean"
      ) {
        throw new Error("Invalid activity structure");
      }
      return await UserActivityRepository.saveActivity(activity);
    } catch (error) {
      logger.error("Error processing activity:", error);
      throw error;
    }
  }
}

module.exports = new ActivityProcessorService();
