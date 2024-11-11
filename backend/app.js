import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.js";
import { postRoutes } from "./routes/post.js";
import { genRoutes } from "./routes/general.js";
import {
  localStrategy,
  deserialize,
  signUpValidation,
  postSignUp,
  getLogOut,
  jwtStrategy,
  authenticateToken,
} from "./controllers/genControl.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { createNewPost, createNewUser } from "./models/userModel.js";
import { createComment } from "./models/genModel.js";
const prisma = new PrismaClient();

// const newUser = await createNewUser("ace@gmail.com", "ace1$");
// const hisPost = await createNewPost(
//   "Programming Languages",
//   "Programming languages are essential tools in computer science, shaping how software developers and engineers communicate with computers to build applications, websites, and systems. Each programming language comes with its own syntax, design, and capabilities, making it suited for different types of projects and goals. Here’s a closer look at some major types of programming languages, how they differ, and where they’re used. High-Level Languages: These are designed to be closer to human language, which makes them easier to read and write. Examples include Python, Java, and C++. These languages are generally abstracted from machine code, making development faster and more accessible. Low-Level Languages: Closer to machine code, these languages are less abstract and more hardware-specific. Assembly language and Machine code are typical examples. They are mainly used in system programming, where direct memory and CPU management are needed.",
//   1
// );
// const hisComment = await createComment(1, "Ace", "Anything ah anything");
// console.log("Here he is: ", newUser, hisPost, hisComment);

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/user", authenticateToken, userRoutes);
app.use("/post", postRoutes);
app.use("/", genRoutes);

app.get("/log-out", getLogOut);
app.post("/sign-up", signUpValidation, postSignUp);
app.post(
  "/log-in",
  passport.authenticate("local", { session: false }, (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "Login successful", token });
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing!`);
});
