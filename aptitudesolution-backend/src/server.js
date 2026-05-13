require("dotenv").config();
const { port } = require("./config/env");
const app = require("./app");
const prisma = require("./db/prismaClient");
const logger = require("./utils/logger");

const server = app.listen(port, () => {

  logger.info(`Server running on http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  logger.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(async () => {
    await prisma.$disconnect();
    logger.info("💥 Process terminated!");
  });
});