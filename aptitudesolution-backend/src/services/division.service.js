const prisma = require("../db/prismaClient");

class DivisionService {
  async getAllDivisions(isActiveOnly = false) {
    const where = isActiveOnly ? { isActive: true } : {};
    return await prisma.division.findMany({
      where,
      orderBy: { order: "asc" },
    });
  }

  async getDivisionById(id) {
    return await prisma.division.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async createDivision(data) {
    return await prisma.division.create({
      data,
    });
  }

  async updateDivision(id, data) {
    return await prisma.division.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteDivision(id) {
    return await prisma.division.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new DivisionService();
