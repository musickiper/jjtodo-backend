import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteSubTask: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {subTaskId} = args;
            return prisma.deleteSubTask({id: subTaskId});
        }
    }
}
