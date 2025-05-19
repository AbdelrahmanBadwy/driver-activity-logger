const UserActivityRepository = require("../../infrastructure/repositories/userActivityRepository");
const logger = require("../../shared/logger");

class ActivityProcessorService {
  async processActivity(activity) {
    try {
      logger.debug(`Processing activity for user ${activity.userId}`);

      // Add additional processing logic here if needed
      // For example: enrich data, analyze patterns, etc.

      // Store in database
      return await UserActivityRepository.saveActivity(activity);
    } catch (error) {
      logger.error("Error processing activity:", error);
      throw error;
    }
  }
}

module.exports = new ActivityProcessorService();
