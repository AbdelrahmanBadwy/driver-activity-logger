const app = require("./interfaces/http/app");
const mongoDb = require("./infrastructure/database/mongo");
const kafkaProducer = require("./infrastructure/kafka/producer");
const config = require("./shared/config");
const logger = require("./shared/logger");

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoDb.connect();

    // Connect Kafka producer
    await kafkaProducer.connect();

    // Start HTTP server
    const server = app.listen(config.app.port, () => {
      logger.info(`API server listening on port ${config.app.port}`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      logger.info("Shutting down server...");

      server.close(async () => {
        logger.info("HTTP server closed");

        try {
          await kafkaProducer.disconnect();
          process.exit(0);
        } catch (error) {
          logger.error("Error during shutdown:", error);
          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
