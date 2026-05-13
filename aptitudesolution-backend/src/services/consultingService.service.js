const prisma = require("../db/prismaClient");

class ConsultingServiceService {
  async getAllConsultingServices(isActiveOnly = false) {
    const where = isActiveOnly ? { isActive: true } : {};
    return await prisma.consultingService.findMany({
      where,
      orderBy: { order: "asc" },
    });
  }

  async getConsultingServiceById(id) {
    return await prisma.consultingService.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async createConsultingService(data) {
    return await prisma.consultingService.create({
      data,
    });
  }

  async updateConsultingService(id, data) {
    return await prisma.consultingService.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteConsultingService(id) {
    return await prisma.consultingService.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new ConsultingServiceService();
