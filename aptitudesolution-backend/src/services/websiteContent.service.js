const prisma = require("../db/prismaClient");

class WebsiteContentService {
  async getAllContent() {
    return await prisma.websiteContent.findMany();
  }

  async getContentById(id) {
    return await prisma.websiteContent.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async createContent(data) {
    return await prisma.websiteContent.create({
      data,
    });
  }

  async updateContent(id, data) {
    return await prisma.websiteContent.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteContent(id) {
    return await prisma.websiteContent.delete({
      where: { id: parseInt(id) },
    });
  }

  async getFilteredContent(filters) {
    const { section, lang } = filters;
    const where = {};
    if (section) where.section = section;
    if (lang) where.lang = lang;
    
    return await prisma.websiteContent.findMany({
      where,
    });
  }
}

module.exports = new WebsiteContentService();
