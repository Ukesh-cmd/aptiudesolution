const consultingServiceService = require("../services/consultingService.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class ConsultingServiceController {
  getAllConsultingServices = asyncHandler(async (req, res) => {
    const { active } = req.query;
    const services = await consultingServiceService.getAllConsultingServices(active === "true");
    return ApiResponse.success(res, services, "Consulting services fetched successfully");
  });

  getConsultingServiceById = asyncHandler(async (req, res) => {
    const service = await consultingServiceService.getConsultingServiceById(req.params.id);
    if (!service) {
      return ApiResponse.error(res, "Consulting service not found", 404);
    }
    return ApiResponse.success(res, service, "Consulting service fetched successfully");
  });

  createConsultingService = asyncHandler(async (req, res) => {
    const service = await consultingServiceService.createConsultingService(req.body);
    return ApiResponse.success(res, service, "Consulting service created successfully", 201);
  });

  updateConsultingService = asyncHandler(async (req, res) => {
    const service = await consultingServiceService.updateConsultingService(req.params.id, req.body);
    return ApiResponse.success(res, service, "Consulting service updated successfully");
  });

  deleteConsultingService = asyncHandler(async (req, res) => {
    await consultingServiceService.deleteConsultingService(req.params.id);
    return ApiResponse.success(res, null, "Consulting service deleted successfully");
  });
}

module.exports = new ConsultingServiceController();
