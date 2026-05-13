const prisma = require("../db/prismaClient");

class ServiceService {
  async getAllServices(isActiveOnly = false) {
    const where = isActiveOnly ? { isActive: true } : {};
    return await prisma.service.findMany({
      where,
      orderBy: { order: "asc" },
    });
  }

  async getServiceById(id) {
    return await prisma.service.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async createService(data) {
    return await prisma.service.create({
      data,
    });
  }

  async updateService(id, data) {
    return await prisma.service.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteService(id) {
    return await prisma.service.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new ServiceService();
