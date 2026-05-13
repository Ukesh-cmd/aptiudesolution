const express = require("express");
const settingController = require("../controllers/setting.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.route("/")
  .get(settingController.getAllSettings)
  .post(protect, authorize("ADMIN"), settingController.createSetting);

router.route("/:key")
  .get(settingController.getSettingByKey)
  .put(protect, authorize("ADMIN"), settingController.updateSetting)
  .delete(protect, authorize("ADMIN"), settingController.deleteSetting);

module.exports = router;
