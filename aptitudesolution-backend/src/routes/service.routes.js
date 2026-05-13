const express = require("express");
const serviceController = require("../controllers/service.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.route("/")
  .get(serviceController.getAllServices)
  .post(protect, authorize("ADMIN"), serviceController.createService);

router.route("/:id")
  .get(serviceController.getServiceById)
  .put(protect, authorize("ADMIN"), serviceController.updateService)
  .delete(protect, authorize("ADMIN"), serviceController.deleteService);

module.exports = router;
