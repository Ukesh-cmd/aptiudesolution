const express = require("express");
const jobController = require("../controllers/job.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.route("/")
  .get(jobController.getAllJobs)
  .post(protect, authorize("ADMIN"), jobController.createJob);

router.route("/:id")
  .get(jobController.getJobById)
  .put(protect, authorize("ADMIN"), jobController.updateJob)
  .delete(protect, authorize("ADMIN"), jobController.deleteJob);

module.exports = router;
