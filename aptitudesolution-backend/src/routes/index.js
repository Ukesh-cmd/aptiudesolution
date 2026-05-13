const express = require("express");
const adminRoutes = require("./admin.routes");
const websiteContentRoutes = require("./websiteContent.routes");
const serviceRoutes = require("./service.routes");
const divisionRoutes = require("./division.routes");
const consultingServiceRoutes = require("./consultingService.routes");
const jobRoutes = require("./job.routes");
const inquiryRoutes = require("./inquiry.routes");
const settingRoutes = require("./setting.routes");
const healthRoutes = require("./health.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/admins", adminRoutes);
router.use("/content", websiteContentRoutes);
router.use("/services", serviceRoutes);
router.use("/divisions", divisionRoutes);
router.use("/consulting", consultingServiceRoutes);
router.use("/jobs", jobRoutes);
router.use("/inquiries", inquiryRoutes);
router.use("/settings", settingRoutes);

module.exports = router;

