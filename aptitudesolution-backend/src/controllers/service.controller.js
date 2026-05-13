const serviceService = require("../services/service.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class ServiceController {
  getAllServices = asyncHandler(async (req, res) => {
    const { active } = req.query;
    const services = await serviceService.getAllServices(active === "true");
    return ApiResponse.success(res, services, "Services fetched successfully");
  });

  getServiceById = asyncHandler(async (req, res) => {
    const service = await serviceService.getServiceById(req.params.id);
    if (!service) {
      return ApiResponse.error(res, "Service not found", 404);
    }
    return ApiResponse.success(res, service, "Service fetched successfully");
  });

  createService = asyncHandler(async (req, res) => {
    const service = await serviceService.createService(req.body);
    return ApiResponse.success(res, service, "Service created successfully", 201);
  });

  updateService = asyncHandler(async (req, res) => {
    const service = await serviceService.updateService(req.params.id, req.body);
    return ApiResponse.success(res, service, "Service updated successfully");
  });

  deleteService = asyncHandler(async (req, res) => {
    await serviceService.deleteService(req.params.id);
    return ApiResponse.success(res, null, "Service deleted successfully");
  });
}

module.exports = new ServiceController();
