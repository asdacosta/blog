import express from "express";
import {
  createPost,
  createUser,
  deletePost,
  getAllData,
  getComments,
  getPost,
  getPosts,
  getUser,
  updatePost,
} from "../controllers/userControl.js";

const userRoutes = express.Router();

userRoutes.get("/:userId", getUser);
userRoutes.get("/:userId/posts/", getPosts);
userRoutes.get("/:userId/posts/:postId", getPost);
userRoutes.get("/:userId/posts/:postId/comments", getComments);
userRoutes.get("/all", getAllData);
userRoutes.post("/", createUser);
userRoutes.post("/post/:userId", createPost);
userRoutes.put("/:userId/post/:postId", updatePost);
userRoutes.delete("/:userId/post/:postId", deletePost);

export { userRoutes };
