const prisma = require("../db/prismaClient");

class JobService {
  async getAllJobs(filters = {}) {
    const { isActive, type, remote, department } = filters;
    const where = {};
    if (isActive !== undefined) where.isActive = isActive;
    if (type) where.type = type;
    if (remote) where.remote = remote;
    if (department) where.department = department;

    return await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async getJobById(id) {
    return await prisma.job.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async createJob(data) {
    return await prisma.job.create({
      data,
    });
  }

  async updateJob(id, data) {
    return await prisma.job.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteJob(id) {
    return await prisma.job.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new JobService();
