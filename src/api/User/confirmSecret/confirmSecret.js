import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      try {
        const user = await prisma.user({ email });
        if (user.loginSecret === secret) {
          // When auth is done, reset login secret on user data
          await prisma.updateUser({
            data: {
              loginSecret: null
            },
            where: {
              email
            }
          });
          // Return generated token to use it to login
          return generateToken(user.id);
        } else {
          throw Error("Wrong email/secret conversion");
        }
      } catch (error) {
        throw Error(error);
      }
    }
  }
};
