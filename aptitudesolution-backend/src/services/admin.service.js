const bcrypt = require("bcryptjs");
const prisma = require("../db/prismaClient");

class AdminService {
  async getAllAdmins() {
    return await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAdminById(id) {
    return await prisma.admin.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email) {
    return await prisma.admin.findUnique({
      where: { email },
    });
  }

  async createAdmin(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.admin.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateAdmin(id, data) {
    return await prisma.admin.update({
      where: { id: parseInt(id) },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteAdmin(id) {
    return await prisma.admin.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new AdminService();
