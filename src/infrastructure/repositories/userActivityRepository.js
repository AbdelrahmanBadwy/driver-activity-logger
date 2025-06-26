const UserActivityModel = require("../database/schemas/userActivitySchema");
const logger = require("../../shared/logger");

class UserActivityRepository {
  async saveActivity(activity) {
    try {
      const newActivity = new UserActivityModel({
        timestamp_ms: activity.timestamp_ms,
        drowsy: activity.drowsy,
        distracted: activity.distracted,
        yawning: activity.yawning,
      });
      return await newActivity.save();
    } catch (error) {
      logger.error("Error saving activity to database:", error);
      throw error;
    }
  }

  async findActivities(filters = {}, pagination = { page: 1, limit: 10 }) {
    try {
      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const query = UserActivityModel.find(filters)
        .sort({ timestamp_ms: -1 })
        .skip(skip)
        .limit(limit);

      const [data, total] = await Promise.all([
        query.exec(),
        UserActivityModel.countDocuments(filters),
      ]);

      return {
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error("Error finding activities:", error);
      throw error;
    }
  }
}

module.exports = new UserActivityRepository();
