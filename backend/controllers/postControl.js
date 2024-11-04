import { PrismaClient } from "@prisma/client";
import {
  deleteOldComment,
  findUniquePost,
  updateOldComment,
} from "../models/postModel.js";
const prisma = new PrismaClient();

const getPost = async (req, res) => {
  const post = await findUniquePost(req.params.postId);
  res.json(post);
};

const updateComment = async (req, res) => {
  const updatedComment = await updateOldComment(
    req.params.commentId,
    req.body.content
  );
  res.json(updatedComment);
};

const deleteComment = async (req, res) => {
  await deleteOldComment(req.params.commentId);
  res.json({ message: "Comment deleted." });
};

export { getPost, updateComment, deleteComment };
