import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    allMyTasks: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.tasks({
        where: {
          user: {
            id: user.id
          }
        }
      });
    }
  }
};
