import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    taskById: async (_, args) => {
      const { taskId } = args;
      return prisma.task({ id: taskId });
    }
  }
};
