import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteTask: (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {taskId} = args;

            return prisma.deleteTask({
                id: taskId
            });
        }
    }
}
