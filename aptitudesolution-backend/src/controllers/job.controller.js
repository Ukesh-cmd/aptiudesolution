const jobService = require("../services/job.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class JobController {
  getAllJobs = asyncHandler(async (req, res) => {
    const { active, type, remote, department } = req.query;
    const filters = {
      isActive: active === "true" ? true : active === "false" ? false : undefined,
      type,
      remote,
      department,
    };
    const jobs = await jobService.getAllJobs(filters);
    return ApiResponse.success(res, jobs, "Jobs fetched successfully");
  });

  getJobById = asyncHandler(async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      return ApiResponse.error(res, "Job not found", 404);
    }
    return ApiResponse.success(res, job, "Job fetched successfully");
  });

  createJob = asyncHandler(async (req, res) => {
    const job = await jobService.createJob(req.body);
    return ApiResponse.success(res, job, "Job created successfully", 201);
  });

  updateJob = asyncHandler(async (req, res) => {
    const job = await jobService.updateJob(req.params.id, req.body);
    return ApiResponse.success(res, job, "Job updated successfully");
  });

  deleteJob = asyncHandler(async (req, res) => {
    await jobService.deleteJob(req.params.id);
    return ApiResponse.success(res, null, "Job deleted successfully");
  });
}

module.exports = new JobController();
