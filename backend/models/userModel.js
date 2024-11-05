import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUniqueUser = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error finding unique user:", error);
    throw error;
  }
};

const findUniqueUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error("Error finding unique user:", error);
    throw error;
  }
};

const findManyPosts = async (authorId) => {
  try {
    return await prisma.post.findMany({
      where: { authorId },
      include: { comments: true },
    });
  } catch (error) {
    console.error("Error finding posts:", error);
    throw error;
  }
};

const findUniquePost = async (id) => {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error finding unique post:", error);
    throw error;
  }
};

const findManyComments = async (postId) => {
  try {
    return await prisma.comment.findMany({ where: { postId } });
  } catch (error) {
    console.error("Error finding comments:", error);
    throw error;
  }
};

const findManyAll = async () => {
  try {
    return await prisma.user.findMany({
      include: {
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error finding all users:", error);
    throw error;
  }
};

const createNewUser = async (email, password) => {
  try {
    return await prisma.user.create({ data: { email, password } });
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

const createNewPost = async (title, content, authorId) => {
  try {
    return await prisma.post.create({ data: { title, content, authorId } });
  } catch (error) {
    console.error("Error creating new post:", error);
    throw error;
  }
};

const updateOldPost = async (id, title, content) => {
  try {
    return await prisma.post.update({
      where: { id },
      data: { title, content },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

const deleteOldPost = async (id) => {
  try {
    await prisma.post.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export {
  findUniqueUser,
  findManyPosts,
  findUniquePost,
  findManyComments,
  findManyAll,
  createNewUser,
  createNewPost,
  updateOldPost,
  deleteOldPost,
  findUniqueUserByEmail,
};
