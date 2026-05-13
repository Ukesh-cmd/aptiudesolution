const settingService = require("../services/setting.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class SettingController {
  getAllSettings = asyncHandler(async (req, res) => {
    const { group } = req.query;
    let settings;
    if (group) {
      settings = await settingService.getSettingsByGroup(group);
    } else {
      settings = await settingService.getAllSettings();
    }
    return ApiResponse.success(res, settings, "Settings fetched successfully");
  });

  getSettingByKey = asyncHandler(async (req, res) => {
    const setting = await settingService.getSettingByKey(req.params.key);
    if (!setting) {
      return ApiResponse.error(res, "Setting not found", 404);
    }
    return ApiResponse.success(res, setting, "Setting fetched successfully");
  });

  createSetting = asyncHandler(async (req, res) => {
    const setting = await settingService.createSetting(req.body);
    return ApiResponse.success(res, setting, "Setting created successfully", 201);
  });

  updateSetting = asyncHandler(async (req, res) => {
    const setting = await settingService.updateSetting(req.params.key, req.body);
    return ApiResponse.success(res, setting, "Setting updated successfully");
  });

  deleteSetting = asyncHandler(async (req, res) => {
    await settingService.deleteSetting(req.params.key);
    return ApiResponse.success(res, null, "Setting deleted successfully");
  });
}

module.exports = new SettingController();
