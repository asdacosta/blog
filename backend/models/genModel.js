import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createComment = async (postId, name, content) => {
  try {
    const postIdInt = parseInt(postId);
    return await prisma.comment.create({
      data: { content, postId: postIdInt, name },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export { createComment };
