import { PrismaClient } from "@prisma/client";
import {
  createNewPost,
  createNewUser,
  deleteOldComment,
  deleteOldPost,
  findManyAll,
  findManyComments,
  findManyPosts,
  findUniquePost,
  findUniqueUser,
  findUniqueUserByEmail,
  publishOldPost,
  unpublishOldPost,
  updateOldPost,
} from "../models/userModel.js";
const prisma = new PrismaClient();
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import dotenv from "dotenv";

dotenv.config();

const getUser = async (req, res) => {
  const userInfo = await findUniqueUser(req.params.userId);
  res.json(userInfo);
};

const getPosts = async (req, res) => {
  const userPosts = await findManyPosts();
  res.json(userPosts);
};

const getPost = async (req, res) => {
  const userPost = await findUniquePost(req.params.postId);
  res.json(userPost);
};

const getComments = async (req, res) => {
  const userComments = await findManyComments(req.params.postId);
  res.json(userComments);
};

const getAllData = async (req, res) => {
  const allData = await findManyAll();
  res.json(allData);
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await findUniqueUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let user = null;
    hash(password, 10, async (err, hashedPwd) => {
      if (err) return next(err);
      user = await createNewUser(email, hashedPwd);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
    });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const createPost = async (req, res) => {
  const newPost = await createNewPost(
    req.body.title,
    req.body.content,
    req.params.userId
  );
  res.json(newPost);
};

const unpublishPost = async (req, res) => {
  const updatedPost = await unpublishOldPost(req.params.id);
  res.json(updatedPost);
};

const publishPost = async (req, res) => {
  const updatedPost = await publishOldPost(req.params.id);
  res.json(updatedPost);
};

const deleteComment = async (req, res) => {
  await deleteOldComment(req.params.articleId, req.params.commentId);
};

const updatePost = async (req, res) => {
  const updatedPost = await updateOldPost(
    req.params.postId,
    req.body.title,
    req.body.content
  );
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  deleteOldPost(req.params.postId);
  res.json({ message: "Post deleted." });
};

export {
  getUser,
  getPosts,
  getPost,
  getComments,
  getAllData,
  createUser,
  createPost,
  updatePost,
  deletePost,
  unpublishPost,
  publishPost,
  deleteComment,
};
