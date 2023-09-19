const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class TopicService {
  static async getAllTopics({ filter = {}, limit = 50 }) {
    const topics = await prisma.topic.findMany({
      where: filter,
      take: limit,
      orderBy: {
        index: "asc",
      },
    });
    return { topics };
  }
}

module.exports = TopicService;
