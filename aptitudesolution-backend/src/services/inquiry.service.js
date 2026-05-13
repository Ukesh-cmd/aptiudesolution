const prisma = require("../db/prismaClient");

class InquiryService {
  async getAllInquiries() {
    return await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getInquiryById(id) {
    return await prisma.inquiry.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async createInquiry(data) {
    return await prisma.inquiry.create({
      data,
    });
  }

  async updateInquiry(id, data) {
    return await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteInquiry(id) {
    return await prisma.inquiry.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new InquiryService();
