import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  deleteComment,
  getPost,
  updateComment,
} from "../controllers/postControl.js";

const postRoutes = express.Router();
const prisma = new PrismaClient();

postRoutes.get("/:postId", getPost);
postRoutes.put("/:postId/comment/:commentId", updateComment);
postRoutes.delete("/:postId/comment/:commentId", deleteComment);

export { postRoutes };
