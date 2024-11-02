import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const assetsPath = path.join(__dirname, "../public/backend");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json);

app.get("/user/:userId", async (req, res) => {
  const userInfo = await prisma.user.findUnique({
    where: { id: req.params.userId },
    include: {
      posts: {
        include: {
          comments: true,
        },
      },
    },
  });

  res.json(userInfo);
});
app.get("/user/:userId/posts/", async (req, res) => {
  const userPosts = await prisma.post.findMany({
    where: { authorId: req.params.userId },
    include: {
      comments: true,
    },
  });

  res.json(userPosts);
});
app.get("/user/:userId/posts/:postId", async (req, res) => {
  const userPost = await prisma.post.findUnique({
    where: { id: req.params.postId },
  });

  res.json(userPost);
});
app.get("/user/:userId/posts/:postId/comments", async (req, res) => {
  const userComments = await prisma.comment.findMany({
    where: { postId: req.params.postId },
  });

  res.json(userComments);
});
app.get("/post/:postId", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.postId },
  });

  res.json(post);
});
app.get("/users/all", async (req, res) => {
  const allData = await prisma.findMany({
    include: {
      posts: {
        include: {
          comments: true,
        },
      },
    },
  });

  res.json(allData);
});

app.post("/user", async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  res.json(newUser);
});
app.post("/user/:userId/post", async (req, res) => {
  const newPost = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      authorId: req.params.userId,
    },
  });

  res.json(newPost);
});
app.post("/:userId/post/:postId/comment", async (req, res) => {
  const newComment = await prisma.comment.create({
    data: {
      content: req.body.content,
      postId: req.params.postId,
      userId: req.params.userId,
    },
  });

  res.json(newComment);
});

app.put("/user/:userId/post/:postId", async (req, res) => {
  const updatedPost = await prisma.post.update({
    where: {
      id: req.params.postId,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });

  res.json(updatedPost);
});
app.put("/post/:postId/comment/:commentId", async (req, res) => {
  const updatedComment = await prisma.comment.update({
    where: {
      id: req.params.commentId,
    },
    data: {
      content: req.body.content,
    },
  });

  res.json(updatedComment);
});

app.delete("/user/:userId/post/:postId", async (req, res) => {
  await prisma.post.delete({
    where: {
      id: req.params.postId,
    },
  });

  res.json({ message: "Post deleted." });
});
app.delete("/post/:postId/comment/:commentId", async (req, res) => {
  await prisma.comment.delete({
    where: {
      id: req.params.commentId,
    },
  });

  res.json({ message: "Comment deleted." });
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing!`);
});
