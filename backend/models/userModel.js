import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUniqueUser = async (id) => {
  try {
    const userId = parseInt(id);
    return await prisma.user.findUnique({
      where: { id: userId },
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
    const authorIdInt = parseInt(authorId);
    return await prisma.post.findMany({
      where: { authorId: authorIdInt },
      include: { comments: true },
    });
  } catch (error) {
    console.error("Error finding posts:", error);
    throw error;
  }
};

const findUniquePost = async (id) => {
  try {
    const postId = parseInt(id);
    return await prisma.post.findUnique({ where: { id: postId } });
  } catch (error) {
    console.error("Error finding unique post:", error);
    throw error;
  }
};

const findManyComments = async (postId) => {
  try {
    const postIdInt = parseInt(postId);
    return await prisma.comment.findMany({ where: { postId: postIdInt } });
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
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User with this email already exists");

    return await prisma.user.create({ data: { email, password } });
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

const createNewPost = async (title, content, authorId) => {
  try {
    const authorIdInt = parseInt(authorId);
    return await prisma.post.create({
      data: { title, content, authorId: authorIdInt },
    });
  } catch (error) {
    console.error("Error creating new post:", error);
    throw error;
  }
};

const updateOldPost = async (id, title, content) => {
  try {
    const postId = parseInt(id);
    return await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

const deleteOldPost = async (id) => {
  try {
    const postId = parseInt(id);
    await prisma.post.delete({ where: { id: postId } });
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
