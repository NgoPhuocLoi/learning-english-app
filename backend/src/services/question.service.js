const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class QuestionService {
  static async getByTopicId(topicId, type) {
    const filter = { topicId };
    if (type) filter.type = type;
    const questions = await prisma.question.findMany({
      where: filter,
      include: {
        answers: true,
      },
      orderBy: {
        index: "asc",
      },
    });

    return { questions };
  }

  static async getQuestionOfTest({ level }) {
    const topicQuestions = {};
    const topicsId = (
      await prisma.topic.findMany({
        where: {
          level,
          test: false,
        },
        select: {
          id: true,
        },
      })
    ).map((i) => i.id);

    topicsId.forEach((id) => {
      topicQuestions[id] = {
        type1: [],
        type2: [],
        type3: [],
      };
    });

    const questions = await prisma.question.findMany({
      where: {
        level,
      },
      include: {
        answers: true,
      },
    });
    questions.forEach((question) => {
      topicQuestions[question.topicId][`type${question.type}`].push(question);
    });
    const questionsData = [];
    for (let topicId in topicQuestions) {
      for (let type in topicQuestions[topicId]) {
        const questions = topicQuestions[topicId][type];
        const item = questions[Math.floor(Math.random() * questions.length)];
        questionsData.push(item);
      }
    }

    return {
      questions: questionsData,
    };
  }
}

module.exports = QuestionService;
