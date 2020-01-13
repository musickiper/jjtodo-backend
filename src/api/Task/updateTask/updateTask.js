import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updateTask: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        taskId,
        title,
        desc,
        dueDate,
        status,
        categoryText,
        subTasks,
        files
      } = args;

      try {
        const task = await prisma.updateTask({
          data: {
            title,
            desc,
            dueDate,
            status,
            category
          },
          where: {
            id: taskId
          }
        });

        // Category
        // Check existence of category because it can be created by user
        const categoryExist = await prisma.$exists.category({
          text_in: [categoryText]
        });

        const category = categoryExist
          ? await prisma.category({ text: categoryText })
          : await prisma.createCategory({ text: categoryText });

        return prisma.updateTask({
          data: {
            category: {
              connect: {
                id: category.id
              }
            }
          },
          where: {
            id: taskId
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
