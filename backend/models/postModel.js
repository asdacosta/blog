import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUniquePost = async (id) => {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error finding unique post:", error);
    throw error;
  }
};

const updateOldComment = async (id, content) => {
  try {
    return await prisma.comment.update({
      where: { id },
      data: { content },
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

const deleteOldComment = async (id) => {
  try {
    await prisma.comment.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export { findUniquePost, updateOldComment, deleteOldComment };
