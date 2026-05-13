const express = require("express");
const adminController = require("../controllers/admin.controller");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/rbacMiddleware");

const router = express.Router();

router.post("/register", protect, authorize("ADMIN"), adminController.register);
router.post("/login", adminController.login);
router.get("/me", protect, adminController.getMe);

router.route("/")
  .get(protect, authorize("ADMIN"), adminController.getAllAdmins)
  .post(protect, authorize("ADMIN"), adminController.createAdmin);

router.route("/:id")
  .get(protect, authorize("ADMIN"), adminController.getAdminById)
  .put(protect, authorize("ADMIN"), adminController.updateAdmin)
  .delete(protect, authorize("ADMIN"), adminController.deleteAdmin);

module.exports = router;
