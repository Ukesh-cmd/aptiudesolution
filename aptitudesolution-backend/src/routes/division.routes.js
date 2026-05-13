const express = require("express");
const divisionController = require("../controllers/division.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.route("/")
  .get(divisionController.getAllDivisions)
  .post(protect, authorize("ADMIN"), divisionController.createDivision);

router.route("/:id")
  .get(divisionController.getDivisionById)
  .put(protect, authorize("ADMIN"), divisionController.updateDivision)
  .delete(protect, authorize("ADMIN"), divisionController.deleteDivision);

module.exports = router;
