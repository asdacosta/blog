import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createComment = async (req, res) => {
  try {
    const postIdInt = parseInt(req.params.postId);
    const { name, content } = req.body;
    if (!name || !content) {
      return res.status(400).json({ error: "Name and content are required" });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: postIdInt,
        name,
      },
    });
    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export { createComment };
