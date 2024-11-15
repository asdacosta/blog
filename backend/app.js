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
import {
  createNewPost,
  createNewUser,
  findUniqueUserByEmail,
} from "./models/userModel.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import { createComment } from "./models/genModel.js";

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
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/user", authenticateToken, userRoutes);
app.use("/post", postRoutes);
app.use("/", genRoutes);

app.get("/log-out", getLogOut);
app.post("/sign-up", signUpValidation, postSignUp);
app.post("/log-in", async (req, res) => {
  const { email, pwd } = req.body;
  try {
    const user = await findUniqueUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await compare(pwd, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing!`);
});
