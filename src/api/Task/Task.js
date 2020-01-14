import {prisma} from "../../../generated/prisma-client";

export default {
    Task: {
        category: ({id}) => prisma.task({id}).category(),
        subTasks: ({id}) => prisma.task({id}).subTasks(),
        files: ({id}) => prisma.task({id}).files()
    }
};
