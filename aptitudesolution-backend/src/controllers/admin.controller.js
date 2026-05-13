const bcrypt = require("bcryptjs");
const adminService = require("../services/admin.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { generateAccessToken } = require("../utils/token.utils");

class AdminController {
  getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await adminService.getAllAdmins();
    return ApiResponse.success(res, admins, "Admins fetched successfully");
  });

  getAdminById = asyncHandler(async (req, res) => {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) {
      return ApiResponse.error(res, "Admin not found", 404);
    }
    return ApiResponse.success(res, admin, "Admin fetched successfully");
  });

  createAdmin = asyncHandler(async (req, res) => {
    const admin = await adminService.createAdmin(req.body);
    return ApiResponse.success(res, admin, "Admin created successfully", 201);
  });

  updateAdmin = asyncHandler(async (req, res) => {
    const admin = await adminService.updateAdmin(req.params.id, req.body);
    return ApiResponse.success(res, admin, "Admin updated successfully");
  });

  register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    
    const adminExists = await adminService.findByEmail(email);
    if (adminExists) {
      return ApiResponse.error(res, "Admin already exists", 400);
    }

    const admin = await adminService.createAdmin({ email, password, name });
    const accessToken = generateAccessToken({ id: admin.id, role: admin.role });

    return ApiResponse.success(res, { admin, accessToken }, "Admin registered successfully", 201);
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminService.findByEmail(email);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return ApiResponse.error(res, "Invalid email or password", 401);
    }

    const accessToken = generateAccessToken({ id: admin.id, role: admin.role });
    const { password: _, ...adminData } = admin;

    return ApiResponse.success(res, { admin: adminData, accessToken }, "Login successful");
  });

  getMe = asyncHandler(async (req, res) => {
    return ApiResponse.success(res, req.admin, "User profile fetched successfully");
  });

  deleteAdmin = asyncHandler(async (req, res) => {
    await adminService.deleteAdmin(req.params.id);
    return ApiResponse.success(res, null, "Admin deleted successfully");
  });
}

module.exports = new AdminController();
