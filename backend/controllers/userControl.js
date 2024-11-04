import { PrismaClient } from "@prisma/client";
import {
  createNewPost,
  createNewUser,
  deleteOldPost,
  findManyAll,
  findManyComments,
  findManyPosts,
  findUniquePost,
  findUniqueUser,
  updateOldPost,
} from "../models/userModel.js";
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const userInfo = await findUniqueUser(req.params.userId);
  res.json(userInfo);
};

const getPosts = async (req, res) => {
  const userPosts = await findManyPosts(req.params.userId);
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
  const newUser = await createNewUser(req.body.email, req.body.password);
  res.json(newUser);
};

const createPost = async (req, res) => {
  const newPost = await createNewPost(
    req.body.title,
    req.body.content,
    req.params.userId
  );
  res.json(newPost);
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
};
