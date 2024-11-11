import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUniquePost = async (id) => {
  try {
    const postId = parseInt(id);
    return await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: true,
      },
    });
  } catch (error) {
    console.error("Error finding unique post:", error);
    throw error;
  }
};

const updateOldComment = async (id, content) => {
  try {
    const commentId = parseInt(id);
    return await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

const deleteOldComment = async (id) => {
  try {
    const commentId = parseInt(id);
    await prisma.comment.delete({ where: { id: commentId } });
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export { findUniquePost, updateOldComment, deleteOldComment };
