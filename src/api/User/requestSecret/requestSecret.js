import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      // Get random secret (Adj + Noun)
      const loginSecret = generateSecret();
      try {
        // Check if the email is registered
        const registeredEmail = await prisma.$exists.user({ email });
        if (registeredEmail) {
          // Send the generated secret to the email
          await sendSecretMail(email, loginSecret);
          // Update user data with new generated secret
          await prisma.updateUser({
            data: {
              loginSecret
            },
            where: {
              email
            }
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
