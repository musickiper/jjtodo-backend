import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        updateSubTask: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {subTaskId, done} = args;
            return prisma.updateSubTask({
                data: {
                    done: !done
                },
                where: {
                    id: subTaskId
                }
            });
        }
    }
}
