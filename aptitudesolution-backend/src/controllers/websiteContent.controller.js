const websiteContentService = require("../services/websiteContent.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class WebsiteContentController {
  getAllContent = asyncHandler(async (req, res) => {
    const { section, lang } = req.query;
    const content = await websiteContentService.getFilteredContent({ section, lang });
    return ApiResponse.success(res, content, "Website content fetched successfully");
  });

  getContentById = asyncHandler(async (req, res) => {
    const content = await websiteContentService.getContentById(req.params.id);
    if (!content) {
      return ApiResponse.error(res, "Content not found", 404);
    }
    return ApiResponse.success(res, content, "Content fetched successfully");
  });

  createContent = asyncHandler(async (req, res) => {
    const content = await websiteContentService.createContent(req.body);
    return ApiResponse.success(res, content, "Content created successfully", 201);
  });

  updateContent = asyncHandler(async (req, res) => {
    const content = await websiteContentService.updateContent(req.params.id, req.body);
    return ApiResponse.success(res, content, "Content updated successfully");
  });

  deleteContent = asyncHandler(async (req, res) => {
    await websiteContentService.deleteContent(req.params.id);
    return ApiResponse.success(res, null, "Content deleted successfully");
  });
}

module.exports = new WebsiteContentController();
