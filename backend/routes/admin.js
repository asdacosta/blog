import express from "express";
import { createPost } from "../controllers/userControl.js";

const adminRoutes = express.Router();
adminRoutes.post("/post/:userId", createPost);

export { adminRoutes };
