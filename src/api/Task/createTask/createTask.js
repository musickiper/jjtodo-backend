import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createTask: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title } = args;
      return prisma.createTask({
        user: {
          connect: {
            id: user.id
          }
        },
        title
      });
    }
  }
};
