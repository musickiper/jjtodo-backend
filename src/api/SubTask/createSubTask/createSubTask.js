import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createSubTask: (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {text, parentTaskId} = args;
            return prisma.createSubTask({
                text,
                parentTask: {
                    connect: {
                        id: parentTaskId
                    }
                },
                done: false
            });
        }
    }
}
