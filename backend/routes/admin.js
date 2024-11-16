import express from "express";
import {
  createPost,
  deleteComment,
  publishPost,
  unpublishPost,
} from "../controllers/userControl.js";

const adminRoutes = express.Router();
adminRoutes.post("/post/:userId", createPost);
adminRoutes.post("/published/unpublish/:id", unpublishPost);
adminRoutes.post("/unpublished/publish/:id", publishPost);
adminRoutes.delete("/comments/:articleId/:commentId", deleteComment);

export { adminRoutes };
