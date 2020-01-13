import { prisma } from "../../../generated/prisma-client";

export default {
  Task: {
    category: ({ id }) => prisma.task({ id }).category()
  }
};
