const express = require("express");
const prisma = require("../db/prismaClient");
const ApiResponse = require("../utils/apiResponse");

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get API health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 */
router.get("/", async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    database: "Unknown",
  };

  try {
    // Check DB connection
    await prisma.$queryRaw`SELECT 1`;
    healthCheck.database = "Healthy";
    return ApiResponse.success(res, "Health check successful", healthCheck);
  } catch (error) {
    healthCheck.database = "Unhealthy";
    healthCheck.error = error.message;
    return ApiResponse.error(res, "Health check failed", 503, healthCheck);
  }
});

module.exports = router;
