import {prisma} from "../../../../generated/prisma-client";

export default {
    Query: {
        allCategories: () => prisma.categories()
    }
}
