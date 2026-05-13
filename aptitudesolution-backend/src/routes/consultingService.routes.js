const express = require("express");
const consultingServiceController = require("../controllers/consultingService.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.route("/")
  .get(consultingServiceController.getAllConsultingServices)
  .post(protect, authorize("ADMIN"), consultingServiceController.createConsultingService);

router.route("/:id")
  .get(consultingServiceController.getConsultingServiceById)
  .put(protect, authorize("ADMIN"), consultingServiceController.updateConsultingService)
  .delete(protect, authorize("ADMIN"), consultingServiceController.deleteConsultingService);

module.exports = router;
