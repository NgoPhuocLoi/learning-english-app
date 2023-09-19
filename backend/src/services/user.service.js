const { PrismaClient } = require("@prisma/client");
const { BadRequestError } = require("../helpers/error.response");
const prisma = new PrismaClient();

class UserService {
  static async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        current_level: true,
        host: true,
        topicsDone: {
          select: {
            topic: true,
            doneAt: true,
            completed: true,
          },
          orderBy: {
            doneAt: "desc",
          },
        },
      },
    });

    return {
      user: {
        ...user,
        topicsDone: user.topicsDone.map((t) => ({
          doneAt: t.doneAt,
          completed: t.completed,
          ...t.topic,
        })),
      },
    };
  }

  static async updateProgress({ userId, topicId, completed }) {
    const progress = await prisma.topicDone.findFirst({
      where: {
        userId,
        topicId,
      },
    });
    if (progress) {
      if (progress.completed || !completed) return;

      return await prisma.topicDone.update({
        where: {
          id: progress.id,
        },
        data: {
          completed,
        },
      });
    }

    return await prisma.topicDone.create({
      data: {
        userId,
        topicId,
        completed,
      },
    });
  }

  static async updateLevel({ userId, currentLevel }) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    const test = await prisma.topic.findFirst({
      where: {
        level: currentLevel,
        test: true,
      },
    });

    const userTakeTest = await prisma.topicDone.findFirst({
      where: {
        userId,
        topicId: test.id,
      },
    });

    if (!userTakeTest)
      throw new BadRequestError(
        "The user is not meet the requirements to level up!"
      );
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        current_level: Math.max(user.current_level, currentLevel + 1),
      },
    });
  }
}

module.exports = UserService;
