const express = require("express");
const websiteContentController = require("../controllers/websiteContent.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.route("/")
  .get(websiteContentController.getAllContent)
  .post(protect, authorize("ADMIN"), websiteContentController.createContent);

router.route("/:id")
  .get(websiteContentController.getContentById)
  .put(protect, authorize("ADMIN"), websiteContentController.updateContent)
  .delete(protect, authorize("ADMIN"), websiteContentController.deleteContent);

module.exports = router;
