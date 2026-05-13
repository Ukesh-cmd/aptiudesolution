const prisma = require("../db/prismaClient");

class SettingService {
  async getAllSettings() {
    return await prisma.setting.findMany();
  }

  async getSettingByKey(key) {
    return await prisma.setting.findUnique({
      where: { key },
    });
  }

  async createSetting(data) {
    return await prisma.setting.create({
      data,
    });
  }

  async updateSetting(key, data) {
    return await prisma.setting.update({
      where: { key },
      data,
    });
  }

  async deleteSetting(key) {
    return await prisma.setting.delete({
      where: { key },
    });
  }

  async getSettingsByGroup(group) {
    return await prisma.setting.findMany({
      where: { group },
    });
  }
}

module.exports = new SettingService();
