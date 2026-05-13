const { verifyAccessToken } = require("../utils/token.utils");
const asyncHandler = require("../utils/asyncHandler");
const adminService = require("../services/admin.service");
const ApiResponse = require("../utils/apiResponse");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return ApiResponse.error(res, "Not authorized to access this route", 401);
  }

  try {
    const decoded = verifyAccessToken(token);
    req.admin = await adminService.getAdminById(decoded.id);
    
    if (!req.admin) {
        return ApiResponse.error(res, "Admin not found with this token", 401);
    }
    
    next();
  } catch (err) {
    return ApiResponse.error(res, "Not authorized to access this route", 401);
  }
});

module.exports = { protect };
