const express = require("express");
const inquiryController = require("../controllers/inquiry.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.route("/")
  .get(inquiryController.getAllInquiries)
  .post(inquiryController.createInquiry);

router.route("/:id")
  .get(inquiryController.getInquiryById)
  .put(protect, authorize("ADMIN"), inquiryController.updateInquiry)
  .delete(protect, authorize("ADMIN"), inquiryController.deleteInquiry);

module.exports = router;
