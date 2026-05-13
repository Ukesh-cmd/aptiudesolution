const inquiryService = require("../services/inquiry.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class InquiryController {
  getAllInquiries = asyncHandler(async (req, res) => {
    const inquiries = await inquiryService.getAllInquiries();
    return ApiResponse.success(res, inquiries, "Inquiries fetched successfully");
  });

  getInquiryById = asyncHandler(async (req, res) => {
    const inquiry = await inquiryService.getInquiryById(req.params.id);
    if (!inquiry) {
      return ApiResponse.error(res, "Inquiry not found", 404);
    }
    return ApiResponse.success(res, inquiry, "Inquiry fetched successfully");
  });

  createInquiry = asyncHandler(async (req, res) => {
    const inquiry = await inquiryService.createInquiry(req.body);
    return ApiResponse.success(res, inquiry, "Inquiry submitted successfully", 201);
  });

  updateInquiry = asyncHandler(async (req, res) => {
    const inquiry = await inquiryService.updateInquiry(req.params.id, req.body);
    return ApiResponse.success(res, inquiry, "Inquiry updated successfully");
  });

  deleteInquiry = asyncHandler(async (req, res) => {
    await inquiryService.deleteInquiry(req.params.id);
    return ApiResponse.success(res, null, "Inquiry deleted successfully");
  });
}

module.exports = new InquiryController();
