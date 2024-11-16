import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  deleteComment,
  getPost,
  getPublishedPosts,
  getUnpublishedPosts,
  updateComment,
} from "../controllers/postControl.js";
import { createComment } from "../models/genModel.js";

const postRoutes = express.Router();
const prisma = new PrismaClient();

postRoutes.get("/published", getPublishedPosts);
postRoutes.get("/unpublished", getUnpublishedPosts);
postRoutes.get("/:postId", getPost);
postRoutes.post("/:postId/newComment", createComment);
postRoutes.put("/:postId/comment/:commentId", updateComment);
postRoutes.delete("/:postId/comment/:commentId", deleteComment);

export { postRoutes };
