const userActivityService = require("../../../application/services/userActivityService");
const logger = require("../../../shared/logger");

exports.logActivity = async (req, res) => {
  try {
    const { timestamp_ms, drowsy, distracted, yawning } = req.body;

    if (
      typeof timestamp_ms !== "number" ||
      typeof drowsy !== "boolean" ||
      typeof distracted !== "boolean" ||
      typeof yawning !== "boolean"
    ) {
      return res.status(400).json({
        error:
          "Missing or invalid required fields: timestamp_ms (number), drowsy (boolean), distracted (boolean), yawning (boolean) are required",
      });
    }

    const result = await userActivityService.logActivity({
      timestamp_ms,
      drowsy,
      distracted,
      yawning,
    });
    return res.status(201).json(result);
  } catch (error) {
    logger.error("Error in log activity controller:", error);
    return res.status(400).json({ error: error.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    // Extract query parameters
    const {
      drowsy,
      distracted,
      yawning,
      minTimestamp,
      maxTimestamp,
      page = 1,
      limit = 10,
    } = req.query;

    // Build filters
    const filters = {};
    if (drowsy !== undefined) filters.drowsy = drowsy === "true";
    if (distracted !== undefined) filters.distracted = distracted === "true";
    if (yawning !== undefined) filters.yawning = yawning === "true";
    if (minTimestamp || maxTimestamp) {
      filters.timestamp_ms = {};
      if (minTimestamp) filters.timestamp_ms.$gte = Number(minTimestamp);
      if (maxTimestamp) filters.timestamp_ms.$lte = Number(maxTimestamp);
    }

    // Pagination
    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const activities = await userActivityService.getActivities(
      filters,
      pagination
    );
    return res.json(activities);
  } catch (error) {
    logger.error("Error in get activities controller:", error);
    return res.status(500).json({ error: "Failed to retrieve activities" });
  }
};

exports.getActivityTypes = (req, res) => {
  return res.json([]); // No activity types in new structure
};
