import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        updateTask: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {
                taskId,
                title,
                desc,
                dueDate,
                status,
                categoryText,
                subTasks,
                files
            } = args;

            try {
                const task = await prisma.updateTask({
                    data: {
                        title,
                        desc,
                        dueDate,
                        status
                    },
                    where: {
                        id: taskId
                    }
                });

                if (categoryText) {
                    // Category
                    // Check existence of category because it can be created by user
                    const categoryExist = await prisma.$exists.category({
                        text_in: [categoryText]
                    });

                    const category = categoryExist
                        ? await prisma.category({text: categoryText})
                        : await prisma.createCategory({text: categoryText});

                    await prisma.updateTask({
                        data: {
                            category: {
                                connect: {
                                    id: category.id
                                }
                            }
                        },
                        where: {
                            id: taskId
                        }
                    });
                }

                if (subTasks) {
                    // Sub Tasks
                    // Add Sub Tasks to its Parent Task
                    for (let text of subTasks) {
                        await prisma.createSubTask({
                            text,
                            parentTask: {
                                connect: {
                                    id: task.id
                                }
                            }
                        });
                    }
                }

                if (files) {
                    // Files
                    // Add Files to Task
                    console.dir(files);
                    for (let url of files) {
                        await prisma.createFile({
                            url,
                            task: {
                                connect: {
                                    id: task.id
                                }
                            }
                        })
                    }
                }
                return task;
            } catch (e) {
                console.error(e);
            }
        }
    }
};
