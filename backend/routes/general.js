import express from "express";
import { PrismaClient } from "@prisma/client";
import { createComment } from "../models/genModel.js";

const genRoutes = express.Router();
const prisma = new PrismaClient();

genRoutes.post("/:userId/post/:postId/comment", async (req, res) => {
  const newComment = await createComment(
    req.params.userId,
    req.params.postId,
    req.body.content
  );
  res.json(newComment);
});

export { genRoutes };
