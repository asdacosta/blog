import { PrismaClient } from "@prisma/client";
import {
  deleteOldComment,
  findManyPublishedPosts,
  findManyUnpublishedPosts,
  findUniquePost,
  updateOldComment,
} from "../models/postModel.js";
const prisma = new PrismaClient();

const getPost = async (req, res) => {
  try {
    const post = await findUniquePost(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.createdAt = new Date(post.createdAt).toLocaleDateString();
    post.comments = post.comments.map((comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt).toLocaleDateString(),
    }));
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPublishedPosts = async (req, res) => {
  try {
    const posts = await findManyPublishedPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUnpublishedPosts = async (req, res) => {
  try {
    const posts = await findManyUnpublishedPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
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

export {
  getPost,
  updateComment,
  deleteComment,
  getPublishedPosts,
  getUnpublishedPosts,
};
