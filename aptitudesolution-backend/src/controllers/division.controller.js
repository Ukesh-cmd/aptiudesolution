const divisionService = require("../services/division.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class DivisionController {
  getAllDivisions = asyncHandler(async (req, res) => {
    const { active } = req.query;
    const divisions = await divisionService.getAllDivisions(active === "true");
    return ApiResponse.success(res, divisions, "Divisions fetched successfully");
  });

  getDivisionById = asyncHandler(async (req, res) => {
    const division = await divisionService.getDivisionById(req.params.id);
    if (!division) {
      return ApiResponse.error(res, "Division not found", 404);
    }
    return ApiResponse.success(res, division, "Division fetched successfully");
  });

  createDivision = asyncHandler(async (req, res) => {
    const division = await divisionService.createDivision(req.body);
    return ApiResponse.success(res, division, "Division created successfully", 201);
  });

  updateDivision = asyncHandler(async (req, res) => {
    const division = await divisionService.updateDivision(req.params.id, req.body);
    return ApiResponse.success(res, division, "Division updated successfully");
  });

  deleteDivision = asyncHandler(async (req, res) => {
    await divisionService.deleteDivision(req.params.id);
    return ApiResponse.success(res, null, "Division deleted successfully");
  });
}

module.exports = new DivisionController();
