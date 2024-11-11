import express from "express";
import { PrismaClient } from "@prisma/client";
import { createComment } from "../models/genModel.js";
import { getPosts } from "../controllers/userControl.js";

const genRoutes = express.Router();
const prisma = new PrismaClient();

genRoutes.get("/", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

genRoutes.post("/:userId/post/:postId/comment", async (req, res) => {
  const newComment = await createComment(
    req.params.userId,
    req.params.postId,
    req.body.content
  );
  res.json(newComment);
});

export { genRoutes };
