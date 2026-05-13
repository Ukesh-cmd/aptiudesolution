const ApiResponse = require("../utils/apiResponse");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return ApiResponse.error(
        res,
        `Role (${req.admin ? req.admin.role : "unknown"}) is not allowed to access this resource`,
        403
      );
    }
    next();
  };
};

module.exports = { authorize };
