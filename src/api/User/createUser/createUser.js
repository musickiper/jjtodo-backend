import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { email, username } = args;

      try {
        const userExists = await prisma.$exists.user({
          OR: [{ email }, { username }]
        });
        if (userExists) {
          throw Error("The username or email is already taken");
        } else {
          await prisma.createUser({
            email,
            username
          });
          return true;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
};
