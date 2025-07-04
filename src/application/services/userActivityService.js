const UserActivity = require("../../domain/models/UserActivity");
const kafkaProducer = require("../../infrastructure/kafka/producer");
const UserActivityRepository = require("../../infrastructure/repositories/userActivityRepository");
const config = require("../../shared/config");
const logger = require("../../shared/logger");

class UserActivityService {
  async logActivity(activityData) {
    try {
      // create and validate domain object
      const activity = new UserActivity(activityData);
      activity.validate();

      // send to Kafka
      await kafkaProducer.sendMessage(
        config.kafka.topics.userActivities,
        activity
      );

      return { success: true, activity };
    } catch (error) {
      logger.error("Error logging user activity:", error);
      throw error;
    }
  }

  async getActivities(filters, pagination) {
    try {
      return await UserActivityRepository.findActivities(filters, pagination);
    } catch (error) {
      logger.error("Error retrieving user activities:", error);
      throw error;
    }
  }
}

module.exports = new UserActivityService();
