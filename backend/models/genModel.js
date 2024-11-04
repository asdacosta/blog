import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createComment = async (userId, postId, content) => {
  try {
    return await prisma.comment.create({ data: { content, postId, userId } });
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export { createComment };
